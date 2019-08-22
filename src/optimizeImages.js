#!/usr/bin/node
/* eslint-disable no-console, no-await-in-loop, import/no-extraneous-dependencies, import/no-dynamic-require, global-require */

/*
  npm run optimize [-- -i img1,img2 -l -d directory/path]
  i.e. node scripts/optimizeImage.js -d /Users/username/images/src -s 900x,700x,450x -i special/image1.jpg,image2.png
*/
'use strict';

const program = require('commander');
const { exec } = require('child_process');
const { join } = require('path');
const { rm } = require('shelljs');
const commandExistsSync = require('command-exists').sync;
const { ensureDirSync, existsSync } = require('fs-extra');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp'); // lossy
const imageminMozjpeg = require('imagemin-mozjpeg'); // lossy
const imageminPngquant = require('imagemin-pngquant'); // lossy
const imageminJpegtran = require('imagemin-jpegtran'); // lossless
const imageminOptiPng = require('imagemin-optipng'); // lossless
const imagemagickCli = require('imagemagick-cli');

const defaultDestination = join(__dirname, 'temp');

const getInputs = (options) => {
  if (options.images && options.dir) {
    return options.images.map((file) => `${options.dir.replace(/\/$/, '')}/${file}`);
  } else if (options.images) {
    return options.images;
  } else if (options.dir) {
    return [`${options.dir.replace(/\/$/, '')}/*.{jpg,png}`];
  }

  return [];
}

const resizeImage = (originalImg, newImg, size) => new Promise((resolve, reject) => {
  exec(`convert ${originalImg} -resize ${size} ${newImg}`, (err, stdout, stderr) => {
    if (err) {
      console.log(`Error on ${originalImg} ${size}`);
      reject(stderr);
    } else {
      resolve();
    }
  });
});

const optimizeImage = async (options) => {
  // console.time('optimize');
  let inputs = getInputs(options);
  const newInputs = [];

  const pluginsBase = options.lossless ? [
    imageminJpegtran(),
    imageminOptiPng(),
  ] : [
    imageminMozjpeg({ quality: 90, strip: true }),
    imageminPngquant({
      quality: [0.7, 0.9]
    }),
  ];

  if (options.sizes) {
    if (!commandExistsSync('convert')) {
      throw Error('imagemagick not installed. Try \'brew install imagemagick\'.');
    } else if (!options.sizes.every((size) => size.match(/^(\d{2,4})?x(\d{2,4})?$/))) {
      throw Error(`Sizes not in proper format of WWWx or WWWxHHH: ${options.sizes}`);
    }
    
    const resizePromises = [];

    inputs.forEach((input) => {
      options.sizes.forEach((size) => {
        const name = input.replace(/(.jpg|.png)$/, `-${size.replace(/x$/, '')}$1`);
        newInputs.push(name);
        resizePromises.push(resizeImage(input, name, size));
      });
    });
    
    await Promise.all(resizePromises);
  }

  const combinedInputs = inputs.concat(newInputs);
  const destination = options.output || defaultDestination;
  ensureDirSync(destination);

  let baseFiles = await imagemin(combinedInputs, {
    destination,
    plugins: pluginsBase,
  });
  
  if (options.webp) {
    const webpFiles = await imagemin(combinedInputs, {
      destination,
      plugins: [imageminWebp({ quality: 80 })],
    });
    baseFiles = baseFiles.concat(webpFiles);
  }

  // console.timeEnd('optimize');
  console.log(`Complete. Files Written to ${baseFiles.map((file) => file.destinationPath.replace(destination, '')).join(', ')}`);

  if (newInputs.length) {
    rm(newInputs);
  }
};

program
  .option('-i, --images [images]', 'a comma delimited list of images to optimize', (str) => str.split(','), [])
  .option('-o, --output [output]', 'output directory to compress all image files', null, '')
  .option('-d, --dir [directory]', 'input directory to use relative paths for files to be compressed', null, '')
  .option('-l, --lossless', 'use lossless encoders if jpeg or png')
  .option('-s --sizes [sizes]', 'a comma delimited list of sizes as WWWxHHH, e.g., 300x,400x200', (str) => str.split(','), [])
  .option('-w --webp', 'create webp versions')
  .parse(process.argv);

  optimizeImage(program);
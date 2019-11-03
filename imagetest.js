const imageToAscii = require("image-to-ascii");

const imageUrl = 'https://assets.smart.com/styles/smart_small/s3/2019-08/122-smart-home-intro.jpg?EzmIBGSAs2TNNcVKhLg1lgnPpElcxVq5&h=9b8bd6ff&width=2000';
const width = 65;
const height = 40;

// The path can be either a local path or an url
// imageToAscii("https://octodex.github.com/images/octofez.png", (err, converted) => {
//   console.log(err || converted);
// });
const asciOptions = require('./src/AsciiImageOptions');
// Passing options
imageToAscii(imageUrl, asciOptions(width,height) , (err, converted) => {
  console.log(err || converted);
});
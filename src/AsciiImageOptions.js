module.exports = (width, height) => {
  return {
    colored: true,
    pxWidth: 2,
    size: { // The size of the result image
      width: width
    },
    size_options: {
      screen_size: {
        width: width,
        height: height
      },
      px_size: {
        width: 1.25,
        height: 0.5
      },
      preserve_aspect_ratio: true,
      fit_screen: false
    },
    stringify: true,
    concat: true,
    pixels: " .,°;+|*@#",
    reverse: false,
    bg: true,
    fg: false,
    white_bg: false
  }
};
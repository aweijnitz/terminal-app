const path = require('path');
const blessed = require('blessed');
const TermImage = require('./TerminalImage');

const imageUrl = 'https://assets.smart.com/styles/smart_small/s3/2019-08/122-smart-home-intro.jpg?EzmIBGSAs2TNNcVKhLg1lgnPpElcxVq5&h=9b8bd6ff&width=2000';


// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  log: 'blessed.log'
});

screen.title = 'terminal.app';

// Create a box perfectly centered horizontally and vertically.
const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '75%',
  height: '100%',
  content: 'Hello {bold}world{/bold}!',
  draggable: true,
  shadow: true,
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'grey',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});


const image = new TermImage({
  url: imageUrl,
  parent: box,
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
});
box.append(image);


// Append our box to the screen.
screen.append(box);


// If our box is clicked, change the content.
box.on('click', function (data) {
  //screen.log('Box clicked!', data);
  box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
  screen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function (ch, key) {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();

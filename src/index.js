import remote from 'remote';
import React from 'react';
import ReactDOM from 'react-dom';
import hello from './es6/hello.js';
import View from './jsx/index.jsx';

var sharedObject = remote.getGlobal('sharedObject');
var robot = sharedObject.robot;

ReactDOM.render(
  <View sendMessage={ (text) => {
    var command = { text: text };
    robot.receiveCommand(command);
  } } />,
  document.getElementById('wrapper')
);

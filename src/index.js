import ipcRenderer from 'ipc';
import remote from 'remote';
import React from 'react';
import ReactDOM from 'react-dom';
import Recognition from './es6/recognition.js';
import { Input, Messages, Mascot } from './jsx/index.jsx';

import css from './scss/main.scss';

var recognitionStarted = false,
  recognitionStopTimer = null;

var sharedObject = remote.getGlobal('sharedObject');
var robot = sharedObject.robot;

var i = ReactDOM.render(
  <Input sendMessage={ (text) => {
    addMessages(text, 'user');
    robot.receiveInput(text);
  } } />,
  document.getElementById('input')
);

var m = ReactDOM.render(
  <Messages messages={ [ { id: 1, type: 'chara', body: 'first' } ] } />,
  document.getElementById('messages')
);

var mascot = ReactDOM.render(
  <Mascot
    style={ { width: '100%' } } />,
  document.getElementById('mascot')
);

function addMessages(body, type, id = null) {
  id = id || new Date().valueOf();
  var message = {
    id: id,
    type: type,
    body: body
  };

  m.setState({
    messages: m.state.messages.concat([message])
  });

  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

robot.on('send_inside', (envelope, strings) => {
  addMessages(strings[0], 'chara');
});

robot.on('send_outside', (envelope, strings) => {
  addMessages(strings, 'chara');
});

robot.on('receive_inside', (message) => {
  // console.log(message);
  // addMessages(message.text, 'user-command');
});

robot.on('receive_outside', (message, strings) => {
  if (strings) {
    addMessages(strings, 'other');
  } else {
    addMessages(message.text, 'other');
  }
});

Recognition.addEventListener('result', function(event){
  if (event.results[event.resultIndex].isFinal) {
    robot.receiveVoice(event.results[event.resultIndex][0].transcript);
  }
});

Recognition.addEventListener('error', function (err) {
  if (err.error != 'no-speech') {
    console.error(err);
  }
  recognition = null;
});

ipcRenderer.on('voice-input', function() {
  if (recognitionStarted) {
    clearTimeout(recognitionStopTimer);
    recognition.stop();
    recognitionStarted = false;
  } else {
    recognition.start();
    recognitionStarted = true;
    recognitionStopTimer = setTimeout(function () {
      recognition.stop();
      recognitionStarted = false;
    }, 10000);
  }
  console.log(recognitionStarted);
});

ipcRenderer.on('focus', function() {
  document.body.classList.remove('blur');
  document.querySelector('.input__text').focus();
});

ipcRenderer.on('blur', function() {
  document.body.classList.add('blur');
});

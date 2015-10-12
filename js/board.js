/* global five, ChromeUsbSerialport */
'use strict';

(function() {

  var socket = io('ws://localhost:3000');

  var sp = new SocketIoSerialPort({
    client: socket,
    device: {   //put your device channel/address here
      channel: 'serial',
      address: '/dev/cu.usbmodem1411'
      //channel: 'ble',
      //name: 'BleFirmata',
      //address: 'd0:6a:cf:58:ee:bd'
    }
  });

  var toggle = document.getElementById('led-blink');

  sp.connect().then(function() {
    // have a ready serial port, do something with it:
    var board = new five.Board({port: sp, repl: false});
    board.on('ready', function() {
      console.log('Arduino board is ready.');
      parent.postMessage('Arduino board is ready.', '*');
      window.dispatchEvent(new CustomEvent('boardready'));
    });
  });
  
  console.log('Connecting Arduino board...');
  parent.postMessage('Connecting Arduino board...', '*');

  // Export arduino to replace global five object.
  // It more makes sense to developers.
  window.arduino = five;  
}());

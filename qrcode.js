/*
*copyright Ryan Day 2012
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* this is the main server side application file for node-qrcode. 
* these exports use serverside canvas api methods for file IO and buffers
*
*/

var QRCodeLib = require(__dirname+'/lib/qrcode-draw')
, terminalRender = require(__dirname+'/lib/termialrender.js')
, fs = require('fs');


var QRCodeDraw = QRCodeLib.QRCodeDraw,
  QRCode = QRCodeLib.QRCode;

//EXPORTS

//
// breaking change to 0.1 this used to be an instance. now it returns the constructor.
//
exports.QRCodeDraw = QRCodeDraw;

//
// export error correct levels.
//
exports.errorCorrectLevels = QRCodeLib.QRErrorCorrectLevel;

/*
* provide an api to return the max characters allowed for given dimensions, and miniumum error correction level
* the qr code library will always use the maximum error correction level for the given numbar of chars constrained by size
*/
exports.getMaxChars = function(minErrorCorrectionLevel,width,moduleScale){
	//TODO THIS NEEDS TO WORK
  console.log('this doesnt work yet. comming soon =)');
};


//
//this returns an array of points that have either a 0 or 1 value representing 0 for light and 1 for dark
//these values include points in the white edge of the qrcode because that edge is actually part of the spec  
//
exports.drawBitArray = function(text,options,cb){

  if(typeof options == 'function'){
    cb = options;
    options = {};
  }

  var drawInstance = new QRCodeDraw();
  drawInstance.drawBitArray(text,function(error,bits,width){
    cb(error,bits,width);
  });
}

//
// draw qr in your terminal!
//
exports.drawText = function(text,options,cb){

  if(typeof options == 'function'){
    cb = options;
    options = {};
  }

  var drawInstance = new QRCodeDraw();
  drawInstance.drawBitArray(text,function(error,bits,width){
    if (!error) {
      var code = terminalRender.renderBits(bits,width);
      cb(error,code);
    } else {
      cb(error,null);
    }
  });
}


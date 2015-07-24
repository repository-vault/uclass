"use strict";

var expect = require('expect.js')
var Class = require('../')

var Time = new Class({
  Binds : ['add_minute', 'add_houre'],
  Implements: [require('../events')],

  foo : 'bar',

});


describe("events testing", function(){


    it("should fire every time", function(){
        var time = new Time(8, 55);
        var a = 0, inc = function(){
            a += 1;
        };
        time.on("fooa", inc);
        time.emit("fooa");

        expect(a).to.be(1);
        time.emit("fooa");
        expect(a).to.be(2);
    });




    it("should allow multiple subscriptions", function(){
        var time = new Time(8, 55);
        var b = 0, a = 0, ainc = function(){
            a += 1;
        }, binc = function(){
            b += 1;
        };

        time.once("foo", ainc);
        time.on("foo", binc);


        time.emit("foo");
        expect(a).to.be(1);
        expect(b).to.be(1);
    });


    if(false) it("should support complex mixing once & on", function(){
        var time = new Time(8, 55);
        var b = 0, a = 0, ainc = function(){
            a += 1;
        }, binc = function(){
            b += 1;
        };

        time.once("foo", ainc);
        time.on("foo", binc);


        time.emit("foo");
        expect(a).to.be(1);
        expect(b).to.be(1);

        time.emit("foo");
        expect(a).to.be(1);
        expect(b).to.be(2);

    });




});
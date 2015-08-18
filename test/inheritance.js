"use strict";

var expect = require('expect.js')
var Class = require('../');


var Foo = new Class({
  initialize : function(){
    this.foo = "bar";
  }
});


var Interval = new Class({
  Binds : ['lol'],
  Implements : [Foo],
  lol : function(){

  }
});



var Instance = new Class({
  Extends : Interval,

  initialize:function(){
    //dummy initialize
  }
});


describe("Complex inheritance stack", function(){

    it("must allow mixin to be initialized when used in a derived class", function(){
        var instance = new Instance();
        expect(instance.foo).to.be('bar');
    });

});




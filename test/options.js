"use strict";

var guid  = require('mout/random/guid')
var expect = require('expect.js')
var Class = require('../')
var Options = require('../options');

var Foo = new Class({
  Implements : Options,
  options : {
    foo : 'bar',
  },

  initialize : function(options){
    this.setOptions(options);
  },

});


describe("Testing options", function(){

    it("should work a little", function(){

        var foo = new Foo({ color : 'yellow'});

        expect(foo.options.foo).to.be('bar');
        expect(foo.options.color).to.be('yellow');
    });


    it("should override a little", function(){

        var foo = new Foo({ foo : 'yellow'});

        expect(foo.options.foo).to.be('yellow');
    });


})




var Foo2 = new Class({
  Implements : Options,
  options : {
    foo : 'bar',
  },

});

var Bar = new Class({
  Extends : Foo2,
  options : {
    color : 'yellow',
  },

  initialize : function(options){
    this.setOptions(options);
  },

});



describe("Testing inheritance", function(){

    it("should work a little", function(){

        var foo = new Bar();

        expect(foo.options.foo).to.be('bar');
        expect(foo.options.color).to.be('yellow');
    });



})




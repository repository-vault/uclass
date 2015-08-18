"use strict";

var expect = require('expect.js')
var Class = require('../');
var statik = require('../static');


var Foo = new Class({
  bar : statik(function(){
    return 22;
  }),


});



describe("Checking static methods", function(){

    it("must check for dummy static class method", function(){
        expect(Foo.bar() ).to.be(22);
    });

});



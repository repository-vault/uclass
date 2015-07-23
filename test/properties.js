"use strict";

var guid  = require('mout/random/guid')
var okeys = require('mout/object/keys')
var expect = require('expect.js')
var Class = require('../')

var Animal = new Class({
    paths : {},

    initialize: function(){
    },

    back_home: function(){
      this.paths[guid()] = true;
    },
});



describe("Simple stack", function(){

    it("should have be properly setup", function(){
        var mouse = new Animal();
        mouse.back_home();
        mouse.back_home();
        expect(okeys(mouse.paths).length).to.be(2);

          //objects properties are detached from the prototype
        var cat = new Animal();
        cat.back_home();
        expect(okeys(cat.paths).length).to.be(1);

    })


})


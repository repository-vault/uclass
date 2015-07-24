"use strict";

var guid  = require('mout/random/guid')
var okeys = require('mout/object/keys')
var expect = require('expect.js')
var Class = require('../')


var Animal = new Class({
    paths : {},
    four: 4,
    null  : null,
    array : [1,2,3],

    initialize: function(){
    },

    back_home: function(){
      this.paths[guid()] = true;
    },

    shift : function(){
      return this.array.shift();
    },

});
/*


function uclass(proto){
  var requested_constructor = object.initialize || function()[};

  var baseFuncs = {};
  for(var key in proto) {
    var isProtoFunc = typeof proto[key] == "function";
    if(proto.Binds)
      isProtoFunc &= proto.Binds.indexOf(key) == -1;

    if(isProtoFunc) {
      baseFuncs[key] = proto[key];
      delete  proto[key];
    }
  }
  
  var constructor = function(){
    var self = this;

    for(var key in proto) {
      
      if(typeof proto[key] == "function')
        this[key] = proto[key].bind(this);
      if(typeof proto[key] == "object')
        this[key] = Object.merge({}, proto[key]);
      elseif(typeof proto[key] == "array')
        this[key] = proto[key].slice();
      else
        this[key] = proto[key];

    }

    requested_constructor.apply(this, arguments);
  }

  constructor.prototype = baseFuncs;
  return constructor;
}








*/

describe("Simple stack", function(){

    it("should not have been altered", function(){
        var mouse = new Animal();
        expect(mouse.four).to.be(4);
        expect(JSON.stringify(mouse.array)).to.be(JSON.stringify([1,2,3]));
        expect(mouse.null).to.be(null);

    });

    it("should have independant object property per instance", function(){
        var mouse = new Animal();
        mouse.back_home();
        mouse.back_home();
        expect(okeys(mouse.paths).length).to.be(2);

          //objects properties are detached from the prototype
        var cat = new Animal();
        cat.back_home();
        expect(okeys(cat.paths).length).to.be(1);
    })


    it("should have independant array property per instance", function(){
        var mouse = new Animal();
        mouse.shift();
        mouse.shift();
        expect(mouse.array.length).to.be(1);

          //objects properties are detached from the prototype
        var cat = new Animal();
        expect(cat.array.length).to.be(3);
    })


})


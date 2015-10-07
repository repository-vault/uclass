"use strict";

var expect = require('expect.js');
var Class = require('../');


var Animal = new Class({

    Binds : ['getName_b'],

    initialized: false,

    initialize: function(name){
        this.name = name;
    },

    getName: function(){
        return this.name;
    },

    getName_b: function(){
        return this.name;
    }

});



describe("Binding test", function(){

    it("should test simple binding", function(){

        var lion = new Animal("lion");
        expect(lion.getName()).to.be("lion");

          //this      is     javascript
        var tiger = { name : "tiger", getName : lion.getName };
        expect(tiger.getName()).to.be("tiger");
    })

    it("should test forced binding", function(){

        var lion = new Animal("lion");
        expect(lion.getName_b()).to.be("lion");

        var tiger = { name : "tiger", getName_b : lion.getName_b };
        expect(tiger.getName_b()).to.be("lion");
    })

    it("should test wrapped function property conservation", function(){

        //add some propery on a function
      var hide = function(fn){
        fn.$hide = true;
        return fn;
      }

      var Animal = new Class({

          Binds : ['getName'],

          initialized: false,

          initialize: function(name){
              this.name = name;
          },

          getName: hide(function(){
              return this.name;
          }),
      });

      var lion = new Animal("lion");
      var tiger = { name : "tiger", getName : lion.getName };
      expect(tiger.getName()).to.be("lion");
      expect(tiger.getName.$hide).to.be.ok();
    })


});

"use strict";

var expect = require('expect.js')
var Class = require('../')

var ProtoAnimal = new Class({
  Implements: [require('../events')],
  
});

var Animal = new Class({
  Binds : ['walk', 'step'],
  Extends : ProtoAnimal,

  initialize : function(position){
    this.position  = position;
    this.on("tick", this.walk);
  },

  step : function(i){
    this.position += i;
  },

  walk : function(){
    this.step(1);
  },

});


describe("events testing", function(){

    it("should trigger events", function(){
        var cat = new Animal(1);

        expect(cat.position).to.be(1);
        cat.walk();
        cat.walk();
        expect(cat.position).to.be(3);
        cat.emit("tick");
        expect(cat.position).to.be(4);


        var dog = new Animal(1);

        expect(dog.position).to.be(1);
        dog.walk();
        dog.walk();
        expect(dog.position).to.be(3);
        dog.emit("tick");
        expect(dog.position).to.be(4);

    })

});

# Motivation

[uclass](https://github.com/131/uclass) is a class syntax helper for javascript (mostly an ES5 classes syntax). It's inspired by Mootools/Class (with Class.Mutator.Bind)  & prime projects.
There is **no runtime overload** as this is just a syntax wrapper around javascript native Prototype. uClass "classes" are fully interoperable with ES6 classes (i.e they can "extend" each other)

* As in prime, uclass use mout for javascript utilities.
* As in primish, uclass keep the old "Extends" & "Implements" design/syntax.


[![Coverage Status](https://coveralls.io/repos/github/131/uclass/badge.svg?branch=master)](https://coveralls.io/github/131/uclass?branch=master)
[![Build Status](https://travis-ci.org/131/uclass.svg?branch=master)](https://travis-ci.org/131/uclass)
[![Version](https://img.shields.io/npm/v/uclass.svg)](https://www.npmjs.com/package/uclass)



# Example

```
var Class  = require('uclass');
var statik = require('uclass/static');

var Ball = new Class({
 Binds:['step'], //
  
 color :'red',
 direction:[0,0],
 radius:0,
 position:[0,0],
 
 initialize: function(radius, direction){
   this.radius = radius || 10;
   this.direction = direction || [Math.random()*10, Math.random()*10];
 },
 
 step:function(){
  this.position[0] += this.direction[0];
  this.position[1] += this.direction[1];
 },


 generate : statik( function(radius, position){
    return new Ball(radius, position);
 } ),

});

var ball = new Ball(12);

```


# Api/mixin
Using Implements : [list of traits] you can add method to your class prototype using any native object
```
Implements : [
  require('events').EventEmitter, //for node
  require('uclass/events'),       //for the browser
  require('uclass/options'),      //add setOptions (merge(this.options))
  require('uclass/static'),       //declare a static member
}

```

#License
MIT License style, please distribute & credit me somewhere.


# Why
Just use ES6 classes, but if you don't want to, this is properly maintened, tested & covered


# Credits
* [131](https://github.com/131)

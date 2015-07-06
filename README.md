# Motivation

uclass is a micro class that mimic mootools' base Class.js & Class.Mutator.Bind syntax, without the inheritence stack. There is no runtime overload as this is just a syntax wrapper around javascript native Prototype.
Feel free to switch to a proper framework (e.g. prime/mootools :)  anytime after.


# Example

```
var Class = require('uclass');

var Ball = new Class({
 Binds:['step'], //force 
  
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
 }
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
}

```


#License
MIT License style, please distribute & credit me somewhere.

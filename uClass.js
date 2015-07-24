var hasOwn = require("mout/object/hasOwn");
var create = require("mout/lang/createObject");
var merge = require("mout/object/merge");
var kindOf = require("mout/lang/kindOf");


Function.prototype.static = function(){
  this.$static = true;
  return this;
}

//from http://javascript.crockford.com/prototypal.html

var verbs = /^Implements|Extends|Binds$/

var implement = function(obj){
  for(var key in obj) {
    if(key.match(verbs)) continue;
    if((typeof obj[key] == 'function') && obj[key].$static)
      this[key] = obj[key];
    else
      this.prototype[key] = obj[key];
  }
  return this;
}



var uClass = function(proto){

  if(kindOf(proto) === "Function") proto = {initialize: proto};

  var superprime = proto.Extends;

  var constructor = (hasOwn(proto, "initialize")) ? proto.initialize : (superprime) ? function(){
        return superprime.apply(this, arguments)
    } : function(){};


  var out = function() {
    var self = this;
      //autobinding takes place here
    if(proto.Binds) proto.Binds.forEach(function(f){
      var original = proto[f];
      if(original) self[f] = proto[f].bind(self);
    });

      //clone non function/static properties to current instance
    for(var key in out.prototype) {
      var v = out.prototype[key], t = kindOf(v);

      if(key.match(verbs) || t === "Function") continue;
      if(t == "Object")
        self[key] = merge({}, self[key]); //create(null, self[key]);
      else if(t == "Array")
        self[key] = v.slice(); //clone ??
      else
        self[key] = v;
    }

    if(proto.Implements) {
      if (kindOf(proto.Implements) !== "Array")
        proto.Implements = [proto.Implements];

      proto.Implements.forEach(function(Mixin){
        debugger;
        Mixin.call(self);
      });
    }



    constructor.apply(this, arguments);
  }

  out.implement = implement;


  if (superprime) {
    // inherit from superprime
      var superproto = superprime.prototype;
      if(superproto.Binds)
        proto.Binds = (proto.Binds || []).concat(superproto.Binds);

      var cproto = out.prototype = create(superproto);
      // setting constructor.parent to superprime.prototype
      // because it's the shortest possible absolute reference
      out.parent = superproto;
      cproto.constructor = out

  }


 if(proto.Implements) {
    if (kindOf(proto.Implements) !== "Array")
      proto.Implements = [proto.Implements];
    proto.Implements.forEach(function(Mixin){
      out.implement(Mixin.prototype);
    });
  }

  out.implement(proto);
  if(proto.Binds)
     out.prototype.Binds = proto.Binds;

  return out;
};



module.exports = uClass;
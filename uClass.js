var hasOwn = require("mout/object/hasOwn");
var create = require("mout/lang/createObject");

Function.prototype.static = function(){
  this.$static = true;
  return this;
}

//from http://javascript.crockford.com/prototypal.html

var verbs = /^initialize|Implements|Extends$/

var implement = function(obj){
  for(var key in obj) {
    if (key.match(verbs)) continue;

    if((typeof obj[key] == 'function') && obj[key].$static)
      this[key] = obj[key];
    else
      this.prototype[key] = obj[key];
  }

  return this;
}



var uClass = function(proto){

  var superprime = proto.Extends;

  var constructor = (hasOwn(proto, "initialize")) ? proto.initialize : (superprime) ? function(){
        return superprime.apply(this, arguments)
    } : function(){};

  var out = function() {
      //autobinding takes place here
    if(proto.Binds) proto.Binds.forEach(function(f){
      var original = this[f];
      if(original) this[f] = original.bind(this);
    }, this);

    constructor.apply(this, arguments);
  }

  out.implements = implement;

  if(proto.Implements)
    proto.Implements.forEach(function(Mixin){
      out.implements(new Mixin);
    });

  if (superprime) {
    // inherit from superprime
      var superproto = superprime.prototype;
      var cproto = out.prototype = create(superproto);
      // setting constructor.parent to superprime.prototype
      // because it's the shortest possible absolute reference
      out.parent = superproto;
      cproto.constructor = out
  }

  out.implements(proto);

  return out;
};



module.exports = uClass;
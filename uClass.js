var hasOwn = require("mout/object/hasOwn");
var create = require("mout/lang/createObject");
var kindOf = require("mout/lang/kindOf");


Function.prototype.static = function(){
  this.$static = true;
  return this;
}

//from http://javascript.crockford.com/prototypal.html

var verbs = /^Implements|Extends$/

var implement = function(obj){
  for(var key in obj) {
    if(key.match(verbs)) continue;
    if((typeof obj[key] == 'function') && obj[key].$static)
      this[key] = obj[key];
    else
      this.prototype[key] = obj[key];
  }
  if('Binds' in obj) {
      console.log("Allbind",  obj.Binds, this.Binds);


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
      //autobinding takes place here
    if(proto.Binds) proto.Binds.forEach(function(f){
      var original = this[f];
      if(original) this[f] = original.bind(this);
    }, this);

    constructor.apply(this, arguments);
  }

  out.implement = implement;


  if (superprime) {
    // inherit from superprime
      var superproto = superprime.prototype;
      if(superproto.Binds && proto.Binds)
        proto.Binds = proto.Binds.concat(superproto.Binds);

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
      out.implement(new Mixin());
    });
  }
  out.implement(proto);

  return out;
};



module.exports = uClass;
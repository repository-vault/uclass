Function.prototype.static = function(){
  this.$static = true;
  return this;
}

var uClass = function(obj){
  var out = function(){
    if(obj.Binds) obj.Binds.forEach(function(f){
      var original = this[f];
      if(original) this[f] = original.bind(this);
    }.bind(this));
    obj.initialize.apply(this, arguments);
  }
  out.implements = function(obj){
    for(var i in obj) {
      if((typeof obj[i] == 'function') && obj[i].$static)
        out[i] = obj[i];
      else
        out.prototype[i] = obj[i];
    }
  }

  if(obj.Implements)
    obj.Implements.forEach(function(Mixin){
      out.implements(new Mixin);
    });
  out.implements(obj);

  return out;
};



module.exports = uClass;
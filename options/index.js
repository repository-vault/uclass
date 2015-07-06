var Class = require('uclass');
var merge = require("mout/object/merge")

var Options = new Class({

  initialize : function(){
    if(!this.options)
      this.options = {};
    //this.options = should clone here 
  },

  setOptions: function(options){
      var args = [{}, this.options]
      args.push.apply(args, arguments)
      this.options = merge.apply(null, args)
      return this
  }
});

module.exports = Options;
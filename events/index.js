var EventEmitter = function(){}

EventEmitter.prototype = {
  callbacks : {},

  fireEvent:function(event, payload){
    if(!this.callbacks[event])
      this.callbacks[event] = [];

    var args = Array.prototype.slice.call(arguments, 1);

    this.callbacks[event].forEach(function(callback){
      callback.apply(null, args);
    });
  },


  on:function(event, callback){
    if(!this.callbacks[event])
      this.callbacks[event] = [];
    this.callbacks[event].push(callback);
  },

  once:function(event, callback){
    var self = this;
    var once = function(){
      self.removeListener(event, once);
      callback.apply(null, arguments);
    };

    this.on(event, once);
  },

  removeListener:function(event, callback){
    var i = (this.callbacks[event] || []).indexOf(callback);
    if(i == -1)
      return;
    this.callbacks[event].splice(i);
  },
};

module.exports = EventEmitter;
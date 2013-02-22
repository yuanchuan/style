
/**
 * Expose.
 */
module.exports = Style;


/**
 * Create an instance of Style
 * @param {Object} pre-defined variables
 */
function Style(map) {
  if (!(this instanceof Style)) {
    return new Style(map);
  }
  this.map = _mixin({}, map);
  this.rules = '';
  this.elem = null;
};


Style.prototype = {

  /**
   * Define new variables.
   * @param {object}
   */
  define: function(map) {
    this.map = _mixin(this.map, map);
    return this;
  },
 
   
  /**
   * Add new css but won't refresh the style element's content.
   * @param {string} Accepts multiple params
   */
  add: function() {
    var rules = _getRules(arguments);
    rules && (this.rules += rules);
    return this;
  },


  /**
   * Append new css to the style element or refresh its content. 
   * @param {string}
   */
  load: function() {
    if (!this.elem) {
      this.elem = _createStyleElem();
    }
    if (arguments.length) {
      this.add.apply(this, arguments);
    }
    _refreshStyleContent(this.elem, this.rules, this.map);
    return this;
  },


  /**
   * Clear the style and varialbes.
   */
  clear: function() {
    _setStyleContent(this.elem, '');
    this.rules = '';
    this.map = {};
    return this;
  },


  /**
   * Remove the style element completely.
   */
  remove: function() {    
    var elem = this.elem;
    if (elem && elem.parentNode) {
      this.clear();
      this.elem = null;
      elem.parentNode.removeChild(elem);
    }
    return this;
  }
  
};


function _mixin() {
  var mix = {}, idx, arg, name;
  for (idx = 0; idx < arguments.length; idx += 1) {
    arg = arguments[idx];
    for (name in arg) {
      if (arg.hasOwnProperty(name)) {
        mix[name] = arg[name];
      }
    }
  }
  return mix;
}


// Make a list of parameters of css into a single string.
function _getRules(args) {
  return [].join.call(args, '');
}


// Create new stylesheet.
function _createStyleElem() {
  var elem = document.createElement('style')
    , head = document.getElementsByTagName('head')[0];
  head && head.appendChild(elem);
  return elem;
}


// Substitute variables in the string with defined map. 
function _substitute(str, map) {    
  for (var name in map) {
    if (map.hasOwnProperty(name)) {
      str = str.replace(new RegExp('@' + name, 'gi'), map[name]);
    }
  }
  return str;
}


// Set the style element's content.
function _setStyleContent(el, content) {
  if (el && el.tagName.toLowerCase() === 'style') {
    el.styleSheet 
      ? (el.styleSheet.cssText = content )
      : (el.innerHTML = content);
  }
}


// Refresh the content with the rules and defined variables.
function _refreshStyleContent(elem, rules, map) {
  _setStyleContent(elem, 
    _substitute(rules, map)
  );
}


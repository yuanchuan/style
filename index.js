/**
 * Style -  Create stylesheets dynamically in JavaScript.
 * https://github.com/yuanchuan/style
 */

var Style = module.exports = function(map) {
  if (!(this instanceof Style)) {
    return new Style();
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
   * Add new css but won't refresh the style tag's content.
   * @param {string} Accepts multiple params
   */
  add: function() {
    var rules = _getRules(arguments);
    rules && (this.rules += rules);
    return this;
  },


  /**
   * Append css to a new or to the exsisting style tag.
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
   * Clear the style tag's content as well as the rules stored.
   */
  clear: function() {
    _setStyleContent(this.elem, '');
    this.rules = '';
    this.map = {};
    return this;
  },


  /**
   * Removes the style tag completely.
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


function _createStyleElem() {
  var elem = document.createElement('style')
    , head = document.getElementsByTagName('head')[0];
  head && head.appendChild(elem);
  return elem;
}


// Replace all the variables with the defined values in the map.
function _substitute(str, map) {    
  for (var name in map) {
    if (map.hasOwnProperty(name)) {
      str = str.replace(new RegExp('@' + name, 'gi'), map[name]);
    }
  }
  return str;
}


// Set the content of a style element.
function _setStyleContent(el, content) {
  if (el && el.tagName.toLowerCase() === 'style') {
    el.styleSheet 
      ? (el.styleSheet.cssText = content )
      : (el.innerHTML = content);
  }
}

//Refresh the style tag's content with the rules and defined variables.
function _refreshStyleContent(elem, rules, map) {
  _setStyleContent(elem, 
    _substitute(rules, map)
  );
};


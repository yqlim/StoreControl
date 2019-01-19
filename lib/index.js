/*!
 * StoreManager
 * (c) 2019 Yong Quan Lim
 * Released under MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.StoreManager = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var StoreManager =
  /*#__PURE__*/
  function () {
    function StoreManager() {
      var _this = this;

      _classCallCheck(this, StoreManager);

      var initDefault = function initDefault() {
        _newArrowCheck(this, _this);

        return {
          value: []
        };
      }.bind(this);

      Object.defineProperties(this, {
        keys: initDefault(),
        values: initDefault(),
        entries: initDefault()
      });
    }

    _createClass(StoreManager, [{
      key: "size",
      value: function size() {
        var eLen = this.entries.length,
            vLen = this.values.length,
            kLen = this.keys.length;
        if (eLen !== vLen || eLen !== kLen || typeof eLen !== 'number' || eLen < 0) throw new RangeError('Item(s) of entries, values or keys has been altered by external method.');
        return eLen;
      }
    }, {
      key: "set",
      value: function set(key, val) {
        if (typeof key === 'string' || typeof key === 'number' && key !== Infinity && key !== -Infinity || _typeof(key) === 'object' && key || typeof key === 'function' || _typeof(key) === 'symbol') ;else throw new TypeError('Key must be a string, object, function, valid number, symbol of Symbol(), or NaN.');
        var i = this.keys.indexOf(key);

        if (i < 0) {
          i = this.size();
          this.entries[i] = [];
        } else if (this.values[i] instanceof StoreManager) throw new TypeError("Cannot replace ".concat(key, " because it is a user-defined StoreManager branch."));

        this.keys[i] = key;
        this.values[i] = val;
        this.entries[i][0] = key;
        this.entries[i][1] = val;
        return val;
      }
    }, {
      key: "get",
      value: function get(key) {
        var i = this.keys.indexOf(key);
        return i < 0 ? null : this.values[i];
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.keys.indexOf(key) >= 0;
      }
    }, {
      key: "branch",
      value: function branch(id) {
        if (this.has(id)) throw new ReferenceError("Property ".concat(id, " already exists in this StoreManager instance."));
        return this.set(id, new StoreBranch());
      }
    }, {
      key: "of",
      value: function of(branch) {
        var ret = this.get(branch);
        if (ret === null) throw new ReferenceError("Branch ".concat(branch, " does not exist in this StoreManager instance."));
        if (!this.isBranch(ret)) throw new TypeError("\"".concat(branch, "\" key does not link to a StoreManager branch."));
        return ret;
      }
    }, {
      key: "isBranch",
      value: function isBranch(id) {
        try {
          return !!this.of(id);
        } catch (e) {
          return false;
        }
      }
    }, {
      key: "delete",
      value: function _delete(key) {
        var i = this.keys.indexOf(key);
        if (i < 0) return false;
        this.keys.splice(i, 1);
        this.values.splice(i, 1);
        this.entries.splice(i, 1);
        return true;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.keys.splice(0);
        this.values.splice(0);
        this.entries.splice(0);
      }
    }, {
      key: "asMap",
      value: function asMap() {
        var ret = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                val = _step$value[1];

            ret[key] = this.isBranch(val) ? val.asMap() : val;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return ret;
      }
    }]);

    return StoreManager;
  }();

  var StoreBranch =
  /*#__PURE__*/
  function (_StoreManager) {
    _inherits(StoreBranch, _StoreManager);

    function StoreBranch() {
      _classCallCheck(this, StoreBranch);

      return _possibleConstructorReturn(this, _getPrototypeOf(StoreBranch).call(this));
    }

    return StoreBranch;
  }(StoreManager);

  return StoreManager;

}));

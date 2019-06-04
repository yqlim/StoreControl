/*!
 * StoreControl
 * (c) 2019 Yong Quan Lim
 * Released under MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.StoreControl = factory());
}(this, function () { 'use strict';

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

  var StoreControl =
  /*#__PURE__*/
  function () {
    function StoreControl() {
      var _this = this;

      _classCallCheck(this, StoreControl);

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

    _createClass(StoreControl, [{
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
        if (key === null || key === undefined || typeof key === 'boolean' || typeof key === 'number' && (!isFinite(key) || isNaN(key))) {
          throw new TypeError('Key cannot be null, a boolean, NaN, or an infinite number.');
        }

        var i = this.keys.indexOf(key);

        if (i < 0) {
          i = this.size();
          this.entries[i] = [];
        } else if (this.values[i] instanceof StoreBranch) {
          throw new TypeError("Cannot replace \"".concat(key, "\" because it is a user-defined StoreControl branch."));
        }

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
        if (this.has(id)) {
          try {
            id = JSON.stringify(id);
          } catch (err) {
            id = String(id);
          }

          throw new TypeError("Property \"".concat(id, "\" already exists in this StoreControl instance."));
        }

        return this.set(id, new StoreBranch());
      }
    }, {
      key: "of",
      value: function of(branchID) {
        var ret = this.get(branchID);
        if (ret === null) throw new ReferenceError("Branch \"".concat(branchID, "\" does not exist in this StoreControl instance."));
        if (!(ret instanceof StoreBranch)) throw new TypeError("\"".concat(branchID, "\" key does not link to a StoreControl branch."));
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
        var _this2 = this;

        var ret = {};
        this.entries.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              val = _ref2[1];

          _newArrowCheck(this, _this2);

          ret[key] = this.isBranch(key) ? val.asMap() : val;
        }.bind(this));
        return ret;
      }
    }]);

    return StoreControl;
  }();

  var StoreBranch =
  /*#__PURE__*/
  function (_StoreControl) {
    _inherits(StoreBranch, _StoreControl);

    function StoreBranch() {
      _classCallCheck(this, StoreBranch);

      return _possibleConstructorReturn(this, _getPrototypeOf(StoreBranch).call(this));
    }

    return StoreBranch;
  }(StoreControl);

  return StoreControl;

}));

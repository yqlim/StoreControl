const assert = require('assert');
const StoreControl = require('./../lib/index.js');
const StoreControlMin = require('./../lib/index.min.js');


describe('StoreControl', test(StoreControl));
describe('StoreControl - Minified', test(StoreControlMin));


function test(StoreControl){

  return function(){

    const store = new StoreControl();
    const { keys, values, entries } = Object.getOwnPropertyDescriptors(store);

    const setting = (key, val) => StoreControl.prototype.set.bind(store, key, val);
    const branching = id => StoreControl.prototype.branch.bind(store, id);
    const offing = id => StoreControl.prototype.of.bind(store, id);
    const get = key => store.get(key);
    const has = key => store.has(key);
  
    const any = 'any';
    const branch = 'branch';
    const key = 'key';
    const val = 'value';
  
    const error = {
      invalidKey: {
        name: 'TypeError',
        message: 'Key cannot be null, a boolean, or an infinite number.'
      },
      duplicateKey: {
        name: 'TypeError',
        message: /^Cannot\sreplace\s\".{1,}\"\sbecause\sit\sis\sa\suser\-defined\sStoreControl\sbranch\.$/
      },
      keyExisted: {
        name: 'TypeError',
        message: /^Property\s\".{1,}\"\salready\sexists\sin\sthis\sStoreControl\sinstance\.$/
      },
      branchNotExist: {
        name: 'ReferenceError',
        message: /^Branch\s\".{1,}\"\sdoes\snot\sexist\sin\sthis\sStoreControl\sinstance\.$/
      },
      inavlidBranchID: {
        name: 'TypeError',
        message: /^\".{1,}\"\skey\sdoes\snot\slink\sto\sa\sStoreControl\sbranch\.$/
      }
    };
  
    describe('.keys', function(){
      
      it('should not be writable.', function(){
        assert.equal(keys.writable, false);
      });
    
      it('should not be enumerable.', function(){
        assert.equal(keys.enumerable, false);
      });
    
      it('should not be configurable.', function(){
        assert.equal(keys.configurable, false);
      });
  
    });
  
    describe('.values', function(){
    
      it('should not be writable.', function(){
        assert.equal(values.writable, false);
      });
    
      it('should not be enumerable.', function(){
        assert.equal(values.enumerable, false);
      });
    
      it('should not be configurable.', function(){
        assert.equal(values.configurable, false);
      });
  
    });
  
    describe('.entries', function(){
    
      it('should not be writable.', function(){
        assert.equal(entries.writable, false);
      });
    
      it('should not be enumerable.', function(){
        assert.equal(entries.enumerable, false);
      });
    
      it('should not be configurable.', function(){
        assert.equal(entries.configurable, false);
      });
  
    });
  
    describe('.set', function(){
  
      it('should throw if key is null.', function(){
        assert.throws(setting(null), error.invalidKey);
      });
    
      it('should throw if key is a boolean.', function(){
        assert.throws(setting(true), error.invalidKey);
        assert.throws(setting(false), error.invalidKey);
      });
    
      it('should throw if key is an infinite number.', function(){
        assert.throws(setting(Infinity), error.invalidKey);
        assert.throws(setting(-Infinity), error.invalidKey);
      });
    
      it('should not throw if key is valid.', function(){
        assert.doesNotThrow(setting(key, val));
      });
  
      it('should reflect in .keys, .values, and .entries if key is valid.', function(){
        assert.strictEqual(store.keys.indexOf(key), 0);
        assert.strictEqual(store.values.indexOf(val), 0);
        assert.deepStrictEqual(store.entries[0], [key, val]);
      });
  
    });
  
    describe('.get', function(){
  
      it('should be null if key is not found.', function(){
        assert.strictEqual(get(any), null);
      });
  
      it('should get correct value if key is found.', function(){
        assert.deepStrictEqual(get(key), val);
      });
  
    });
  
    describe('.has', function(){
  
      it('should return true if key is found.', function(){
        assert.strictEqual(has(key), true);
      });
  
      it('should return false if key is not found.', function(){
        assert.strictEqual(has(any), false);
      });
  
    });
  
    describe('.branch', function(){
  
      it('should not throw if key does not already exist.', function(){
        assert.doesNotThrow(branching(branch));
      });
  
      it('should throw if key already exist.', function(){
        assert.throws(branching(branch), error.keyExisted);
        assert.throws(branching(key), error.keyExisted);
      });
  
    });
  
    describe('.of', function(){
  
      it('should throw if branch does not exist.', function(){
        assert.throws(offing(any), error.branchNotExist);
      });
  
      it('should throw if id does not link to a branch', function(){
        assert.throws(offing(key), error.inavlidBranchID);
      });
  
      it('should return branch if id is valid.', function(){
        assert.doesNotThrow(offing(branch));
      });
  
    });
  
    describe('.isBranch', function(){
  
      it('should return true if branch is valid.', function(){
        assert.strictEqual(store.isBranch(branch), true);
      });
  
      it('should return false if branch is invalid.', function(){
        assert.strictEqual(store.isBranch(any), false);
        assert.strictEqual(store.isBranch(key), false);
      });
  
    });
  
    describe('.asMap', function(){
  
      it('should convert into object correctly.', function(){
        const map = store.asMap();
        assert.strictEqual(map[key], val);
        assert.strictEqual(map[any], undefined);
        assert.strictEqual(JSON.stringify(map[branch]), '{}');
      });
  
    });
  
    describe('.size', function(){
  
      it('should return correctly.', function(){
        assert.strictEqual(store.size(), 2);
      });
  
    });
  
    describe('.delete', function(){
  
      it('should return false if key does not exist.', function(){
        assert.strictEqual(store.delete(any), false);
      });
  
      it('should properly delete key and returns true if key is found.', function(){
        assert.strictEqual(store.delete(key), true);
        assert.strictEqual(store.size(), 1);
      });
  
    });
  
    describe('.clear', function(){
  
      it('should have size 0 after clearing.', function(){
        assert.doesNotThrow(store.clear.bind(store));
        assert.strictEqual(store.size(), 0);
      });
  
    });

  }

}

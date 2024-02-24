# StoreControl.js

## Overview

StoreControl.js aims to provide a simple store management interface to manage the stores in your web app.

There are many popular modules with similar functionality like [Redux](https://redux.js.org/), [MobX](https://mobx.js.org/) or [Vuex](https://vuex.vuejs.org/). These modules are very useful and provide a more stable store management container for a more complicated apps. For a simple app, however, they seem overkill.

This is why StoreControl.js exist.

## Install

With NPM:

```javascript
npm install storecontrol
```

With `<script>` include:

[Download the files](https://github.com/yqlim/StoreControl/releases/tag/v1.1.0) and include it in your HTML. Generally, the `.min` version is for production use.

## Usage

```javascript
const state = new StoreControl();
```

## Methods

### `.set(key, value)`

Use this method to set a new store property and value.

The `key` argument accepts any value that has a type of `string`, `object`, `number`, `function`, and `symbol`.

```javascript
// String
state.set('a', 'a')

// Any object instance (except null)
const b = []
state.set(b, 'b')

// Number type (except Infinity)
const c = 0
state.set(c, 'c')

const d = Symbol()
state.set(d, 'd')

// Any function instance
const e = function(){}
state.set(e, 'e')

// Symbol
const f = Symbol()
state.set(f, 'f')
```

Using `null`, `Infinity`, `-Infinity`, `NaN`, `undefined`, `true`, and `false` as `key` will throw a `TypeError`.

The `value` argument accepts any value.

### `.get(key)`

Here, the `key` argument accepts any value. It's just that when you use any `key` value that is not supported in the `.set()` method, you will always get `null` returned.

Be careful that whenever you use any object/function/symbol instance as `key` when you use `.set()`, you must always use the same reference to get the value back.

If we use the snippet above:

```javascript
const g = Symbol()
state.get(g)
// -> null

state.get(d)
// -> 'd'

/**
 * Because g === b is false.
 * Same concept applies to object/function instance.
 */
```

When using string or number as key, if you set the value using literal expression, you should get it back also by using literal expression. If you use its respective constructor, the object/function/symbol concept as shown above applies.

```javascript
state.get('a')
// -> 'a'

state.get(new String('a'))
// -> null
```

### `.has(key)`

This method checks whether a key already exist. Returns `true` if yes, otherwise `false`.

```javascript
state.has(e)
// -> true

state.has(function(){})
// -> false
```

### `.branch(id)`

This method creates a store branch in the existing StoreControl instance.

Basically, a branch is just setting a key (id) and automatically sets a new StoreControl instance as value. It's similar to setting `state.set(id, {})`. However, if you do not use the `.branch` method provided, your store value cannot enjoy the API provided by StoreControl.

Same rules of `key` argument applies for `id` argument here.

```javascript
const branchX = state.branch('x');
// -> StoreBranch {}
```

The `StoreBranch` constructor is a private constructor and is not accessible publically.

### `.of(id)`

This method retrieves a StoreControl's branch for you.

```javascript
state.of('x')
// -> StoreBranch {}

state.of('x') === branchX
// -> true

state.of(c)
// -> TypeError
```

### `.isBranch(id)`

Checks if the id passed as argument links to a `StoreBranch` in the current level of the instance. Returns `true` if yes, `false` otherwise.

```javascript
state.isBranch('x')
// -> true

state.isBranch(d)
// -> false
```

### `.size()`

Returns the size of the state.

```javascript
state.size()
// -> 7
```

If the length of any internal property of StoreControl instance is modified without using the methods provided, using `.size()` will throw a `RangeError`.

### `.asMap()`

Returns the entire StoreControl tree as a literal object. The returned object will be the native object thus does not have access to the StoreControl API.

The returned object will not be an accurate representation of the StoreControl instance if any object/function/symbol instance is used as key.

```javascript
state.asMap()
// -> { ... }
```

### `.delete(key)`

This method deletes the key and value from the store. Returns `true` if successful, `false` otherwise.

Same concept of `key` applies here.

```javascript
state.delete(e)
// -> true

state.delete('x')
// -> true

state.delete(1)
// -> false
```

### `.clear()`

This method completely clears your store and cannot be recovered.

```javascript
state.clear()
state.size()
// -> 0
```

## Properties

### `.keys`

Returns all the keys set in the instance as an array.

### `.values`

Returns all the values set in the instance as an array.

### `.entries`

Returns all the keys and values as an array of key-value pair arrays.

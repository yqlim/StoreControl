class StoreManager {

  constructor(){
    const initDefault = () => ({ value: [] });
    Object.defineProperties(this, {
      keys: initDefault(),
      values: initDefault(),
      entries: initDefault(),
    });
  }

  size(){
    const eLen = this.entries.length,
          vLen = this.values.length,
          kLen = this.keys.length;

    if (eLen !== vLen || eLen !== kLen || typeof eLen !== 'number' || eLen < 0)
        throw new RangeError('Item(s) of entries, values or keys has been altered by external method.');

    return eLen;
  }

  set(key, val){
    if (typeof key === 'string'
     || (typeof key === 'number' && key !== Infinity && key !== -Infinity)
     || (typeof key === 'object' && key)
     || typeof key === 'function'
     || typeof key === 'symbol'
    ); else
      throw new TypeError('Key must be a string, object, function, valid number, symbol of Symbol(), or NaN.');

    let i = this.keys.indexOf(key);

    if (i < 0){
      i = this.size();
      this.entries[i] = [];
    } else if (this.values[i] instanceof StoreManager)
      throw new TypeError(`Cannot replace ${key} because it is a user-defined StoreManager branch.`);

    this.keys[i] = key;
    this.values[i] = val;
    this.entries[i][0] = key;
    this.entries[i][1] = val;

    return val;
  }

  get(key){
    const i = this.keys.indexOf(key);
    return i < 0
      ? null
      : this.values[i];
  }

  has(key){
    return this.keys.indexOf(key) >= 0
  }

  branch(id){
    if (this.has(id))
      throw new ReferenceError(`Property ${id} already exists in this StoreManager instance.`);

    return this.set(id, new StoreBranch());
  }

  of(branch){
    const ret = this.get(branch);

    if (ret === null)
      throw new ReferenceError(`Branch ${branch} does not exist in this StoreManager instance.`);

    if (!this.isBranch(ret))
      throw new TypeError(`"${branch}" key does not link to a StoreManager branch.`);

    return ret;
  }

  isBranch(id){
    try {
      return !!this.of(id)
    } catch(e){
      return false;
    }
  }

  delete(key){
    const i = this.keys.indexOf(key);

    if (i < 0)
        return false;

    this.keys.splice(i, 1);
    this.values.splice(i, 1);
    this.entries.splice(i, 1);

    return true;
  }

  clear(){
    this.keys.splice(0);
    this.values.splice(0);
    this.entries.splice(0);
  }

  asMap(){
    const ret = {};

    for (const [key, val] of this.entries)
      ret[key] = this.isBranch(val) ? val.asMap() : val;

    return ret;
  }

}


class StoreBranch extends StoreManager {
  constructor(){
    super();
  }
}


export default StoreManager

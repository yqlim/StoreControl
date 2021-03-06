class StoreControl {

  constructor(){
    ((...props) => {
      for (let i = 0; i < props.length; i++){
        Object.defineProperty(this, props[i], { value: [] });
      }
    })('keys', 'values', 'entries');
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
    if (
      key === null
      || key === undefined
      || typeof key === 'boolean'
      || (typeof key === 'number' && (!isFinite(key) || isNaN(key)))
    ){
      throw new TypeError('Key cannot be null, a boolean, NaN, or an infinite number.');
    }

    let i = this.keys.indexOf(key);

    if (i < 0){
      i = this.size();
      this.entries[i] = [];
    } else if (this.values[i] instanceof StoreBranch){
      throw new TypeError(`Cannot replace "${key}" because it is a user-defined StoreControl branch.`);
    }

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
    if (this.has(id)){
      try {
        id = JSON.stringify(id);
      } catch(err){
        id = String(id);
      }
      throw new TypeError(`Property "${id}" already exists in this StoreControl instance.`);
    }

    return this.set(id, new StoreBranch());
  }

  of(branchID){
    const ret = this.get(branchID);

    if (ret === null)
      throw new ReferenceError(`Branch "${branchID}" does not exist in this StoreControl instance.`);

    if (!(ret instanceof StoreBranch))
      throw new TypeError(`"${branchID}" key does not link to a StoreControl branch.`);

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

    this.entries.forEach(([key, val]) => {
      ret[key] = this.isBranch(key) ? val.asMap() : val;
    });

    return ret;
  }

}


class StoreBranch extends StoreControl {
  constructor(){
    super();
  }
}


export default StoreControl;

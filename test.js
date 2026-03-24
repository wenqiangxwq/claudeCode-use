Object.prototype[Symbol.iterator] = function () {
  let index = 0;
  let keys = Object.keys(this);
  let that = this;
  return {
    next() {
      if (index < keys.length) {
        const value = that[keys[index]];
        index++;
        return {
          value,
          done: false
        };
      } else {
        return {
          done: true,
          value: false
        };
      }
    }
  };
};

let [a, b] = {
  a: 1,
  b: 2
};
console.log(a, b);
// let iterator = [1, 2, 3][Symbol.iterator]();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

const p1 = new Promise((resolve, reject) => {
  reject(2);
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p1.then(
  (res) => {
    console.log(res, "res");
  },
  (err) => {
    console.log(err, "err");
  }
);
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECT = "reject";
class MyPromise {
  constructor(executor) {
    this.resolveQueue = [];
    this.rejectQueue = [];
    this._status = PENDING;
    const _resolve = (val) => {
      if (this._status !== PENDING) {
        return;
      }
      this._status = FULFILLED;
      while (this.resolveQueue.length) {
        const callback = this.resolveQueue.shift();
        callback(val);
      }
    };
    const _reject = (val) => {
      if (this._status !== PENDING) {
        return;
      }
      this._status = REJECT;
      while (this.rejectQueue.length) {
        const callback = this.rejectQueue.shift();
        callback(val);
      }
    };
    executor(_resolve, _reject);
  }
  then(resolveFn, rejectFn) {
    this.resolveQueue.push(resolveFn);
    this.rejectQueue.push(rejectFn);
  }
}

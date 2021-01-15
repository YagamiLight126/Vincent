/* eslint-disable no-console */
declare class MyError extends Error {
  public constructor(message?: string);
}
function MyError(this: Error, message?: string) {
  this.name = "MyError";
  this.message = message || "Default Message";
  this.stack = new Error().stack;
}
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

try {
  throw new MyError();
} catch (e) {
  console.log(e.name); // 'MyError'
  console.log(e.message); // 'Default Message'
}

try {
  throw new MyError("custom message");
} catch (e) {
  console.log(e.name); // 'MyError'
  console.log(e.message); // 'custom message'
}

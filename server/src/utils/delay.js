const delay = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("nothing");
    }, 2000);
  });
const delayWithError = () =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject("nothing");
    }, 2000);
  });

module.exports = { delay, delayWithError };

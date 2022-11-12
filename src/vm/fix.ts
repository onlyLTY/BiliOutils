const timerMap = new Map();

// @ts-ignore
global.setInterval = function (fn, t) {
  let timer;
  function interval() {
    timer = setTimeout(() => {
      fn();
      interval();
    }, t);
  }
  interval();
  timerMap.set(timer, () => {
    clearTimeout(timer);
  });
  return timer;
};

// @ts-ignore
global.clearInterval = function (t) {
  const clear = timerMap.get(t);
  clear && clear();
  timerMap.delete(t);
};

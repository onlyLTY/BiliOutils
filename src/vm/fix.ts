const timerMap = new Map();

process.stdout.write('请尽快主动手动更新程序，以免出现意外情况。\n');

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

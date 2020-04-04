const soundFunctions = (() => {
  const context = new AudioContext();
  let o = context.createOscillator();
  let g = context.createGain();

  o.connect(g);
  g.connect(context.destination);

  let timeIntervalId;

  const start = ({
    frequencyStart = 5000, time = 2000, increase = 1000,
    listener,
  }) => {
    o.start();
    o.frequency.value = frequencyStart;

    listener({ event: 'start', frequency: o.frequency.value });

    timeIntervalId = setInterval(() => {
      o.frequency.value += increase;
      listener({ event: 'update', frequency: o.frequency.value });

      if (o.frequency.value > 21000) {
        clearInterval(timeIntervalId);
        listener({ event: 'stop', frequency: o.frequency.value });
      }
    }, time);
  };

  const stop = () => {
    o.stop();

    o = context.createOscillator();
    g = context.createGain();
    o.connect(g);
    g.connect(context.destination);

    clearInterval(timeIntervalId);
  };

  return { start, stop };
})();

export default soundFunctions;

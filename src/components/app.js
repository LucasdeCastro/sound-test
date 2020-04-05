import React, { useState } from 'react';
import Form from './form';
import sound from '../utils/sound';
import Chart from './chart';
import { get } from '../utils/firebase';
import '../main.css';

const App = () => {
  const [event, update] = useState({ frequency: 0 });
  const [chart, setChartState] = useState([]);
  const start = () => {
    sound.start({ listener: update });
  };

  if (!chart.length) {
    get().then((data) => {
      const intData = data.map((e) => ({
        ...e,
        age: parseInt(e.age, 10),
        frequency: parseInt(e.frequency, 10),
      }));

      setChartState(intData);
    });
  }

  console.log(chart);

  return (
    <>
      <h1 className="title">Perdendo audição</h1>
      <span className="info">
        Para mais informações assista esse video
        {' '}
        <a href="https://www.youtube.com/watch?v=uoxtAXN2tnI">aqui</a>
      </span>

      <div className="frequency">
        {event.frequency}
        {' '}
        Hz
      </div>

      <div className="controls">
        <button type="button" onClick={start}>Iniciar</button>
        <button type="button" onClick={sound.stop}>Parar</button>
      </div>

      <div className="form">
        <h3 className="title">Até que frequência você escuta?</h3>
        <Form />
      </div>

      <div className="chart">
        <div>
          {chart.length ? <Chart data={chart} /> : null}
        </div>
      </div>
    </>
  );
};

export default App;

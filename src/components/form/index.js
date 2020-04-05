import React, { useState } from 'react';
import { add } from '../../utils/firebase';
import './form.css';
import Loading from '../loading';

const Form = () => {
  const [form, setValue] = useState({ age: null, frequency: null, targets: [] });
  const [state, setState] = useState();
  const reset = () => form.targets.forEach((e) => { e.value = ''; });
  const save = async () => {
    if (form.age && form.frequency) {
      setState('loading');
      await add(form);
      setState('success');
      reset();
    }
  };

  return (
    <>
      <div className="row">
        <select
          name="age"
          defaultValue=""
          onChange={(e) => {
            form.targets[0] = e.target;
            setValue({ ...form, age: e.target.value });
          }}
        >
          <option disabled value="">Qual a sua idade?</option>
          {new Array(110)
            .fill(0)
            .map((x, i) => (
              <option key={`age-${x + i}`} value={i + 1}>
                {i + 1}
              </option>
            ))}
        </select>

        <select
          defaultValue=""
          onChange={(e) => {
            form.targets[1] = e.target;
            setValue({ ...form, frequency: e.target.value });
          }}
          name="frequency"
        >
          <option disabled value="">Em qual frequência você parou?</option>
          {new Array(18)
            .fill(0)
            .map((x, i) => (
              <option key={`frequency-${x + i}`} value={5000 + (i * 1000)}>
                {5000 + (i * 1000)}
                {' '}
                Hz
              </option>
            ))}
        </select>

        <button onClick={save} type="button">
          {state === 'loading' ? <Loading /> : 'Salvar'}
        </button>
      </div>
    </>
  );
};

export default Form;

import React from 'react';
import { actions, useFibonacciCounter } from '../../hooks/useFibonacciCounter';
import './styles.scss';

export const FibonacciExample: React.FC = () => {
  const { state, dispatch } = useFibonacciCounter();

  const handleButtonClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (event) => {
      const { name } = event.currentTarget;

      switch (name) {
        case 'decrease':
          dispatch(actions.decrementIndex());
          break;
        case 'increase':
          dispatch(actions.incrementIndex());
          break;
        case 'reset':
        default:
          dispatch(actions.reset());
          break;
      }
    },
    [dispatch]
  );

  const handleCheckboxChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(() => dispatch(actions.toggleIsAutoIncrementationTurnedOn()), [dispatch]);

  const handleCustomIndexChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const { value } = event.currentTarget;
      const valueAsNumber = Number(value);

      if (isNaN(valueAsNumber)) {
        return;
      }

      dispatch(actions.setIndex(valueAsNumber));
    },
    [dispatch]
  );

  const { index, sequenceNumber, isAutoIncrementationTurnedOn } = state;

  return (
    <div className="fibonacciExample">
      <h1 className="fibonacciExample__header">
        Fibonacci({index}) = {sequenceNumber}
      </h1>
      <div className="fibonacciExample__buttonPanel">
        <button
          className="fibonacciExample__button"
          name="decrease"
          onClick={handleButtonClick}
        >
          Decrease
        </button>
        <button
          className="fibonacciExample__button"
          name="reset"
          onClick={handleButtonClick}
        >
          Reset
        </button>
        <button
          className="fibonacciExample__button"
          name="increase"
          onClick={handleButtonClick}
        >
          Increase
        </button>
      </div>
      <label className="fibonacciExample__automationCheckbox">
        Auto incrementation
        <input
          className="fibonacciExample__automationCheckbox__input"
          type="checkbox"
          checked={isAutoIncrementationTurnedOn}
          onChange={handleCheckboxChange}
        />
      </label>
      <label className="fibonacciExample__indexInput">
        Count a number of the Fibonacci sequence of the given index:
        <input
          className="fibonacciExample__indexInput__input"
          type="number"
          min={0}
          value={index === 0 ? '' : index}
          onChange={handleCustomIndexChange}
        />
      </label>
    </div>
  );
};

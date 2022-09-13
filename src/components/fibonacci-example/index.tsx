import React from 'react';
import './styles.scss';

type ValuesRefType = {
  [n: number]: number;
};

export const FibonacciExample: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const valuesRef = React.useRef<ValuesRefType>({});

  const countFibonacci = React.useCallback((n: number) => {
    if (n < 1) {
      return 0;
    }

    if (n < 3) {
      return 1;
    }

    const values: ValuesRefType = {};

    if (n - 1 in valuesRef.current) {
      values[n - 1] = valuesRef.current[n - 1];
    } else {
      values[n - 1] = countFibonacci(n - 1);
    }

    if (n - 2 in valuesRef.current) {
      values[n - 2] = valuesRef.current[n - 2];
    } else {
      values[n - 2] = countFibonacci(n - 2);
    }

    valuesRef.current = values;

    return values[n - 2] + values[n - 1];
  }, []);

  const handleButtonClick = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >((event) => {
    const { name } = event.currentTarget;

    switch (name) {
      case 'decrease':
        setIndex((prevN) => prevN - 1);
        break;
      case 'increase':
        setIndex((prevN) => prevN + 1);
        break;
      case 'reset':
      default:
        setIndex(0);
        break;
    }
  }, []);

  const handleCheckboxChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(() => setIsCheckboxChecked((prevValue) => !prevValue), []);

  console.log(index, valuesRef.current);

  React.useEffect(() => {
    if (!isCheckboxChecked) {
      return;
    }

    let timeoutId: number;
    const setIncrementationTimeout = () =>
      window.setTimeout(() => {
        setIndex((prevIndex) => 1 + prevIndex);
        timeoutId = setIncrementationTimeout();
      }, 1000);

    timeoutId = setIncrementationTimeout();

    return () => window.clearTimeout(timeoutId);
  }, [isCheckboxChecked]);

  return (
    <div className="fibonacciExample">
      <h1 className="fibonacciExample__header">
        Fibonacci({index}) = {countFibonacci(index)}
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
          checked={isCheckboxChecked}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
};

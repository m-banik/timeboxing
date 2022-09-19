import React from 'react';
import './styles.scss';

const INITIAL_STATE = {
  index: 0,
  isCheckboxChecked: false,
};

type StateType = typeof INITIAL_STATE;

const actionTypes = {
  INCREMENT_INDEX: 'INCREMENT_INDEX',
  DECREMENT_INDEX: 'DECREMENT_INDEX',
  SET_INDEX: 'SET_INDEX',
  TOGGLE_IS_CHECKBOX_CHECKED: 'TOGGLE_IS_CHECKBOX_CHECKED',
} as const;

const actions = {
  incrementIndex: () => ({ type: actionTypes.INCREMENT_INDEX }),
  decrementIndex: () => ({ type: actionTypes.DECREMENT_INDEX }),
  setIndex: (index: number) => ({ type: actionTypes.SET_INDEX, index }),
  toggleIsCheckboxChecked: (isCheckboxChecked?: boolean) => ({
    type: actionTypes.TOGGLE_IS_CHECKBOX_CHECKED,
    isCheckboxChecked,
  }),
};

type ActionType = ReturnType<typeof actions[keyof typeof actions]>;

const reducer: React.Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_INDEX':
      let incrementedIndex = state.index + 1;

      incrementedIndex =
        incrementedIndex < INITIAL_STATE.index
          ? INITIAL_STATE.index
          : incrementedIndex;

      return {
        ...state,
        index: incrementedIndex,
      };
    case 'DECREMENT_INDEX':
      let decrementedIndex = state.index - 1;

      decrementedIndex =
        decrementedIndex < INITIAL_STATE.index
          ? INITIAL_STATE.index
          : decrementedIndex;

      return {
        ...state,
        index: decrementedIndex,
      };
    case 'SET_INDEX':
      const newIndex =
        action.index > INITIAL_STATE.index ? action.index : INITIAL_STATE.index;

      return {
        ...state,
        index: newIndex,
      };
    case 'TOGGLE_IS_CHECKBOX_CHECKED':
      const newState = { ...state };
      if (typeof action.isCheckboxChecked === 'boolean') {
        newState.isCheckboxChecked = action.isCheckboxChecked;
      } else {
        newState.isCheckboxChecked = !state.isCheckboxChecked;
      }

      return newState;
    default:
      return state;
  }
};

type ValuesRefType = {
  [n: number]: number;
};

export const FibonacciExample: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const valuesRef = React.useRef<ValuesRefType>({});

  const countFibonacci = React.useCallback((n: number) => {
    if (n < 1) {
      return 0;
    }

    if (n < 3) {
      return 1;
    }

    if (1476 < n) {
      return Infinity;
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
        dispatch(actions.decrementIndex());
        break;
      case 'increase':
        dispatch(actions.incrementIndex());
        break;
      case 'reset':
      default:
        dispatch(actions.setIndex(0));
        break;
    }
  }, []);

  const handleCheckboxChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(() => dispatch(actions.toggleIsCheckboxChecked()), []);

  const handleCustomIndexChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const { value } = event.currentTarget;
    const valueAsNumber = Number(value);

    if (isNaN(valueAsNumber)) {
      return;
    }

    dispatch(actions.setIndex(valueAsNumber));
  }, []);

  React.useEffect(() => {
    if (!state.isCheckboxChecked) {
      return;
    }

    let timeoutId: number;
    const setIncrementationTimeout = () =>
      window.setTimeout(() => {
        dispatch(actions.incrementIndex());
        timeoutId = setIncrementationTimeout();
      }, 1000);

    timeoutId = setIncrementationTimeout();

    return () => window.clearTimeout(timeoutId);
  }, [state.isCheckboxChecked]);

  const { index, isCheckboxChecked } = state;

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

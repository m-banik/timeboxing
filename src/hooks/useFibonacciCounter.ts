import { Dispatch, useRef, useCallback, useReducer, useEffect } from 'react';

const INITIAL_STATE = {
  index: 0,
  sequenceNumber: 0,
  isAutoIncrementationTurnedOn: false,
};

type StateType = typeof INITIAL_STATE;

const createState = (prevState: StateType): StateType => ({
  index: prevState.index,
  sequenceNumber: prevState.sequenceNumber,
  isAutoIncrementationTurnedOn: prevState.isAutoIncrementationTurnedOn,
});

const actionTypes = {
  INCREMENT_INDEX: 'INCREMENT_INDEX',
  DECREMENT_INDEX: 'DECREMENT_INDEX',
  SET_INDEX: 'SET_INDEX',
  TOGGLE_IS_AUTO_INCREMENTATION_TURNED_ON: 'TOGGLE_IS_CHECKBOX_CHECKED',
  RESET: 'RESET',
} as const;

export const actions = {
  incrementIndex: () => ({ type: actionTypes.INCREMENT_INDEX }),
  decrementIndex: () => ({ type: actionTypes.DECREMENT_INDEX }),
  setIndex: (index: number) => ({ type: actionTypes.SET_INDEX, index }),
  toggleIsAutoIncrementationTurnedOn: (
    isAutoIncrementationTurnedOn?: boolean
  ) => ({
    type: actionTypes.TOGGLE_IS_AUTO_INCREMENTATION_TURNED_ON,
    isAutoIncrementationTurnedOn,
  }),
  reset: () => ({
    type: actionTypes.RESET,
  }),
};

type ActionType = ReturnType<typeof actions[keyof typeof actions]>;

type ValuesRefType = {
  [n: number]: number;
};

type UseFibonacciCounterType = (
  autoIncrementationIntervalInSeconds?: number
) => {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};

export const useFibonacciCounter: UseFibonacciCounterType = (
  autoIncrementationIntervalInSeconds = 1
) => {
  const valuesRef = useRef<ValuesRefType>({});

  const countFibonacci = useCallback((n: number) => {
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

  const reducer = useCallback<React.Reducer<StateType, ActionType>>(
    (state, action) => {
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
            sequenceNumber: countFibonacci(incrementedIndex),
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
            sequenceNumber: countFibonacci(decrementedIndex),
          };
        case 'SET_INDEX':
          const newIndex =
            action.index > INITIAL_STATE.index
              ? action.index
              : INITIAL_STATE.index;

          return {
            ...state,
            index: newIndex,
            sequenceNumber: countFibonacci(newIndex),
          };
        case 'TOGGLE_IS_CHECKBOX_CHECKED':
          const newState = { ...state };
          if (typeof action.isAutoIncrementationTurnedOn === 'boolean') {
            newState.isAutoIncrementationTurnedOn =
              action.isAutoIncrementationTurnedOn;
          } else {
            newState.isAutoIncrementationTurnedOn =
              !state.isAutoIncrementationTurnedOn;
          }

          return newState;
        case 'RESET':
          return createState(INITIAL_STATE);
        default:
          return state;
      }
    },
    [countFibonacci]
  );

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, createState);

  useEffect(() => {
    if (!state.isAutoIncrementationTurnedOn) {
      return;
    }

    let timeoutId: number;
    const setIncrementationTimeout = () =>
      window.setTimeout(() => {
        dispatch(actions.incrementIndex());

        timeoutId = setIncrementationTimeout();
      }, autoIncrementationIntervalInSeconds * 1000);

    timeoutId = setIncrementationTimeout();

    return () => window.clearTimeout(timeoutId);
  }, [autoIncrementationIntervalInSeconds, state.isAutoIncrementationTurnedOn]);

  return { state, dispatch };
};

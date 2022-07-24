import React from 'react';
import { createRoot } from 'react-dom/client';
import { nanoid } from 'nanoid';

function TimeboxEditor(props) {
  const {
    title,
    totalTimeInMinutes,
    isEditable,
    onTitleChange,
    onTotalTimeInMinutesChange,
    onConfirm,
  } = props;

  return (
    <div className={`TimeboxEditor ${!isEditable ? 'inactive' : ''}`}>
      <label>
        Co robisz?
        <input
          disabled={!isEditable}
          value={title}
          type="text"
          onChange={onTitleChange}
        />
      </label>
      <br />
      <label>
        Ile minut?
        <input
          disabled={!isEditable}
          value={totalTimeInMinutes}
          type="number"
          onChange={onTotalTimeInMinutesChange}
        />
      </label>
      <br />
      <button disabled={!isEditable} onClick={onConfirm}>
        Zatwierdź
      </button>
    </div>
  );
}

class TimeboxCreator extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.totalTimeInMinutesRef = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const title = this.titleRef.current.value;
    const totalTimeInMinutes = this.totalTimeInMinutesRef.current.value;

    this.props.onCreate({
      id: nanoid(),
      title,
      totalTimeInMinutes,
    });
  };

  render() {
    return (
      <form className={`TimeboxCreator`} onSubmit={this.handleSubmit}>
        <label>
          Co robisz?
          <input ref={this.titleRef} type="text" />
        </label>
        <br />
        <label>
          Ile minut?
          <input ref={this.totalTimeInMinutesRef} type="number" />
        </label>
        <br />
        <button>Dodaj timebox</button>
      </form>
    );
  }
}

class TimeboxList extends React.Component {
  state = {
    timeboxes: [
      {
        id: nanoid(),
        title: 'Uczę się skrótów klawiszowych',
        totalTimeInMinutes: 25,
      },
      {
        id: nanoid(),
        title: 'Uczę się skrótów klawiszowych',
        totalTimeInMinutes: 10,
      },
      {
        id: nanoid(),
        title: 'Uczę się skrótów klawiszowych',
        totalTimeInMinutes: 5,
      },
    ],
  };

  addTimebox = (addedTimebox) => {
    this.setState((prevState) => {
      const timeboxes = [...prevState.timeboxes, addedTimebox];
      return { timeboxes };
    });
  };

  removeTimebox = (idToRemove) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.filter(
        (timebox) => timebox.id !== idToRemove
      );
      return { timeboxes };
    });
  };

  updateTimebox = (idToUpdate, updatedTimebox) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox) =>
        timebox.id === idToUpdate ? { ...timebox, ...updatedTimebox } : timebox
      );
      return { timeboxes };
    });
  };

  handleCreate = (createdTimebox) => {
    this.addTimebox(createdTimebox);
  };

  render() {
    const { timeboxes } = this.state;

    return (
      <>
        <TimeboxCreator onCreate={this.handleCreate} />
        {timeboxes.map((timebox) => (
          <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => this.removeTimebox(timebox.id)}
            onEdit={(editedTimebox) =>
              this.updateTimebox(timebox.id, editedTimebox)
            }
          />
        ))}
      </>
    );
  }
}

const normalizePositiveNumberByLimit = (value, limit = 60) => {
  if (value < 0) {
    return 0;
  }

  if (value >= limit) {
    return limit - 1;
  }

  return value;
};

function Clock({
  className = '',
  hours = 0,
  minutes = 0,
  seconds = 0,
  miliseconds = 0,
}) {
  const [normHours, normMin, normSec, normMilSec] = [
    normalizePositiveNumberByLimit(hours),
    normalizePositiveNumberByLimit(minutes),
    normalizePositiveNumberByLimit(seconds),
    normalizePositiveNumberByLimit(miliseconds, 1000),
  ];
  const parsedHours = normHours < 10 ? '0' + normHours : normHours;
  const parsedMinutes = normMin < 10 ? '0' + normMin : normMin;
  const parsedSeconds = normSec < 10 ? '0' + normSec : normSec;

  let parsedMiliseconds;
  if (normMilSec < 100) {
    parsedMiliseconds = '0' + normMilSec;
  }

  if (normMilSec < 10) {
    parsedMiliseconds = '00' + normMilSec;
  }

  if (normMilSec >= 100) {
    parsedMiliseconds = normMilSec;
  }

  return (
    <h1 key={10} className={`Clock ${className}`}>
      {parsedHours}:{parsedMinutes}:{parsedSeconds}:{parsedMiliseconds}
    </h1>
  );
}

function ProgressBar({ className = '', percent, trackRemaining = false }) {
  return (
    <div
      key={11}
      className={`ProgressBar ${
        trackRemaining ? 'remaining' : ''
      } ${className}`}
      style={{ ['--progress']: `${percent}%` }}
    ></div>
  );
}

class CurrentTimebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  startTimer = () => {
    if (this.intervalId) {
      this.stopTimer();
    }

    this.intervalId = window.setInterval(
      () =>
        this.setState((prevState) => ({
          elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
        })),
      1000
    );
  };

  stopTimer = () => window.clearInterval(this.intervalId);

  handleEdit(event) {
    this.props.onEdit();
    this.stopTimer();
  }

  handleStart(event) {
    this.setState({ isRunning: true });
    this.startTimer();
  }

  handleStop(event) {
    this.setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    });
    this.stopTimer();
  }

  handlePause(event) {
    this.setState(function (prevState) {
      const isPaused = !prevState.isPaused;
      const pausesCount = prevState.pausesCount;

      if (isPaused) {
        this.stopTimer();
      } else {
        this.startTimer();
      }

      return {
        isPaused,
        pausesCount: isPaused ? pausesCount + 1 : pausesCount,
      };
    });
  }

  render() {
    const { isRunning, isPaused, pausesCount, elapsedTimeInSeconds } =
      this.state;
    const { title, totalTimeInMinutes, isEditable } = this.props;
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = Math.floor(timeLeftInSeconds % 60);
    const progressInPercent =
      (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
    return (
      <div className={`CurrentTimebox ${!isEditable ? 'inactive' : ''}`}>
        <h1>{title}</h1>
        <Clock
          className={isPaused ? 'inactive' : ''}
          minutes={minutesLeft}
          seconds={secondsLeft}
        />
        <ProgressBar
          className={isPaused ? 'inactive' : ''}
          percent={progressInPercent}
        />
        <button disabled={!isEditable} onClick={this.handleEdit}>
          Edytuj
        </button>
        <button disabled={!isEditable || isRunning} onClick={this.handleStart}>
          Start
        </button>
        <button disabled={!isRunning} onClick={this.handleStop}>
          Stop
        </button>
        <button disabled={!isRunning} onClick={this.handlePause}>
          {isPaused ? 'Wznów' : 'Pauzuj'}
        </button>
        Liczba przerw: {pausesCount}
      </div>
    );
  }
}

class EditableTimebox extends React.Component {
  state = {
    title: 'Uczę się skrótów klawiszowych',
    totalTimeInMinutes: 25,
    isConfirmed: false,
  };

  handleTitleChange = (event) => this.setState({ title: event.target.value });

  handleTotalTimeInMinutesChange = (event) =>
    this.setState({ totalTimeInMinutes: event.target.value });

  handleConfirmation = () =>
    this.setState((prevState) => ({ isConfirmed: !prevState.isConfirmed }));

  render() {
    const { title, totalTimeInMinutes, isConfirmed } = this.state;

    return (
      <>
        <TimeboxEditor
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={!isConfirmed}
          onTitleChange={this.handleTitleChange}
          onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
          onConfirm={this.handleConfirmation}
        />
        <CurrentTimebox
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isConfirmed}
          onEdit={this.handleConfirmation}
        />
      </>
    );
  }
}

class Timebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      totalTimeInMinutes: props.totalTimeInMinutes,
    };
  }

  handleTitleChange = (event) => {
    const title = event.target.value;
    this.setState({
      title,
    });
  };

  handleTotalTimeInMinutesChange = (event) => {
    const totalTimeInMinutes = Number(event.target.value);
    this.setState({
      totalTimeInMinutes,
    });
  };

  handleEdit = () => {
    const editedTimebox = { ...this.state };
    this.props.onEdit(editedTimebox);
  };

  render() {
    const { title, totalTimeInMinutes } = this.state;
    const { onDelete } = this.props;

    const isEditable =
      title !== this.props.title ||
      totalTimeInMinutes !== this.props.totalTimeInMinutes;

    return (
      <div className={'Timebox'}>
        <h3>
          <input value={title} type="text" onChange={this.handleTitleChange} />{' '}
          -
          <input
            value={totalTimeInMinutes}
            type="number"
            onChange={this.handleTotalTimeInMinutesChange}
          />
          min.
        </h3>
        <button onClick={onDelete}>Usuń</button>
        <button disabled={!isEditable} onClick={this.handleEdit}>
          Zmień
        </button>
        <input />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <TimeboxList />
      <EditableTimebox />
    </div>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

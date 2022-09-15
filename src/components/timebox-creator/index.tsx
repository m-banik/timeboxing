import React from 'react';
import { TimeboxDataHandlerType } from '../../common/types';
import './styles.scss';

type TimeboxCreatorPropsType = {
  onCreate: TimeboxDataHandlerType;
};

export const TimeboxCreator: React.FC<TimeboxCreatorPropsType> = ({
  onCreate,
}) => {
  const titleRef = React.createRef<HTMLInputElement>();
  const totalTimeInMinutesRef = React.createRef<HTMLInputElement>();

  const resetInputs = React.useCallback(() => {
    if (titleRef.current && totalTimeInMinutesRef.current) {
      titleRef.current.value = '';
      totalTimeInMinutesRef.current.value = '';
    }
  }, [titleRef, totalTimeInMinutesRef]);

  const handleSubmit = React.useCallback<React.EventHandler<React.FormEvent>>(
    (event) => {
      event.preventDefault();

      const title = titleRef.current?.value || '';
      const totalTimeInMinutes = Number(totalTimeInMinutesRef.current?.value);

      if (
        title.length > 0 &&
        !isNaN(totalTimeInMinutes) &&
        totalTimeInMinutes > 0
      ) {
        onCreate({
          title,
          totalTimeInMinutes,
        });

        resetInputs();
      }
    },
    [titleRef, totalTimeInMinutesRef, resetInputs, onCreate]
  );

  return (
    <form className={`TimeboxCreator`} onSubmit={handleSubmit}>
      <label>
        Co robisz?
        <input ref={titleRef} type="text" />
      </label>
      <br />
      <label>
        Ile minut?
        <input ref={totalTimeInMinutesRef} type="number" />
      </label>
      <br />
      <button>Dodaj timebox</button>
    </form>
  );
};

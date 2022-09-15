import React from 'react';
import './styles.scss';

interface ButtonInterface {
  backgroundColor?: 'red' | 'lime' | 'yellow';
  children: NonNullable<React.ReactNode>;
  onClick: VoidFunction;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonInterface>(
  ({ backgroundColor, children, onClick }, ref) => {
    const styles: React.CSSProperties = {
      backgroundColor: backgroundColor || 'red',
    };
    return (
      <button ref={ref} style={styles} onClick={onClick}>
        {children}
      </button>
    );
  }
);

const RedButton = React.forwardRef<HTMLButtonElement, ButtonInterface>(
  ({ children, onClick }, ref) => {
    return (
      <Button ref={ref} backgroundColor={'red'} onClick={onClick}>
        {children}
      </Button>
    );
  }
);

const LimeButton = React.forwardRef<HTMLButtonElement, ButtonInterface>(
  ({ children, onClick }, ref) => {
    return (
      <Button ref={ref} backgroundColor={'lime'} onClick={onClick}>
        {children}
      </Button>
    );
  }
);

const YellowButton = React.forwardRef<HTMLButtonElement, ButtonInterface>(
  ({ children, onClick }, ref) => {
    return (
      <Button ref={ref} backgroundColor={'yellow'} onClick={onClick}>
        {children}
      </Button>
    );
  }
);

export const RefExample: React.FC = () => {
  const redButtonRef = React.useRef<HTMLButtonElement>(null);
  const limeButtonRef = React.useRef<HTMLButtonElement>(null);
  const yellowButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleRedButtonClick = React.useCallback(() => {
    console.log(redButtonRef.current);
    limeButtonRef.current?.focus();
  }, []);

  const handleLimeButtonClick = React.useCallback(() => {
    console.log(limeButtonRef.current);
    yellowButtonRef.current?.focus();
  }, []);

  const handleYellowButtonClick = React.useCallback(() => {
    console.log(yellowButtonRef.current);
    redButtonRef.current?.focus();
  }, []);

  const styles = React.useMemo<React.CSSProperties>(
    () => ({
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '220px',
      height: '100px',
      backgroundColor: 'silver',
    }),
    []
  );

  return (
    <div style={styles} className={'refExample'}>
      <RedButton ref={redButtonRef} onClick={handleRedButtonClick}>
        Red
      </RedButton>
      <LimeButton ref={limeButtonRef} onClick={handleLimeButtonClick}>
        Lime
      </LimeButton>
      <YellowButton ref={yellowButtonRef} onClick={handleYellowButtonClick}>
        Yellow
      </YellowButton>
    </div>
  );
};

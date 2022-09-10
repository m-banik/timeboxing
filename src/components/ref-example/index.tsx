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

export class RefExample extends React.Component {
  redButtonRef = React.createRef<HTMLButtonElement>();
  limeButtonRef = React.createRef<HTMLButtonElement>();
  yellowButtonRef = React.createRef<HTMLButtonElement>();

  handleRedButtonClick = () => {
    console.log(this.redButtonRef);
    this.limeButtonRef.current?.focus();
  };

  handleLimeButtonClick = () => {
    console.log(this.limeButtonRef);
    this.yellowButtonRef.current?.focus();
  };

  handleYellowButtonClick = () => {
    console.log(this.yellowButtonRef);
    this.redButtonRef.current?.focus();
  };

  render() {
    const styles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '220px',
      height: '100px',
      backgroundColor: 'silver',
    };

    return (
      <div style={styles} className={'refExample'}>
        <RedButton ref={this.redButtonRef} onClick={this.handleRedButtonClick}>
          Red
        </RedButton>
        <LimeButton
          ref={this.limeButtonRef}
          onClick={this.handleLimeButtonClick}
        >
          Lime
        </LimeButton>
        <YellowButton
          ref={this.yellowButtonRef}
          onClick={this.handleYellowButtonClick}
        >
          Yellow
        </YellowButton>
      </div>
    );
  }
}

import React from 'react';
import { createPortal } from 'react-dom';

interface PortalInterface {
  destination: 'before' | 'after';
  children: NonNullable<React.ReactNode>;
}

export class Portal extends React.Component<PortalInterface> {
  constructor(props: PortalInterface) {
    super(props);

    this.container = document.createElement('div');
  }

  container: HTMLDivElement;

  componentDidMount() {
    if (this.props.destination === 'after') {
      document.body.appendChild(this.container);
      return;
    }

    const appRootElement = document.getElementById('root');

    if (appRootElement) {
      document.body.insertBefore(this.container, appRootElement);
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return createPortal(this.props.children, this.container);
  }
}

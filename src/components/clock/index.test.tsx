import React from 'react';
import ReactDom from 'react-dom';
import { Clock } from '.';

let root: HTMLDivElement | null = null;

describe('Clock component', () => {
  describe('renders properly with default props', () => {
    beforeEach(() => {
      root = document.createElement('div');
      ReactDom.render(<Clock />, root);
    });

    it('as the H1 instance', () => {
      expect(root?.childNodes[0]?.nodeName).toEqual('H1');
    });

    it('and has default className', () => {
      expect(root?.children[0]?.className).toMatch(/clock/);
    });

    it('and has all correct numeric props', () => {
      expect(root?.childNodes[0].textContent).toMatch(/00:00:00:000/);
    });
  });

  describe('renders properly', () => {
    beforeEach(() => {
      root = document.createElement('div');
      ReactDom.render(
        <Clock
          className="xyz"
          hours={12}
          minutes={30}
          seconds={45}
          miliseconds={500}
        />,
        root
      );
    });

    it('as the H1 instance when the props are provided', () => {
      expect(root?.childNodes[0]?.nodeName).toEqual('H1');
    });

    it('with correct className prop', () => {
      expect(root?.children[0]?.className).toMatch(/clock xyz/);
    });

    it('with correct numeric props', () => {
      expect(root?.children[0]?.textContent).toMatch(/12:30:45:500/);
    });
  });
});

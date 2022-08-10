import React from 'react';
import ReactDom from 'react-dom';
import { ProgressBar } from '.';

let root: HTMLDivElement | null = null;

describe('ProgressBar component', () => {
  describe('renders properly with default props', () => {
    beforeEach(() => {
      root = document.createElement('div');
      ReactDom.render(<ProgressBar percent={25} />, root);
    });

    it('as the DIV instance', () => {
      expect(root?.childNodes[0]?.nodeName).toEqual('DIV');
    });

    it('and has the correct className', () => {
      expect(root?.children[0]?.className).toMatch(/ProgressBar/);
    });

    it('and has the correct inline styles', () => {
      expect(root?.children[0].getAttribute('style')).toMatch(
        '--progress: 25%;'
      );
    });
  });

  describe('renders properly with the provided props', () => {
    beforeEach(() => {
      root = document.createElement('div');
      ReactDom.render(
        <ProgressBar percent={100} className={'xyz'} trackRemaining={true} />,
        root
      );
    });

    it('as the DIV instance', () => {
      expect(root?.childNodes[0]?.nodeName).toEqual('DIV');
    });

    it('and has the correct className', () => {
      expect(root?.children[0]?.className).toMatch(
        /ProgressBar tracking completed xyz/
      );
    });

    it('and has the correct inline styles', () => {
      expect(root?.children[0].getAttribute('style')).toMatch(
        '--progress: 100%;'
      );
    });
  });

  describe('renders properly in edge case', () => {
    it('when percent prop lower than 0 is provided', () => {
      root = document.createElement('div');
      ReactDom.render(<ProgressBar percent={-0.5} />, root);
      expect(root?.children[0].getAttribute('style')).toMatch(
        '--progress: 0%;'
      );
    });

    it('when percent prop higher than 100 is provided', () => {
      root = document.createElement('div');
      ReactDom.render(<ProgressBar percent={120} />, root);
      expect(root?.children[0].getAttribute('style')).toMatch(
        '--progress: 100%;'
      );
    });
  });
});

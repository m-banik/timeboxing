import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { EditableTimebox } from '.';

describe('Editable component', () => {
  afterEach(cleanup);

  it('renders "Zatwierdź" button on initial render', () => {
    const { getByText } = render(<EditableTimebox />);
    expect(() => {
      getByText('Zatwierdź');
    }).not.toThrow();
  });

  it('renders "Edytuj" button after click on "Zatwierdź" button', () => {
    const { getByText } = render(<EditableTimebox />);
    fireEvent.click(getByText('Zatwierdź'));
    expect(() => {
      getByText('Edytuj');
    }).not.toThrow();
  });

  it('implements feature of the task title editing correctly', () => {
    const { getByText, getByLabelText } = render(<EditableTimebox />);
    fireEvent.change(getByLabelText('Co robisz?'), {
      target: { value: 'Test' },
    });
    fireEvent.click(getByText('Zatwierdź'));
    expect(() => {
      getByText('Test');
    }).not.toThrow();
  });

  it('implements feature of the task duration editing correctly', () => {
    const { getByText, getByLabelText } = render(<EditableTimebox />);
    fireEvent.change(getByLabelText('Ile minut?'), {
      target: { value: 1 },
    });
    fireEvent.click(getByText('Zatwierdź'));
    expect(() => {
      getByText('01').classList.contains('clock__hours');
    }).not.toThrow();
  });
});

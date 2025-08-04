import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ExpenseForm from '../components/ExpenseForm';

describe('ExpenseForm', () => {
  beforeEach(() => {
    if (global.fetch) global.fetch.mockClear && global.fetch.mockClear();
  });

  it('State_renders form fields', () => {
    render(<ExpenseForm />);
    expect(screen.getByLabelText(/Employee ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('ErrorHandling_shows error on invalid input', async () => {
    render(<ExpenseForm />);
    fireEvent.change(screen.getByLabelText(/Employee ID/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: -1 } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Bad' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  it('Form_shows success on correct submission and resets form', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
    const onAdd = jest.fn();
    render(<ExpenseForm onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText(/Employee ID/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '20.5' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Buying paper' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2021-05-10' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await screen.findByTestId('success-message');
    expect(onAdd).toHaveBeenCalled();
    expect(screen.getByLabelText(/Employee ID/i).value).toBe('');
  });
});

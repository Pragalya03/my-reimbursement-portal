import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ExpenseList from '../components/ExpenseList';

global.fetch = jest.fn();
const sampleExpenses = [
  {
    id: 1, employeeId: 101, amount: 150.75, description: 'Office supplies',
    date: '2023-10-15', status: 'PENDING', remarks: null
  },
  {
    id: 2, employeeId: 102, amount: 75.5, description: 'Transportation',
    date: '2023-10-10', status: 'APPROVED', remarks: 'Approved as per policy'
  }
];

describe('ExpenseList', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('State_renders list and filters', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => sampleExpenses });
    render(<ExpenseList />);
    await screen.findByText('Office supplies');
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByTestId('expenses-table')).toBeInTheDocument();
  });

  it('State_filters by status', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => sampleExpenses });
    render(<ExpenseList />);
    await screen.findByText('Office supplies');
    fireEvent.change(screen.getByTestId('status-filter'), { target: { value: 'APPROVED' } });
    expect(screen.getByText('Transportation')).toBeInTheDocument();
  });

  it('State_shows empty state when no expenses', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
    render(<ExpenseList />);
    await screen.findByText(/No expenses found/i);
  });
});

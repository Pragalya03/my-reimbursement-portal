import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExpenseStatusUpdate from '../components/ExpenseStatusUpdate';

global.fetch = jest.fn();

describe('ExpenseStatusUpdate', () => {
  beforeEach(() => { fetch.mockClear(); });

  const pendingExpense = { id: 1, status: 'PENDING' };
  const approvedExpense = { id: 2, status: 'APPROVED' };
  const refreshMock = jest.fn();

  it('State_renders buttons only for pending', () => {
    render(<ExpenseStatusUpdate expense={pendingExpense} />);
    expect(screen.getByTestId('approve-btn-1')).toBeInTheDocument();
    expect(screen.getByTestId('reject-btn-1')).toBeInTheDocument();
    render(<ExpenseStatusUpdate expense={approvedExpense} />);
    expect(screen.queryByTestId('approve-btn-2')).not.toBeInTheDocument();
  });

  it('Axios_approve calls API and refresh', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    render(<ExpenseStatusUpdate expense={pendingExpense} onStatusUpdate={refreshMock} />);
    fireEvent.click(screen.getByTestId('approve-btn-1'));
    await waitFor(() => expect(refreshMock).toHaveBeenCalled());
  });

  it('Axios_reject opens modal, requires remarks, and calls API', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({}) });
    render(<ExpenseStatusUpdate expense={pendingExpense} onStatusUpdate={refreshMock} />);
    fireEvent.click(screen.getByTestId('reject-btn-1'));
    expect(screen.getByTestId('reject-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('confirm-reject'));
    await screen.findByTestId('modal-error');

    fireEvent.change(screen.getByTestId('remarks-input'), { target: { value: 'Too expensive' } });
    fireEvent.click(screen.getByTestId('confirm-reject'));
    await waitFor(() => expect(refreshMock).toHaveBeenCalled());
  });
});

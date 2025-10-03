import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import ContactForm from '../ContactForm';
import theme from '../../styles/Theme';

const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('ContactForm', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('shows success message on submit and clears it after timeout', () => {
    renderWithTheme(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Ad Soyad/i), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByLabelText(/E-posta/i), {
      target: { value: 'test@example.com' }
    });

    const subjectField = screen.getByRole('combobox', { name: /Konu/i });
    fireEvent.mouseDown(subjectField);
    const listbox = screen.getByRole('listbox');
    fireEvent.click(within(listbox).getByText('Genel Bilgi'));
    expect(subjectField).toHaveTextContent('Genel Bilgi');

    fireEvent.change(screen.getByLabelText(/Mesajınız/i), {
      target: { value: 'Merhaba' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Mesaj Gönder/i }));

    const successMessage = screen.getByText(
      /Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız./i
    );
    expect(successMessage).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(
      screen.queryByText(
        /Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız./i
      )
    ).not.toBeInTheDocument();

    expect(screen.getByLabelText(/Ad Soyad/i)).toHaveValue('');
    expect(screen.getByLabelText(/E-posta/i)).toHaveValue('');
    expect(subjectField).not.toHaveTextContent('Genel Bilgi');
    expect(screen.getByLabelText(/Mesajınız/i)).toHaveValue('');
  });
});
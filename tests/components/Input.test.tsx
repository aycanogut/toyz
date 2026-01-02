import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Input from '@/components/Input';

vi.mock('@/components/Icon', () => ({
  default: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

describe('Input', () => {
  it('should render correctly', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render label when aria-label is provided', () => {
    render(<Input aria-label="Email" />);

    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('should render placeholder', () => {
    render(<Input placeholder="Enter your name" />);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('should show error message when error prop is provided', () => {
    render(<Input error="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should not show error message when error is not provided', () => {
    render(<Input />);

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should accept user input', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('should apply custom className', () => {
    render(<Input className="custom-class" />);

    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('should render prepend icon when provided', () => {
    render(<Input prependIconProps={{ name: 'search' }} />);

    expect(screen.getByTestId('icon-search')).toBeInTheDocument();
  });

  it('should render append icon when provided', () => {
    render(<Input appendIconProps={{ name: 'close' }} />);

    expect(screen.getByTestId('icon-close')).toBeInTheDocument();
  });

  it('should prevent space as first character', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');
    await user.type(input, ' ');

    expect(input).toHaveValue('');
  });

  it('should allow space after text', async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
  });

  it('should call onKeyDown when key is pressed', async () => {
    const handleKeyDown = vi.fn();
    const user = userEvent.setup();
    render(<Input onKeyDown={handleKeyDown} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'a');

    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('should have correct type attribute', () => {
    render(<Input type="email" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('should have autocomplete off by default', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });
});

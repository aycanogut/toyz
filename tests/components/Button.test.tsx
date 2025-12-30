import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from '@/components/Button';

vi.mock('@/components/Icon', () => ({
  default: ({ name, className }: { name: string; className?: string }) => (
    <span
      data-testid={`icon-${name}`}
      className={className}
    >
      {name}
    </span>
  ),
}));

describe('Button', () => {
  it('should render children correctly', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn(); // Mock function
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button
        disabled
        onClick={handleClick}
      >
        Disabled
      </Button>
    );

    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should show loading icon when loading is true', () => {
    render(<Button loading>Submit</Button>);

    expect(screen.getByTestId('icon-loading')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('should show children when loading is false', () => {
    render(<Button loading={false}>Submit</Button>);

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should render append icon when provided', () => {
    render(<Button appendIconProps={{ name: 'arrow-right' }}>Next</Button>);

    expect(screen.getByTestId('icon-arrow-right')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Button</Button>);

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('should have correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});

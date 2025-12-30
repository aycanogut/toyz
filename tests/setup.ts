import '@testing-library/jest-dom/vitest';

export { render, screen, waitFor } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

import { ReactElement } from 'react';

import { render as rtlRender } from '@testing-library/react';

export function renderWithProviders(ui: ReactElement) {
  return rtlRender(ui);
}

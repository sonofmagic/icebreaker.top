import React from 'react';
import { render } from '@testing-library/react';
import { BasicMyWelcome } from './my-welcome.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicMyWelcome />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});

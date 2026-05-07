import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Anchor from './Anchor';

describe('Anchor Component', () => {
  test('renders with default text', () => {
    render(<Anchor />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('Pablo Andrey Chacon Luna');
  });

  test('renders with custom text', () => {
    render(<Anchor>Custom Text</Anchor>);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('Custom Text');
  });

  test('has correct href attribute', () => {
    render(<Anchor />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', 'https://andreychaconresumereact.netlify.app/');
  });

  test('opens in new tab', () => {
    render(<Anchor />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

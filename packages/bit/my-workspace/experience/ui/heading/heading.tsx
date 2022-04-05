import React, { ReactNode } from 'react';

export type HeadingProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function Heading({ children }: HeadingProps) {
  return (
    <h1>
      {children}
    </h1>
  );
}

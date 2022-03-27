import React, { ReactNode } from 'react';

export type MyWelcomeProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function MyWelcome({ children }: MyWelcomeProps) {
  return (
    <div>
      {children}
    </div>
  );
}

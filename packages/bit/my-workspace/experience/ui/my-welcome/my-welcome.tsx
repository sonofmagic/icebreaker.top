import React, { ReactNode } from 'react';
import { Heading } from '@bitorg/experience.ui.heading';
import InputButton from '@teambit/base-ui.input.button'

export type MyWelcomeProps = {
  /**
   * a node to be rendered in the special component.
   */
  title?: string

  children?: ReactNode;
};

export function MyWelcome({ title }: MyWelcomeProps) {
  return (
    <>
      <Heading>{title}</Heading>
      <InputButton onClick={()=>{
        console.log('clicked')
      }}>点我</InputButton>
    </>
  );
}

MyWelcome.defaultProps = {
  title: 'My Welcome Page',
};
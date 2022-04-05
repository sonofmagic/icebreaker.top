import React from 'react';
import { helloWorld } from './hello-world';

export function ReturnsCorrectValue() {
  return <div>{helloWorld()}</div>;
}

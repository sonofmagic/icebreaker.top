import { helloWorld } from './hello-world';

it('should return the correct value', () => {
  expect(helloWorld()).toBe('Hello world!');
});

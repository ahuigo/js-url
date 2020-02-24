//import { Greeter } from '../index1';
import { Greeter } from '@/index';
test('My Greeter', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
  expect('b=2&a=1'.parseStr()).toEqual({a:'1','b':'2'});
});

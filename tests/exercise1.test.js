const exc = require('../exercise1');

describe('fizzBuzz', () => {
  it('should throw an error if the input is not a number', () => {
    const args = [ 'a', null, undefined, '', false, {}];
    args.forEach(() => {
      expect( i => { exc.fizzBuzz(i)}).toThrow();
    })
  });
  it('should output FizBuzz if devisable by  and 5', () => {
    const result = exc.fizzBuzz(15);
    expect(result).toBe('FizzBuzz')
  });
  it('should ouput "Fizz" if the value is divisible by 3', () => {
    const result = exc.fizzBuzz(9);
    expect(result).toBe('Fizz')
  });
  it('should output "Buzz" if the value is divisible by 5', () => {
    const result = exc.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });
  it('should output input if the input not divisible by 3 and 5', () => {
    const result = exc.fizzBuzz(7);
    expect(result).toBe(7)
  })
})
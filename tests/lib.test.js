const lib = require('../lib');

describe('absolute', () => {
  it('should return posetive number if the input is posetive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1)
  })
  
  it('should return posetive number if the input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  
  it('should return zero "0" if the input is 0 ', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0)
  });})

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Arthur');
    expect(result).toMatch(/Arthur/);
    expect(result).toContain('Arthur');
  });
})

// arrayContaining API method
describe('getCurrencies', () => {
  it('should return supported currences', () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
  });
});

// objectCointaining API method
describe('getProduct', () => {
  it('should return the product with the given ID', () => {
    const result = lib.getProduct(1);
    expect(result).toEqual(expect.objectContaining({ id: expect.any(Number), price: 10}));
    expect(result).toEqual(expect.objectContaining({ id: 1, price: 10}));
    // expect(result).toEqual({id: 1, price: 10});
    expect(result).toMatchObject({id:1, price:10});
    expect(result).toHaveProperty('id')
  });
});

describe('registerUser', () => {
  it('should throw error if the username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach( a => {
      expect(() => { lib.registerUser(a) }).toThrow();
    });

    for(var b in args) {
      expect(() => { lib.registerUser(b).toThrow() });
    };
    
    describe.each(args)('Checking if username entry is valid: (%o)', args => {
      expect(() => lib.registerUser(args).toThrow());
    })
  });

  it('should return a user object if valid username is passed', () => {
    const result = lib.registerUser('art');
    expect(result).toMatchObject({ username: 'art'});
    expect(result.id).toBeGreaterThan(0);
  })
})
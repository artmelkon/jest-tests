const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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
});

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    // creating simple fake MOCK function
    db.getCustomerSync = function(customerId) {
      console.log('Fake reading customer...')
      return { id: customerId, points: 20 };
    }
    const order = { customerId: 1, totalPrice: 10 }
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

// MOCK functions
describe('notifyCustomer', () => {
  it('should send an email notification to the customer', () => {

    /* Jest MOCK function */
    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
    mail.send = jest.fn();

    const customer = { customerId: 1 };
    lib.notifyCustomer(customer);

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    /* Vanilla JavaScript functions version */
    // db.getCustomerSync = function(customerId) {
    //   // 'a' is for test porpouse
    //   return {id: customerId, email: 'a'}; 
    // }

    // let mailSent = false;
    // mail.send = function(email, message) {
    //   mailSent = true;
    // }

    // const customer = {customerId: 1};
    // lib.notifyCustomer(customer);
    // expect(mailSent).toBe(true)
  })
})
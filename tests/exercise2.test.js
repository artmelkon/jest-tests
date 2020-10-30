const exc = require('../exercise2');

describe('base_convert', () => {
  it('should thow an error if the input radix not in range 2 and 36', () => {
    const base_conv = exc.base_convert('e164', 16, 8);
    .0
    expect(base_conv).toBe('160544')

  })
})
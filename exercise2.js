module.exports.base_convert = (number, initial_base, change_base) => {
  /* radix: base number must be between 2 and 36 */
  if((initial_base && change_base) < 2 || (initial_base && change_base) > 36 )
    return 'Base between 2 and 36';

    return parseInt(number + '', initial_base).toString(change_base)
}
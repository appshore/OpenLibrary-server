/**
 * check if OLID is valid
 * min 1 digit, max 10 digits
 * @param {*} data
 */
const isValidOLID = data => /OL([1-9]{1})([0-9]{0,9})?M/.test(data);

/**
 * will determine which type of search is launched
 * The OL engine doesn't seem to mind if the OLID: prefix is set or not
 * @param {*} search
 */
const analyseSearchInput = search => search
  .replace('OLID:', '')
  .split(',')
  .reduce((acc, o) => acc && isValidOLID(o), true);

export { analyseSearchInput, isValidOLID };

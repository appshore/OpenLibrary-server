import got from 'got';

import { analyseSearchInput } from './validation';

/**
 * Search book(s) by OLID
 * @param {*} search
 */
const booksByOLID = async ({ search }) => {
  try {
    const { body } = await got(
      `https://openlibrary.org/api/books/?bibkeys=${search}&jscmd=data&format=json`,
      { json: true }
    );

    if (body && Object.entries(body).length) {
      return Object.entries(body).map(([key, { authors, title }]) => ({
        authors: authors.map(a => a.name),
        OLID: key.replace(/^(OLID:)/, ''),
        title
      }));
    }
    return { error: 'No book' };
  } catch (err) {
    return { error: err };
  }
};

/**
 * Search book(s) by title
 * @param {*} search
 */
const booksByTitle = async ({ search }) => {
  try {
    const {
      body: { docs }
    } = await got(`https://openlibrary.org/search.json?title=${search}`, { json: true });

    if (docs) {
      return docs.map(d => {
        const { author_name: authors, edition_key: key, title } = d;
        return {
          authors,
          OLID: key && key[0],
          title
        };
      });
    }
    return { error: 'No book' };
  } catch (err) {
    // if the search returns nothing, the Open Library server throws a 500 error!
    return { error: err };
  }
};

/**
 * Retrieve books by OLID or title according input search
 * @param {*} search
 */
const getBooks = ({ search }) => analyseSearchInput(search)
  ? booksByOLID({ search })
  : booksByTitle({ search });

export { booksByOLID, booksByTitle, getBooks };

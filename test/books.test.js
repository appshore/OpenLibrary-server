/* eslint-disable no-undef */
import nock from 'nock';
import 'regenerator-runtime/runtime';

import { booksByOLID, booksByTitle, getBooks } from '../src/books';
import jsonOLID from './books.OLID.json';
import jsonTitle from './books.title.json';

// increase timeout for async ops
jest.setTimeout(20000);

describe('Books', () => {
  const searchOLID = 'OLID:OL21444328M';
  const searchTitle = 'Le+pont+de+la+riviere+kwai';

  beforeEach(() => {
    nock('https://openlibrary.org')
      .get(`/api/books/?bibkeys=${searchOLID}&jscmd=data&format=json`)
      .reply(200, jsonOLID);
    nock('https://openlibrary.org')
      .get(`/search.json?title=${searchTitle}`)
      .reply(200, jsonTitle);
  });
  afterEach(() => {
    nock.restore();
  });
  describe('booksByOLID', () => {
    test('valid OLID', async () => {
      const response = await booksByOLID({ search: searchOLID });
      expect(response).toEqual([
        {
          authors: ['Pierre Boulle'],
          OLID: 'OL21444328M',
          title: 'Le pont de la riviere Kwai'
        }
      ]);
      expect(Array.isArray(response)).toEqual(true);
      response.forEach(res => {
        expect(typeof res).toEqual('object');
        expect(Object.keys(res)).toEqual(['authors', 'OLID', 'title']);
        expect(typeof res.authors).toEqual('object');
        expect(typeof res.OLID).toEqual('string');
        expect(typeof res.title).toEqual('string');
      });
    });
  });
  describe('booksByTitle', () => {
    test('valid Title', async () => {
      const response = await booksByTitle({ search: searchTitle });
      expect(response).toEqual([
        {
          authors: ['Pierre Boulle'],
          OLID: 'OL21444328M',
          title: 'Le pont de la riviere Kwai'
        },
        {
          authors: ['Pierre Boulle'],
          OLID: 'OL20214500M',
          title: 'Le pont de la Riviere Kwai'
        }
      ]);
      expect(Array.isArray(response)).toEqual(true);
      response.forEach(res => {
        expect(typeof res).toEqual('object');
        expect(Object.keys(res)).toEqual(['authors', 'OLID', 'title']);
        expect(typeof res.authors).toEqual('object');
        expect(typeof res.OLID).toEqual('string');
        expect(typeof res.title).toEqual('string');
      });
    });
  });
  describe('getBooks', () => {
    test('valid OLID', async () => {
      const response = await getBooks({ search: searchOLID });
      expect(response).toEqual([
        {
          authors: ['Pierre Boulle'],
          OLID: 'OL21444328M',
          title: 'Le pont de la riviere Kwai'
        }
      ]);
    });
    test('valid Title', async () => {
      const response = await getBooks({ search: searchTitle });
      expect(response).toEqual([
        {
          authors: ['Pierre Boulle'],
          OLID: 'OL21444328M',
          title: 'Le pont de la riviere Kwai'
        },
        {
          authors: ['Pierre Boulle'],
          OLID: 'OL20214500M',
          title: 'Le pont de la Riviere Kwai'
        }
      ]);
    });
  });
});

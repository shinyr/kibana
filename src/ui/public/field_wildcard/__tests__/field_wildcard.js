import expect from 'expect.js';

import { makeRegEx, fieldWildcardFilter } from '../field_wildcard';

describe('fieldWildcard', function () {
  describe('makeRegEx', function () {
    it('matches * in any position', function () {
      expect('aaaaaabbbbbbbcccccc').to.match(makeRegEx('*a*b*c*'));
      expect('a1234').to.match(makeRegEx('*1234'));
      expect('1234a').to.match(makeRegEx('1234*'));
      expect('12a34').to.match(makeRegEx('12a34'));
    });

    it('properly escapes regexp control characters', function () {
      expect('account[user_id]').to.match(makeRegEx('account[*]'));
    });

    it('properly limits matches without wildcards', function () {
      expect('username').to.match(makeRegEx('*name'));
      expect('username').to.match(makeRegEx('user*'));
      expect('username').to.match(makeRegEx('username'));
      expect('username').to.not.match(makeRegEx('user'));
      expect('username').to.not.match(makeRegEx('name'));
      expect('username').to.not.match(makeRegEx('erna'));
    });
  });

  describe('filter', function () {
    it('filters nothing when given an empty array', function () {
      const filter = fieldWildcardFilter([]);
      const original = [
        'foo',
        'bar',
        'baz',
        1234
      ];

      expect(original.filter(filter)).to.eql(original);
    });

    it('filters values that match the globs', function () {
      const filter = fieldWildcardFilter([
        'f*',
        '*4'
      ]);

      const original = [
        'foo',
        'bar',
        'baz',
        1234
      ];

      expect(original.filter(filter)).to.eql(['bar', 'baz']);
    });

    it('handles weird values okay', function () {
      const filter = fieldWildcardFilter([
        'f*',
        '*4',
        'undefined'
      ]);

      const original = [
        'foo',
        null,
        'bar',
        undefined,
        {},
        [],
        'baz',
        1234
      ];

      expect(original.filter(filter)).to.eql([null, 'bar', {}, [], 'baz']);
    });
  });
});

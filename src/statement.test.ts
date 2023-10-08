import test from 'ava';
import { statement } from './statement'; // Replace with the correct path to your module

const plays = {
  hamlet: { type: 'tragedy', name: 'Hamlet' },
  'as-like': { type: 'comedy', name: 'As You Like It' },
    othello: { type: 'tragedy', name: 'Othello' },
  unknown: {type: 'unknown', name: 'unknown'}
};

test('calculate statement for a tragedy with no audience adjustment', (t) => {
  const invoice = {
    customer: 'Test Customer',
    performances: [
      { audience: 20, playID: 'hamlet' },
    ],
  };

  const result = statement(invoice, plays);

  t.true(result.includes('Amount owed is $400.00'));
  t.true(result.includes('You earned 0 credits'));
});

test('calculate statement for a tragedy with audience adjustment', (t) => {
  const invoice = {
    customer: 'Test Customer',
    performances: [
      { audience: 40, playID: 'hamlet' },
    ],
  };

  const result = statement(invoice, plays);
  t.true(result.includes('Amount owed is $500.00'));
  t.true(result.includes('You earned 10 credits'));
});

test('calculate statement for a comedy with no audience adjustment', (t) => {
  const invoice = {
    customer: 'Test Customer',
    performances: [
      { audience: 15, playID: 'as-like' },
    ],
  };

  const result = statement(invoice, plays);

  t.true(result.includes('Amount owed is $345.00'));
  t.true(result.includes('You earned 3 credits'));
});

test('calculate statement for a comedy with audience adjustment', (t) => {
  const invoice = {
    customer: 'Test Customer',
    performances: [
      { audience: 30, playID: 'as-like' },
    ],
  };

  const result = statement(invoice, plays);
  console.log(result)
  t.true(result.includes('Amount owed is $540.00'));
  t.true(result.includes('You earned 6 credits'));
});

test('throw an error for an unknown play type', (t) => {
  const invoice = {
    customer: 'Test Customer',
    performances: [
      { audience: 20, playID: 'unknown' },
    ],
  };

  t.throws(() => statement(invoice, plays), { message: 'unknown type: unknown' });
});

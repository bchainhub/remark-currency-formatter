import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkCurrencyFormatter from 'remark-currency-formatter';

const processMarkdown = async (markdown: string, options: any = {}) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkCurrencyFormatter, options)
    .use(remarkStringify)
    .process(markdown);
  return result.toString().trim();
};

const CurrencyFormatTests = suite('Currency Formatting Tests');

const options = {
  locale: 'en-US'
};

CurrencyFormatTests('Formats USD correctly', async () => {
  const input = 'You may donate $(1234.56,usd) to charity.';
  const expected = 'You may donate $1,234.56 to charity.';
  const output = await processMarkdown(input, options);
  assert.is(output, expected);
});

CurrencyFormatTests('Formats BTC correctly', async () => {
  const input = 'Earning $(0.001,btc) is hard after halving.';
  const expected = 'Earning ₿ 0.00100000 is hard after halving.';
  const output = await processMarkdown(input, options);
  assert.is(output, expected);
});

CurrencyFormatTests('Formats XCB correctly', async () => {
  const input = 'Core coin can be noted as $(123.78,XCB).';
  const expected = 'Core coin can be noted as ₡ 123.780.';
  const output = await processMarkdown(input, options);
  assert.is(output, expected);
});

CurrencyFormatTests('Handles undefined currency', async () => {
  const input = 'Amount is $(12345.678)';
  const expected = 'Amount is 12,345.68';
  const output = await processMarkdown(input, options);
  assert.is(output, expected);
});

CurrencyFormatTests.run();

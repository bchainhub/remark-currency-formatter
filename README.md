# Remark Currency Formatter

This Remark plugin, "remark-currency-formatter," transforms numerical currency notations within markdown texts into formatted currency strings, enhancing documents with precise and locale-aware currency formatting. It leverages custom currency configurations and the powerful `exchange-rounding` library for accurate and visually appealing currency representations.

## Installation

Install the plugin using npm or yarn:

```bash
npm install remark-currency-formatter
```

Or:

```bash
yarn add remark-currency-formatter
```

## Usage

To automatically format currency notations in markdown texts:

```typescript
import remark from 'remark';
import remarkCurrencyFormatter from 'remark-currency-formatter';

(async () => {
  try {
    const file = await remark()
      .use(remarkCurrencyFormatter, {
        locale: 'en-US',
        customCurrencyData: {
          USD: {
            symbol: '$',
            narrowSymbol: '$',
            code: 'USD',
            name: 'US Dollar',
            defaultDecimals: 2
          }
        }
      })
      .process('Price is $(19.99,USD) and not equivalent to $(23.99,EUR).');
    console.log(String(file));
  } catch (err) {
    throw err;
  }
})();
```

The plugin recognizes currency notations like $(amount,currencyCode) and formats them based on the given customCurrencyData and locale settings.

## Options

Configure the plugin with the following options to customize its behavior and output:

- `locale`: Specify the locale used for formatting currencies (e.g., 'en-US').
- `customCurrencyData`: Define custom currency symbols, names, and decimal precision. This setting is essential for supporting non-standard or digital currencies like Bitcoin.
- Rest of Intl.NumberFormat options: Pass additional options supported by `Intl.NumberFormat` for currency formatting, such as `style`, `currency`, `currencyDisplay`, `minimumFractionDigits`, `maximumFractionDigits`, and `useGrouping`.

Example of customCurrencyData:

```js
{
  BTC: {
    symbol: '₿',
    narrowSymbol: '₿',
    code: 'BTC',
    name: 'Bitcoin',
    defaultDecimals: 8
  }
}
```

## Features

- Dynamic Currency Formatting: Automatically formats monetary values based on locale and custom settings.
- Support for Custom Currencies: Easily add support for any type of currency, including digital currencies like Bitcoin or Ethereum.
- Locale Awareness: Formats numbers according to the specified locale, ensuring that the currency presentation is regionally appropriate.
- Flexible Configuration: Tailor the behavior with a variety of options, adapting the formatter to meet different needs.

## Contributing

Contributions are welcome! Please submit pull requests or open issues to improve the plugin or add new features.

## License

Licensed under the [CORE License](LICENSE).

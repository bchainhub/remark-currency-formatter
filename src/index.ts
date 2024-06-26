import { Root, RootContent } from 'mdast';
import { visit } from 'unist-util-visit';
import ExchNumberFormat from 'exchange-rounding';

interface CurrencyData {
  symbol: string;
  narrowSymbol: string;
  code: string;
  name: string;
  defaultDecimals: number;
}

interface CurrencyFormatterOptions extends Intl.NumberFormatOptions {
  locale?: string;
  customCurrencyData?: {
    [key: string]: CurrencyData;
  };
}

export default function remarkCurrencyFormatter(options: CurrencyFormatterOptions = {}) {
  const { locale, customCurrencyData = {} } = options;

  return (tree: Root) => {
    visit(tree, 'text', (node: RootContent) => {
      if ('value' in node && typeof node.value === 'string') {
        const text = node.value;
        const regex = /\$\(([\d\.]+),?(\w+)?\)/g;  // Regex to capture numbers and optional currency codes
        const newText = text.replace(regex, (match, amount: string, currencyCode?: string) => {
          // Dynamically construct formatter options, including currency only if defined
          const dynamicFormatterOptions = {
            customCurrency: customCurrencyData,
            ...(currencyCode ? { currency: currencyCode } : {})
          };
          const formatter = new ExchNumberFormat(locale, dynamicFormatterOptions);
          return formatter.format(parseFloat(amount));
        });

        node.value = newText;
      }
    });
  };
}

import { Node } from 'unist';
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

function remarkCurrencyFormatter(options: CurrencyFormatterOptions) {
  const { locale, customCurrencyData } = options;

  const formatterOptions = {
    customCurrency: customCurrencyData,
  };

  return (tree: Node) => {
    visit(tree, 'text', (node: Node) => {
      if ('value' in node && typeof node.value === 'string') {
        const text = node.value;
        const regex = /\$\(([\d\.]+),?(\w+)?\)/g;  // Regex to capture numbers and optional currency codes
        const newText = text.replace(regex, (match, amount: string, currencyCode?: string) => {
          const loc = locale ? locale : undefined;
          // Construct formatter options dynamically, including currency only if defined
          const dynamicFormatterOptions = {
            ...formatterOptions,
            ...(currencyCode && { currency: currencyCode })
          };
          const formatter = new ExchNumberFormat(loc, dynamicFormatterOptions);
          return formatter.format(parseFloat(amount));
        });

        node.value = newText;
      }
    });
  };
}

export default remarkCurrencyFormatter;

import { Root } from 'mdast';

declare module 'remark-currency-formatter' {
  interface CurrencyData {
    symbol: string;
    narrowSymbol: string;
    code: string;
    name: string;
    defaultDecimals: number;
  }

  interface CurrencyFormatterOptions extends Intl.NumberFormatOptions {
    locale?: string;  // Optional override for locale settings
    customCurrencyData?: {
        [key: string]: CurrencyData;
    };
  }

  export default function remarkCurrencyFormatter(options: CurrencyFormatterOptions): (tree: Root) => void;
}

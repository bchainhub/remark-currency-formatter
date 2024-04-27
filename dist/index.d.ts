import { Root } from 'mdast';
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
export default function remarkCurrencyFormatter(options?: CurrencyFormatterOptions): (tree: Root) => void;
export {};

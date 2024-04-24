import { Node } from 'unist';
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
declare function remarkCurrencyFormatter(options: CurrencyFormatterOptions): (tree: Node) => void;
export default remarkCurrencyFormatter;

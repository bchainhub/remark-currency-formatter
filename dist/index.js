import { visit } from 'unist-util-visit';
import ExchNumberFormat from 'exchange-rounding';
function remarkCurrencyFormatter(options) {
    const { locale, customCurrencyData } = options;
    const formatterOptions = {
        customCurrency: customCurrencyData,
    };
    return (tree) => {
        visit(tree, 'text', (node) => {
            if ('value' in node && typeof node.value === 'string') {
                const text = node.value;
                const regex = /\$\(([\d\.]+),?(\w+)?\)/g;
                const newText = text.replace(regex, (match, amount, currencyCode) => {
                    const dynamicFormatterOptions = {
                        ...formatterOptions,
                        ...(currencyCode ? { currency: currencyCode } : {})
                    };
                    const formatter = new ExchNumberFormat(locale || undefined, dynamicFormatterOptions);
                    return formatter.format(parseFloat(amount));
                });
                node.value = newText;
            }
        });
    };
}
export default remarkCurrencyFormatter;

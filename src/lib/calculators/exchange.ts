import { CalculatorConfig } from "@/types/calculator";

export const exchangeCalculators: CalculatorConfig[] = [
    {
        slug: 'currency-converter',
        category: 'Exchange',
        meta: { title: 'Currency Converter (Realtime)', description: 'Live exchange rates for Fiat (USD, INR, EUR) and Crypto (BTC, ETH).' },
        inputs: [{ id: 'dummy', label: 'Amount', type: 'slider', defaultValue: 1, min: 1, max: 10, step: 1 }],
        calculate: () => [],
        chartType: 'none',
        content: {
            howItWorks: `### Real-Time Currency Converter
Updates every 60 seconds using live market data.
- **Fiat**: USD, INR, EUR, GBP, JPY, AUD, CAD, CNY, SGD, AED
- **Crypto**: Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and more.

Data sourced from open exchange rate providers.`,
            faqs: [
                { question: "Is this data real-time?", answer: "Yes, it fetches latest rates from public APIs (CoinGecko & Open Exchange Rates)." },
                { question: "Can I convert Crypto to Fiat?", answer: "Yes, direct conversion between any supported pair is possible." }
            ]
        }
    },

    // Crypto Profit Calculator
    {
        slug: 'crypto-profit-calculator',
        category: 'Exchange',
        meta: { title: 'Crypto Profit Calculator', description: 'Calculate ROI on your crypto trades.' },
        inputs: [
            { id: 'invest', label: 'Investment Amount', type: 'slider', defaultValue: 1000, min: 100, max: 100000, step: 100, addonRight: '$' },
            { id: 'buy', label: 'Buy Price', type: 'slider', defaultValue: 50000, min: 0.1, max: 100000, step: 0.1, addonRight: '$' },
            { id: 'sell', label: 'Sell Price', type: 'slider', defaultValue: 65000, min: 0.1, max: 100000, step: 0.1, addonRight: '$' },
            { id: 'fees', label: 'Exchange Fees (Total)', type: 'slider', defaultValue: 0.5, min: 0, max: 5, step: 0.1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const invest = Number(inputs.invest);
            const buy = Number(inputs.buy);
            const sell = Number(inputs.sell);
            const fees = Number(inputs.fees) / 100;

            const units = invest / buy; // Coins bought
            const grossSale = units * sell;
            const totalFees = (invest * fees) + (grossSale * fees); // Buy fee + Sell fee roughly
            const profit = grossSale - invest - totalFees;
            const roi = (profit / invest) * 100;

            return [
                { id: 'profit', label: 'Net Profit', value: profit.toFixed(2), type: 'currency', isHighlight: true, addonRight: '$' },
                { id: 'roi', label: 'ROI (Return on Investment)', value: roi.toFixed(2) + '%', type: 'text' },
                { id: 'total', label: 'Total Return', value: (invest + profit).toFixed(2), type: 'currency', addonRight: '$' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Calculate Crypto Gains

This tool helps estimates your profit/loss from a crypto trade.

\\[ \\text{Profit} = (\\text{Sell Price} - \\text{Buy Price}) \\times \\text{Coins} - \\text{Fees} \\]

**Inputs:**
- **Investment**: Total amount spent to buy.
- **Buy Price**: Price per coin at entry.
- **Sell Price**: Price per coin at exit.
- **Fees**: Approximate total exchange fee percentage (Buy + Sell).`,
            faqs: []
        }
    },

    // Forex Margin Calculator
    {
        slug: 'forex-margin-calculator',
        category: 'Exchange',
        meta: { title: 'Forex Margin Calculator', description: 'Calculate required margin for trades.' },
        inputs: [
            { id: 'lots', label: 'Lot Size', type: 'slider', defaultValue: 1, min: 0.01, max: 100, step: 0.01, addonRight: 'Lot' },
            { id: 'leverage', label: 'Leverage', type: 'slider', defaultValue: 100, min: 1, max: 1000, step: 1, addonRight: ':1' },
            { id: 'price', label: 'Pair Price', type: 'slider', defaultValue: 1.0850, min: 0.5, max: 200, step: 0.0001, addonRight: '' }
        ],
        calculate: (inputs) => {
            const lot = Number(inputs.lots);
            const lev = Number(inputs.leverage);
            const price = Number(inputs.price);
            const contractSize = 100000; // Standard lot

            // Required Margin = (Lot * Contract Size * Price) / Leverage
            const margin = (lot * contractSize * price) / lev;

            return [
                { id: 'margin', label: 'Required Margin', value: margin.toFixed(2), type: 'currency', isHighlight: true, addonRight: '$' },
                { id: 'eff', label: 'Effective Value', value: (lot * contractSize * price).toFixed(2), type: 'currency', addonRight: '$' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Forex Margin Formula

Used to determine the collateral needed to open a position.

\\[ \\text{Margin} = \\frac{\\text{Lot Size} \\times 100,000 \\times \\text{Current Price}}{\\text{Leverage}} \\]

Assuming standard lot size of **100,000 units**.`,
            faqs: []
        }
    },

    // Pip Value Calculator
    {
        slug: 'pip-value-calculator',
        category: 'Exchange',
        meta: { title: 'Pip Value Calculator', description: 'Value of one pip for your trade size.' },
        inputs: [
            { id: 'lots', label: 'Lot Size', type: 'slider', defaultValue: 1, min: 0.01, max: 100, step: 0.01, addonRight: 'Lot' },
            { id: 'pair', label: 'Pair Price (Quote)', type: 'slider', defaultValue: 1.2500, min: 0.5, max: 200, step: 0.0001, addonRight: '' }
        ],
        calculate: (inputs) => {
            const lot = Number(inputs.lots);
            const contractSize = 100000;
            const onePip = 0.0001; // Standard for non-JPY pairs

            // Pip Value = (0.0001) * Lot Size * Contract Size
            // (Assuming Quote currency is USD-like or converting back, simplified for general usage)

            // Actually, if Quote is USD (e.g. EURUSD), Pip Value = 0.0001 * 100,000 = $10 per lot.
            // If pair is USDJPY, we need to divide by rate.
            // For this general tool, we'll assume the Quote currency is the account currency (e.g. trading EURUSD with USD account)

            const pipVal = onePip * contractSize * lot;

            return [
                { id: 'val', label: 'Pip Value (Approx)', value: pipVal.toFixed(2), type: 'currency', isHighlight: true, addonRight: '$' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Pip Value

Calculates the monetary value of a single pip movement for your trade.

\\[ \\text{Pip Value} = 0.0001 \\times \\text{Lot Size} \\times 100,000 \\]

(Assumes quote currency matches your account currency, e.g., trading EUR/USD on a USD account).`,
            faqs: []
        }
    }
];

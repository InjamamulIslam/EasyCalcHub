import { CalculatorConfig } from "@/types/calculator";

export const businessCalculators: CalculatorConfig[] = [
    // GST
    {
        slug: 'gst-calculator',
        category: 'Business',
        meta: {
            title: 'GST Calculator',
            description: 'Calculate GST (Goods and Services Tax) inclusive or exclusive price.'
        },
        inputs: [
            { id: 'amount', label: 'Amount', type: 'slider', defaultValue: 10000, min: 100, max: 1000000, step: 100, addonRight: '₹' },
            { id: 'rate', label: 'GST Rate', type: 'slider', defaultValue: 18, min: 0, max: 28, step: 1, addonRight: '%' },
            { id: 'type', label: 'Type', type: 'radio', defaultValue: 0, options: [{ label: 'Exclusive', value: '0' }, { label: 'Inclusive', value: '1' }] }
        ],
        calculate: (inputs) => {
            const amount = Number(inputs.amount);
            const rate = Number(inputs.rate);
            let gst = 0, total = 0;
            if (String(inputs.type) === '1') {
                // Inclusive
                total = amount;
                gst = amount - (amount * (100 / (100 + rate)));
            } else {
                // Exclusive
                gst = (amount * rate) / 100;
                total = amount + gst;
            }
            return [
                { id: 'total', label: 'Total Amount', value: Math.round(total), type: 'currency', isHighlight: true },
                { id: 'gst', label: 'GST Amount', value: Math.round(gst), type: 'currency' },
                { id: 'base', label: 'Base Amount', value: Math.round(total - gst), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `### GST Calculation

GST (Goods and Services Tax) can be calculated in two ways:

### 1. GST Exclusive (Add GST)
Used when GST is charged over and above the base price.
\\[ \\text{GST Amount} = \\text{Base Price} \\times \\frac{\\text{Rate}}{100} \\]
\\[ \\text{Total} = \\text{Base Price} + \\text{GST Amount} \\]

### 2. GST Inclusive (Remove GST)
Used to find the base price and GST component from a final price.
\\[ \\text{GST Amount} = \\text{Total Price} - \\left( \\text{Total Price} \\times \\frac{100}{100 + \\text{Rate}} \\right) \\]`,
            faqs: [
                { question: "What are standard GST rates?", answer: "Common rates in India are 5%, 12%, 18%, and 28% depending on the good or service." },
                { question: "What is Inclusive vs Exclusive?", answer: "Inclusive means the price already includes taxes (e.g., MRP). Exclusive means tax is added on top of the price." }
            ]
        }
    },

    // Profit Margin
    {
        slug: 'profit-margin-calculator',
        category: 'Business',
        meta: { title: 'Profit Margin Calculator', description: 'Calculate Gross Profit Margin percentage.' },
        inputs: [
            { id: 'cost', label: 'Cost Price', type: 'slider', defaultValue: 500, min: 1, max: 10000, step: 10, addonRight: '₹' },
            { id: 'sale', label: 'Sale Price', type: 'slider', defaultValue: 800, min: 1, max: 10000, step: 10, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const c = Number(inputs.cost);
            const s = Number(inputs.sale);
            const profit = s - c;
            const m = (profit / s) * 100;
            return [
                { id: 'margin', label: 'Gross Margin', value: m.toFixed(2), type: 'percent', isHighlight: true },
                { id: 'profit', label: 'Profit', value: profit, type: 'currency' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Profit Margin Formula

Margin is different from Markup. Margin is profit as a percentage of the **Selling Price**.

\\[ \\text{Margin} \\% = \\frac{\\text{Selling Price} - \\text{Cost Price}}{\\text{Selling Price}} \\times 100 \\]

This shows how much of every rupee earns is actual profit.`,
            faqs: [
                { question: "Margin vs Markup?", answer: "Margin is based on Revenue (Sale Price). Markup is based on Cost. 25% Markup = 20% Margin." }
            ]
        }
    },

    // Break Even
    {
        slug: 'break-even-calculator',
        category: 'Business',
        meta: { title: 'Break-Even Calculator', description: 'Find quantities needed to cover costs.' },
        inputs: [
            { id: 'fixed', label: 'Total Fixed Costs', type: 'slider', defaultValue: 10000, min: 1000, max: 100000, step: 1000, addonRight: '₹' },
            { id: 'price', label: 'Price Per Unit', type: 'slider', defaultValue: 100, min: 10, max: 1000, step: 10, addonRight: '₹' },
            { id: 'var', label: 'Variable Cost Per Unit', type: 'slider', defaultValue: 50, min: 0, max: 1000, step: 10, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const f = Number(inputs.fixed);
            const p = Number(inputs.price);
            const v = Number(inputs.var);
            if (p <= v) return [{ id: 'err', label: 'Loss per unit', value: 0, type: 'number', isHighlight: true }];
            const units = Math.ceil(f / (p - v));
            return [
                { id: 'units', label: 'Break Even Units', value: units, type: 'number', isHighlight: true },
                { id: 'revenue', label: 'Break Even Revenue', value: units * p, type: 'currency' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Break-Even Point

The point where total revenue equals total costs (neither profit nor loss).

\\[ \\text{Break-Even Units} = \\frac{\\text{Fixed Costs}}{\\text{Price Per Unit} - \\text{Variable Cost Per Unit}} \\]

- **Contribution Margin** = Price - Variable Cost
- Any unit sold beyond this point generates profit.`,
            faqs: []
        }
    },

    // ROI
    {
        slug: 'roi-calculator',
        category: 'Business',
        meta: { title: 'ROI Calculator', description: 'Calculate Return on Investment percentage.' },
        inputs: [
            { id: 'inv', label: 'Invested Amount', type: 'slider', defaultValue: 50000, min: 1000, max: 1000000, step: 1000, addonRight: '₹' },
            { id: 'ret', label: 'Returned Amount', type: 'slider', defaultValue: 75000, min: 1000, max: 2000000, step: 1000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const i = Number(inputs.inv);
            const r = Number(inputs.ret);
            const profit = r - i;
            return [
                { id: 'roi', label: 'ROI', value: ((profit / i) * 100).toFixed(2), type: 'percent', isHighlight: true },
                { id: 'profit', label: 'Net Gain', value: profit, type: 'currency' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### ROI Formula

\\[ \\text{ROI} = \\frac{\\text{Final Value} - \\text{Initial Investment}}{\\text{Initial Investment}} \\times 100 \\]

Positive ROI means profit, negative means loss.`,
            faqs: []
        }
    },

    // Markup
    {
        slug: 'markup-calculator',
        category: 'Business',
        meta: { title: 'Markup Calculator', description: 'Calculate Sale Price from Cost and Markup.' },
        inputs: [
            { id: 'cost', label: 'Cost Price', type: 'slider', defaultValue: 100, min: 1, max: 10000, step: 1, addonRight: '₹' },
            { id: 'markup', label: 'Markup %', type: 'slider', defaultValue: 25, min: 0, max: 100, step: 1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const c = Number(inputs.cost);
            const m = Number(inputs.markup);
            const sale = c * (1 + m / 100);
            return [
                { id: 'sale', label: 'Sale Price', value: Math.round(sale), type: 'currency', isHighlight: true },
                { id: 'profit', label: 'Gross Profit', value: Math.round(sale - c), type: 'currency' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Markup Formula

Markup is the amount added to the cost price of goods to cover overhead and profit.

\\[ \\text{Sale Price} = \\text{Cost} \\times (1 + \\frac{\\text{Markup %}}{100}) \\]`,
            faqs: []
        }
    },

    // Discount
    {
        slug: 'discount-calculator',
        category: 'Business',
        meta: { title: 'Discount Calculator', description: 'Calculate final price after discount.' },
        inputs: [
            { id: 'price', label: 'Original Price', type: 'slider', defaultValue: 1000, min: 10, max: 100000, step: 10, addonRight: '₹' },
            { id: 'disc', label: 'Discount %', type: 'slider', defaultValue: 20, min: 0, max: 90, step: 1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const p = Number(inputs.price);
            const d = Number(inputs.disc);
            const saved = p * (d / 100);
            return [
                { id: 'final', label: 'Final Price', value: Math.round(p - saved), type: 'currency', isHighlight: true },
                { id: 'saved', label: 'You Save', value: Math.round(saved), type: 'currency' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Discount Calculation

\\[ \\text{Final Price} = \\text{Price} \\times (1 - \\frac{\\text{Discount %}}{100}) \\]`,
            faqs: []
        }
    },

    // Business Loan Eligibility
    {
        slug: 'business-loan-eligibility-calculator',
        category: 'Business',
        meta: { title: 'Business Loan Eligibility', description: 'Estimate potential business loan amount.' },
        inputs: [
            { id: 'profit', label: 'Yearly Net Profit', type: 'slider', defaultValue: 500000, min: 100000, max: 10000000, step: 50000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const profit = Number(inputs.profit);
            // General Rule: Banks lend 3x - 5x of Net Annual Profit
            return [{ id: 'eligible', label: 'Estimated Eligibility', value: Math.round(profit * 4), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Loan Eligibility

This uses a standard multiplier method. Most banks offer unsecured business loans up to **3x to 5x of annual net profit**, depending on business vintage and industry.`,
            faqs: []
        }
    },

    // Cash Flow
    {
        slug: 'cash-flow-calculator',
        category: 'Business',
        meta: { title: 'Cash Flow Calculator', description: 'Calculate Net Cash Flow.' },
        inputs: [
            { id: 'in', label: 'Total Inflow', type: 'slider', defaultValue: 50000, min: 0, max: 1000000, step: 1000, addonRight: '₹' },
            { id: 'out', label: 'Total Outflow', type: 'slider', defaultValue: 40000, min: 0, max: 1000000, step: 1000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            return [{ id: 'net', label: 'Net Cash Flow', value: Math.round(Number(inputs.in) - Number(inputs.out)), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: { howItWorks: 'Net Flow = Cash In - Cash Out.', faqs: [] }
    },

    // Invoice Total
    {
        slug: 'invoice-total-calculator',
        category: 'Business',
        meta: { title: 'Invoice Total Calculator', description: 'Calculate final invoice amount with tax.' },
        inputs: [
            { id: 'sub', label: 'Subtotal', type: 'slider', defaultValue: 1000, min: 10, max: 100000, step: 10, addonRight: '₹' },
            { id: 'tax', label: 'Tax Rate', type: 'slider', defaultValue: 18, min: 0, max: 30, step: 1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const s = Number(inputs.sub);
            const t = Number(inputs.tax);
            return [
                { id: 'tot', label: 'Invoice Total', value: Math.round(s * (1 + t / 100)), type: 'currency', isHighlight: true },
                { id: 'taxAmt', label: 'Tax Amount', value: Math.round(s * t / 100), type: 'currency' }
            ];
        },
        chartType: 'none',
        content: { howItWorks: 'Subtotal + Tax', faqs: [] }
    },

    // E-Commerce Profit
    {
        slug: 'e-commerce-profit-calculator',
        category: 'Business',
        meta: { title: 'E-Commerce Profit Calculator', description: 'Real profit after platform fees.' },
        inputs: [
            { id: 'sale', label: 'Sale Price', type: 'slider', defaultValue: 1000, min: 1, max: 10000, step: 10, addonRight: '₹' },
            { id: 'cost', label: 'Product Cost', type: 'slider', defaultValue: 400, min: 1, max: 10000, step: 10, addonRight: '₹' },
            { id: 'fees', label: 'Platform/Shipping Fees', type: 'slider', defaultValue: 150, min: 0, max: 2000, step: 10, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            return [{ id: 'profit', label: 'Net Profit', value: Math.round(Number(inputs.sale) - Number(inputs.cost) - Number(inputs.fees)), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: { howItWorks: 'Sale Price - (Cost + Fees + Shipping)', faqs: [] }
    }
];

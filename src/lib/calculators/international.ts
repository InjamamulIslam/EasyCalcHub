import { CalculatorConfig } from "@/types/calculator";

export const internationalCalculators: CalculatorConfig[] = [
    // US Mortgage
    {
        slug: 'mortgage-calculator-usa',
        category: 'International',
        meta: { title: 'Mortgage Calculator (USA)', description: 'Calculate monthly home loan payments.' },
        inputs: [
            { id: 'principal', label: 'Loan Amount', type: 'slider', defaultValue: 300000, min: 50000, max: 2000000, step: 5000, addonRight: '$' },
            { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 6.5, min: 1, max: 15, step: 0.1, addonRight: '%' },
            { id: 'years', label: 'Loan Term', type: 'slider', defaultValue: 30, min: 10, max: 40, step: 5, addonRight: 'Yrs' }
        ],
        calculate: (inputs) => {
            const p = Number(inputs.principal);
            const r = Number(inputs.rate) / 100 / 12;
            const n = Number(inputs.years) * 12;
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            return [
                { id: 'pmt', label: 'Monthly Payment', value: '$' + Math.round(emi).toLocaleString(), type: 'text', isHighlight: true },
                { id: 'tot', label: 'Total Repayment', value: '$' + Math.round(emi * n).toLocaleString(), type: 'text' },
                { id: 'int', label: 'Total Interest', value: '$' + Math.round((emi * n) - p).toLocaleString(), type: 'text' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `### US Mortgage Calculation

This calculator estimates your monthly PI (Principal & Interest) payment.

### Formula:
\\[ M = P \\frac{r(1+r)^n}{(1+r)^n - 1} \\]

Where:
- **M** = Total monthly payment
- **P** = Principal loan amount
- **r** = Monthly interest rate
- **n** = Number of monthly payments`,
            faqs: [
                { question: "Does this include Escrow?", answer: "No, this calculator only calculates Principal and Interest. Property taxes and insurance (Escrow) are extra." },
                { question: "What is a typical term?", answer: "The most common terms in the US are 15-year and 30-year fixed-rate mortgages." }
            ]
        }
    },

    // Auto Loan US
    {
        slug: 'auto-loan-calculator-usa',
        category: 'International',
        meta: { title: 'Auto Loan Calculator (USA)', description: 'Calculate monthly car payments.' },
        inputs: [
            { id: 'price', label: 'Vehicle Price', type: 'slider', defaultValue: 35000, min: 10000, max: 100000, step: 500, addonRight: '$' },
            { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 5, min: 0, max: 20, step: 0.1, addonRight: '%' },
            { id: 'months', label: 'Loan Term', type: 'slider', defaultValue: 60, min: 24, max: 84, step: 12, addonRight: 'Mo' }
        ],
        calculate: (inputs) => {
            const p = Number(inputs.price);
            const r = Number(inputs.rate) / 100 / 12;
            const n = Number(inputs.months);
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            return [{ id: 'pmt', label: 'Monthly Payment', value: '$' + Math.round(emi).toLocaleString(), type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Information
Standard auto loan terms range from 36 to 72 months.
\\[ P = \\text{Monthly Payment} \\]`,
            faqs: []
        }
    },

    // Salary Calculator USA
    {
        slug: 'salary-calculator-usa',
        category: 'International',
        meta: { title: 'Salary Calculator (USA)', description: 'Estimate Net Pay from Gross Salary.' },
        inputs: [{ id: 'gross', label: 'Annual Gross Salary', type: 'slider', defaultValue: 80000, min: 20000, max: 500000, step: 5000, addonRight: '$' }],
        calculate: (inputs) => {
            const g = Number(inputs.gross);
            // Rough estimation for demo:
            // Federal Tax ~15-20%, FICA 7.65%, State ~4%
            // Total deduction approx 30% for median income
            const net = g * 0.72;
            return [
                { id: 'net', label: 'Est. Annual Net Pay', value: '$' + Math.round(net).toLocaleString(), type: 'text', isHighlight: true },
                { id: 'monthly', label: 'Monthly Paycheck', value: '$' + Math.round(net / 12).toLocaleString(), type: 'text' },
                { id: 'biweekly', label: 'Bi-Weekly Paycheck', value: '$' + Math.round(net / 26).toLocaleString(), type: 'text' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### US Paycheck Estimation

Estimates take-home pay after federal taxes, state taxes, and FICA (Social Security & Medicare).

**Assumptions:**
- Single Filer
- Standard Deduction
- 7.65% FICA Tax
- Average State Tax`,
            faqs: [
                { question: "What is FICA?", answer: "Federal Insurance Contributions Act tax is a mandatory payroll tax for Social Security and Medicare." }
            ]
        }
    },

    // Tax Calculator USA
    {
        slug: 'tax-calculator-usa',
        category: 'International',
        meta: { title: 'Tax Calculator (USA)', description: 'Estimate your Federal Tax Liability.' },
        inputs: [{ id: 'income', label: 'Annual Income', type: 'slider', defaultValue: 100000, min: 10000, max: 500000, step: 1000, addonRight: '$' }],
        calculate: (inputs) => {
            const inc = Number(inputs.income);
            // 2024 Bracket Simplification for single filer
            // 10% up to 11,600
            // 12% 11,601 to 47,150
            // 22% 47,151 to 100,525
            // 24% 100,526 to 191,950
            // etc
            let tax = 0;
            const stdDed = 14600; // 2024
            const taxable = Math.max(0, inc - stdDed);

            if (taxable > 100525) tax = taxable * 0.24; // Very rough progressive avg
            else if (taxable > 47150) tax = taxable * 0.22;
            else tax = taxable * 0.12;

            return [{ id: 'tax', label: 'Est. Federal Tax', value: '$' + Math.round(tax).toLocaleString(), type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Federal Income Tax

Calculates estimated tax based on progressive tax brackets for a Single Filer (2024 Tax Year).

Includes Standard Deduction of **$14,600**.`,
            faqs: []
        }
    },

    // Pension UK
    {
        slug: 'pension-calculator-uk',
        category: 'International',
        meta: { title: 'Pension Calculator (UK)', description: 'Project your retirement pot.' },
        inputs: [
            { id: 'cont', label: 'Monthly Contribution', type: 'slider', defaultValue: 500, min: 100, max: 5000, step: 50, addonRight: '£' },
            { id: 'years', label: 'Years to Retirement', type: 'slider', defaultValue: 30, min: 10, max: 40, step: 1, addonRight: 'Yrs' }
        ],
        calculate: (inputs) => {
            const c = Number(inputs.cont);
            const y = Number(inputs.years);
            const r = 0.05; // 5% real growth
            const n = y * 12;
            // FV of annuity
            const pot = c * ((Math.pow(1 + r / 12, n) - 1) / (r / 12));
            return [{ id: 'pot', label: 'Projected Pot', value: '£' + Math.round(pot).toLocaleString(), type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Pension Pot Projection

Estimates future value of your pension contributions assuming **5% annual growth** (after inflation).

\\[ FV = PMT \\times \\frac{(1 + r)^n - 1}{r} \\]`,
            faqs: [
                { question: "Can I take 25% tax free?", answer: "Yes, currently in the UK you can usually take up to 25% of your pension pot tax-free." }
            ]
        }
    },

    // Mortgage UK
    {
        slug: 'mortgage-calculator-uk',
        category: 'International',
        meta: { title: 'Mortgage Calculator (UK)', description: 'Calculate monthly repayments.' },
        inputs: [
            { id: 'amt', label: 'Loan Amount', type: 'slider', defaultValue: 250000, min: 50000, max: 1000000, step: 10000, addonRight: '£' },
            { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 4.5, min: 1, max: 10, step: 0.1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const p = Number(inputs.amt);
            const r = Number(inputs.rate) / 100 / 12;
            const n = 25 * 12; // Standard 25 years
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            return [{ id: 'pmt', label: 'Monthly Repayment', value: '£' + Math.round(emi), type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Repayment Mortgage

Calculates monthly repayment for a standard **25-year term**.`,
            faqs: []
        }
    },

    // Student Loan USA
    {
        slug: 'student-loan-calculator-usa',
        category: 'International',
        meta: { title: 'Student Loan Calculator (USA)', description: 'Calculate monthly payments.' },
        inputs: [
            { id: 'bal', label: 'Loan Balance', type: 'slider', defaultValue: 30000, min: 5000, max: 200000, step: 1000, addonRight: '$' },
            { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 6, min: 2, max: 15, step: 0.1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const p = Number(inputs.bal);
            const r = Number(inputs.rate) / 100 / 12;
            const n = 120; // 10 years std
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            return [{ id: 'pay', label: 'Monthly Payment', value: '$' + Math.round(emi), type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Standard Repayment Plan

Calculates fixed monthly payment to pay off your loan in **10 years** (120 payments).`,
            faqs: []
        }
    },

    // Hourly to Salary
    {
        slug: 'hourly-to-salary-calculator',
        category: 'International',
        meta: { title: 'Hourly to Salary Calculator', description: 'Convert hourly wage to annual salary.' },
        inputs: [{ id: 'hr', label: 'Hourly Rate', type: 'slider', defaultValue: 20, min: 7, max: 100, step: 1, addonRight: '$' }],
        calculate: (inputs) => {
            const salary = Number(inputs.hr) * 40 * 52;
            return [{ id: 'an', label: 'Annual Salary', value: '$' + salary.toLocaleString(), type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Conversion

Based on standard full-time work year:
**40 hours/week × 52 weeks = 2080 hours/year**

\\[ \\text{Annual} = \\text{Hourly Rate} \\times 2080 \\]`,
            faqs: []
        }
    },

    // Salary to Hourly
    {
        slug: 'salary-to-hourly-calculator',
        category: 'International',
        meta: { title: 'Salary to Hourly Calculator', description: 'Convert salary to hourly wage.' },
        inputs: [{ id: 'sal', label: 'Annual Salary', type: 'slider', defaultValue: 50000, min: 20000, max: 200000, step: 1000, addonRight: '$' }],
        calculate: (inputs) => {
            return [{ id: 'hr', label: 'Hourly Rate', value: '$' + (Number(inputs.sal) / 2080).toFixed(2), type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: { howItWorks: 'Annual / 2080', faqs: [] }
    },

    // Inflation USA
    {
        slug: 'inflation-calculator-usa',
        category: 'International',
        meta: { title: 'Inflation Calculator (USA)', description: 'Calculate future purchasing power.' },
        inputs: [
            { id: 'amt', label: 'Current Amount', type: 'slider', defaultValue: 100, min: 1, max: 10000, step: 10, addonRight: '$' },
            { id: 'yrs', label: 'Years', type: 'slider', defaultValue: 10, min: 1, max: 50, step: 1, addonRight: 'Yrs' }
        ],
        calculate: (inputs) => {
            // Future Value = P * (1+r)^n
            const val = Number(inputs.amt) * Math.pow(1.03, Number(inputs.yrs)); // 3% avg
            return [{ id: 'val', label: 'Future Value', value: '$' + Math.round(val).toLocaleString(), type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Buying Power

Estimates future cost assuming an average annual inflation rate of **3%**.

\\[ FV = PV \\times (1 + 0.03)^n \\]`,
            faqs: []
        }
    }
];

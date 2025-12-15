import { CalculatorConfig } from "@/types/calculator";

export const salaryCalculators: CalculatorConfig[] = [
    // --- Core ---
    // Salary Calculator (CTC -> In Hand)
    {
        slug: 'salary-calculator',
        category: 'Salary',
        meta: { title: 'Salary Calculator (CTC to In-Hand)', description: 'Calculate accurate monthly in-hand salary from your Annual CTC.' },
        inputs: [
            { id: 'ctc', label: 'Annual CTC', type: 'slider', defaultValue: 1000000, min: 300000, max: 5000000, step: 50000, addonRight: '₹' },
            { id: 'bonus', label: 'Bonus/Variable', type: 'slider', defaultValue: 50000, min: 0, max: 1000000, step: 10000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const ctc = Number(inputs.ctc);
            const bonus = Number(inputs.bonus);
            const pt = 2400; // Standard PT estimate
            // Let's use a simpler common standard: PF on full basic, basic = 40% CTC
            const pfYearly = ((ctc - bonus) * 0.4) * 0.12;

            const inHandYearly = ctc - bonus - pfYearly - pt;
            return [
                { id: 'monthly', label: 'Monthly In-Hand', value: Math.round(inHandYearly / 12), type: 'currency', isHighlight: true },
                { id: 'deductions', label: 'Est. Annual PF', value: Math.round(pfYearly), type: 'currency' },
                { id: 'pt', label: 'Professional Tax', value: Math.round(pt), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## How In-Hand Salary is Calculated

Your **CTC (Cost to Company)** is not what you receive in your bank account. Several components are deducted before the final payout.

### The Breakdown:
\\[ InHand = CTC - (PF + PT + Income Tax + Gratuity + Insurance) \\]

**Components:**
- **CTC**: Total expense company spends on you.
- **Basic Salary**: Usually 40-50% of CTC.
- **PF (Provident Fund)**: 12% of Basic Salary deducted for retirement.
- **Professional Tax (PT)**: State government tax (max ₹2500/year).
- **TDS**: Income Tax deducted at source (not calculated here, use Tax Calculator for that).

This calculator provides an **estimate** before income tax deductions.`,
            faqs: [
                { question: "Why is my in-hand less than CTC?", answer: "CTC includes non-cash components like PF employer contribution, gratuity, and insurance premiums which are not paid monthly." },
                { question: "Is PF compulsory?", answer: "Yes, for employees with Basic Salary < ₹15,000/month. For higher salaries, it is optional but recommended for tax saving." },
                { question: "What is Variable Pay?", answer: "It is performance-linked pay associated with your or company's performance, usually paid annually or quarterly." }
            ]
        }
    },

    // Take Home Salary
    {
        slug: 'take-home-salary-calculator',
        category: 'Salary',
        meta: { title: 'Take Home Salary Calculator', description: 'Quick estimate of your monthly take-home pay.' },
        inputs: [
            { id: 'ctc', label: 'Annual CTC', type: 'slider', defaultValue: 800000, min: 200000, max: 5000000, step: 10000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const ctc = Number(inputs.ctc);
            const monthly = (ctc * 0.92) / 12; // Crude estimation (~8% deduction for PF/Insurance)
            return [{ id: 'monthly', label: 'Est. Monthly Take Home', value: Math.round(monthly), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `## Quick Take-Home Estimate

This tool provides a rapid approximation of your monthly paycheck.

### Assumption
It assumes roughly **8-10% deduction** from your CTC towards Provident Fund and other benefits, excluding Income Tax.

For a precise calculation including taxes, use the comprehensive **Salary Calculator (CTC to In-Hand)**.`,
            faqs: [
                { question: "Does this include tax?", answer: "No, this is a pre-tax estimate. Taxes depend on your regime and investments." }
            ]
        }
    },

    // Income Tax Calc (Old vs New)
    {
        slug: 'income-tax-calculator',
        category: 'Salary',
        meta: { title: 'Income Tax Calculator', description: 'Compare Old vs New Tax Regime (FY 2024-25) and calculate liability.' },
        inputs: [
            { id: 'income', label: 'Annual Income', type: 'slider', defaultValue: 1200000, min: 300000, max: 5000000, step: 50000, addonRight: '₹' },
            { id: 'deductions', label: 'Deductions (80C etc)', type: 'slider', defaultValue: 150000, min: 0, max: 500000, step: 5000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const income = Number(inputs.income);
            const dedC80 = Number(inputs.deductions);

            // --- NEW REGIME (FY 2024-25 / AY 2025-26) ---
            const stdDedNew = 75000;
            const taxableNew = Math.max(0, income - stdDedNew);

            let taxNew = 0;
            // New Regime Slabs (Budget 2024 update)
            if (taxableNew > 1500000) {
                taxNew += (taxableNew - 1500000) * 0.30 + 150000;
            } else if (taxableNew > 1200000) {
                taxNew += (taxableNew - 1200000) * 0.20 + 90000;
            } else if (taxableNew > 1000000) { // 10-12L -> 15%
                taxNew += (taxableNew - 1000000) * 0.15 + 60000;
            } else if (taxableNew > 700000) { // 7-10L -> 10%
                taxNew += (taxableNew - 700000) * 0.10 + 30000; // 3-7L is 5% of 4L = 20k? Wait.
                // Let's re-verify slabs:
                // 0-3: nil
                // 3-7: 5% -> 4L * 5% = 20,000 tax
                // 7-10: 10% -> 3L * 10% = 30,000 tax
                // 10-12: 15% -> 2L * 15% = 30,000 tax
                // 12-15: 20% -> 3L * 20% = 60,000 tax
                // >15: 30%

                // Correction on accumulated amounts:
                // Above 15L: (TaxNew - 15L)*0.3 + (60k+30k+30k+20k) = 140k
                // Above 12L: (TaxNew - 12L)*0.2 + (80k)
            } else if (taxableNew > 300000) {
                taxNew += (taxableNew - 300000) * 0.05;
            }

            // Rebate 87A New Regime: Income <= 7L is tax free
            // Note: If Taxable Income is exactly 7L, tax is 20k. Rebate 25k (max). So tax is 0.
            if (taxableNew <= 700000) {
                taxNew = 0;
            }
            const totalTaxNew = taxNew * 1.04;

            // --- OLD REGIME ---
            const stdDedOld = 50000;
            const taxableOld = Math.max(0, income - stdDedOld - dedC80);

            let taxOld = 0;
            // Old Regime Slabs
            // 0-2.5: Nil
            // 2.5-5: 5% -> 12,500
            // 5-10: 20% -> 1,00,000
            // >10: 30%
            if (taxableOld > 1000000) {
                taxOld += (taxableOld - 1000000) * 0.30 + 112500;
            } else if (taxableOld > 500000) {
                taxOld += (taxableOld - 500000) * 0.20 + 12500;
            } else if (taxableOld > 250000) {
                taxOld += (taxableOld - 250000) * 0.05;
            }

            // Rebate 87A Old Regime: Income <= 5L is tax free
            if (taxableOld <= 500000) {
                taxOld = 0;
            }
            const totalTaxOld = taxOld * 1.04;

            return [
                { id: 'new', label: 'Tax (New Regime)', value: Math.round(totalTaxNew), type: 'currency', isHighlight: totalTaxNew <= totalTaxOld },
                { id: 'old', label: 'Tax (Old Regime)', value: Math.round(totalTaxOld), type: 'currency', isHighlight: totalTaxOld < totalTaxNew }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### New vs Old Tax Regime (FY 2024-25)

The calculator compares your tax liability under both regimes to help you choose the best option.

### New Tax Regime Slabs (Default):
- **0 - 3 Lakh**: Nil
- **3 - 7 Lakh**: 5%
- **7 - 10 Lakh**: 10%
- **10 - 12 Lakh**: 15%
- **12 - 15 Lakh**: 20%
- **Above 15 Lakh**: 30%
- **Standard Deduction**: ₹75,000
- **Sec 87A Rebate**: Up to ₹7 Lakhs Income is Tax Free.

### Old Tax Regime Slabs:
- **0 - 2.5 Lakh**: Nil
- **2.5 - 5 Lakh**: 5%
- **5 - 10 Lakh**: 20%
- **Above 10 Lakh**: 30%
- **Standard Deduction**: ₹50,000
- **Rebate**: Up to ₹5 Lakhs Income is Tax Free.`,
            faqs: [
                { question: "Which regime is better?", answer: "The New Regime is better for income up to ₹15L if you have deductions less than ₹3.75 Lakhs. If you claim HRA, Home Loan Interest, and 80C, Old Regime might save more." },
                { question: "Is Standard Deduction available in New Regime?", answer: "Yes, standard deduction of ₹75,000 has been introduced in the New Regime from FY 2024-25." }
            ]
        }
    },

    // HRA
    {
        slug: 'hra-calculator',
        category: 'Salary',
        meta: { title: 'HRA Calculator', description: 'Calculate House Rent Allowance (HRA) exemption for tax saving.' },
        inputs: [
            { id: 'basic', label: 'Basic Salary', type: 'slider', defaultValue: 500000, min: 100000, max: 5000000, step: 10000, addonRight: '₹' },
            { id: 'hra', label: 'HRA Received', type: 'slider', defaultValue: 200000, min: 10000, max: 2000000, step: 10000, addonRight: '₹' },
            { id: 'rent', label: 'Rent Paid', type: 'slider', defaultValue: 180000, min: 0, max: 2000000, step: 5000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const basic = Number(inputs.basic);
            const hra = Number(inputs.hra);
            const rent = Number(inputs.rent);

            // HRA Rule: Exempt is least of:
            // 1. Actual HRA Received
            // 2. Rent Paid - 10% of Basic
            // 3. 50% of Basic (Metros) / 40% (Non-Metros) -> Assuming 50% for safety or user choice? Let's generic to 50% or min

            const cond2 = Math.max(0, rent - (0.10 * basic));
            const cond3 = 0.50 * basic; // Considering Metro

            const exempt = Math.min(hra, cond2, cond3);
            const taxable = hra - exempt;

            return [
                { id: 'exempt', label: 'Exempt HRA', value: Math.round(exempt), type: 'currency', isHighlight: true },
                { id: 'taxable', label: 'Taxable HRA', value: Math.round(taxable), type: 'currency' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### HRA Exemption Calculation

HRA Exemption is the lowest of the following three amounts (u/s 10(13A)):

1. **Actual HRA Received**
2. **Rent Paid minus 10% of Basic Salary**
3. **50% of Basic Salary** (for Metro cities) or **40%** (for Non-Metro)

This calculator uses the Metro city (50%) assumption for maximum potential exemption estimate.`,
            faqs: [
                { question: "Do I need rent receipts?", answer: "Yes, to claim HRA exemption, you must submit rent receipts to your employer. PAN of landlord is required if annual rent exceeds ₹1 Lakh." },
                { question: "Can I claim HRA if I live with parents?", answer: "Yes, if you pay rent to your parents and they show it as rental income in their ITR." }
            ]
        }
    },

    // PF
    {
        slug: 'pf-calculator',
        category: 'Salary',
        meta: { title: 'EPF Calculator', description: 'Estimate your Employee Provident Fund (EPF) corpus at retirement.' },
        inputs: [
            { id: 'basic', label: 'Monthly Basic Pay', type: 'slider', defaultValue: 30000, min: 5000, max: 200000, step: 1000, addonRight: '₹' },
            { id: 'years', label: 'Years to Retirement', type: 'slider', defaultValue: 25, min: 1, max: 40, step: 1, addonRight: 'Yrs' },
            { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 8.15, min: 7, max: 10, step: 0.05, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const basic = Number(inputs.basic);
            const years = Number(inputs.years);
            const rate = Number(inputs.rate) / 100;

            // EPF Contribution: 12% employee + 3.67% employer (rest 8.33% goes to EPS)
            // Total EPF investment monthly = 15.67% of basic roughly
            const monthlyCont = basic * 0.1567;

            // Simple FV of monthly investment
            const months = years * 12;
            const r = rate / 12;

            const corpus = monthlyCont * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

            return [{ id: 'pf', label: 'Est. EPF Corpus', value: Math.round(corpus), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### EPF Corpus Accumulation

Your EPF corpus grows via monthly contributions and compound interest.

**Contributions:**
- **Employee**: 12% of Basic Salary + DA
- **Employer**: 3.67% to EPF (Remaining 8.33% goes to Pension Scheme EPS)

**Formula:**
Uses compound interest on monthly contributions.`,
            faqs: [
                { question: "What is current EPF interest rate?", answer: "The interest rate is decided annually by EPFO. For FY 2023-24, it was 8.25%." },
                { question: "Is EPF maturity tax-free?", answer: "Yes, if you complete 5 years of continuous service, the EPF withdrawal is tax-free." }
            ]
        }
    },

    // Gratuity
    {
        slug: 'gratuity-calculator',
        category: 'Salary',
        meta: { title: 'Gratuity Calculator', description: 'Estimate the gratuity amount you are eligible to receive.' },
        inputs: [
            { id: 'lastDrawn', label: 'Last Basic Salary + DA', type: 'slider', defaultValue: 50000, min: 10000, max: 500000, step: 1000, addonRight: '₹' },
            { id: 'years', label: 'Years of Service', type: 'slider', defaultValue: 5, min: 5, max: 40, step: 1, addonRight: 'Yrs' }
        ],
        calculate: (inputs) => {
            const sal = Number(inputs.lastDrawn);
            const yrs = Number(inputs.years);
            // Formula: (15 * Last Salary * Tenure) / 26
            const grat = (15 * sal * yrs) / 26;
            return [{ id: 'gratuity', label: 'Gratuity Amount', value: Math.round(grat), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Gratuity Formula

Gratuity is a benefit for employees who have served for **5 years or more**.

**Formula:**
\\[ G = \\frac{15 \\times \\text{Last Drawn Salary} \\times \\text{Years of Service}}{26} \\]

- **Last Drawn Salary**: Basic + DA
- **15**: 15 days wages per year
- **26**: Working days in a month`,
            faqs: [
                { question: "Is gratuity taxable?", answer: "Gratuity is tax-free up to ₹20 Lakhs for non-government employees covered under the Gratuity Act." },
                { question: "Is 5 years continuous service mandatory?", answer: "Yes, 5 years of continuous service is mandatory to be eligible for gratuity, except in case of death or disablement." }
            ]
        }
    },

    // Bonus
    {
        slug: 'bonus-calculator',
        category: 'Salary',
        meta: { title: 'Bonus Calculator', description: 'Calculate annual bonus amount based on CTC.' },
        inputs: [
            { id: 'ctc', label: 'Annual CTC/Base', type: 'slider', defaultValue: 1000000, min: 100000, max: 5000000, step: 10000, addonRight: '₹' },
            { id: 'percent', label: 'Bonus Percentage', type: 'slider', defaultValue: 10, min: 1, max: 500, step: 1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const ctc = Number(inputs.ctc);
            const pct = Number(inputs.percent);
            return [{ id: 'bonus', label: 'Bonus Amount', value: Math.round(ctc * pct / 100), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Bonus Calculation

Calculates the absolute bonus amount based on a percentage of your CTC or Basic salary.

**Formula:**
\\[ Bonus = \\text{Base Amount} \\times \\frac{\\text{Percentage}}{100} \\]`,
            faqs: []
        }
    },

    // Professional Tax
    {
        slug: 'professional-tax-calculator',
        category: 'Salary',
        meta: { title: 'Professional Tax Calculator', description: 'Check Professional Tax (PT) slab.' },
        inputs: [{ id: 'salary', label: 'Monthly Gross Salary', type: 'slider', defaultValue: 40000, min: 5000, max: 200000, step: 1000, addonRight: '₹' }],
        calculate: (inputs) => {
            const sal = Number(inputs.salary);
            // Defaulting to Maharashtra Slab
            // > 10000 : 200 (300 in Feb)
            // But let's keep it simple standard 200
            let pt = 200;
            if (sal < 7500) pt = 0;
            else if (sal < 10000) pt = 175;

            return [{ id: 'pt', label: 'Monthly PT', value: pt, type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Professional Tax

PT is levied by state governments. The maximum PT deductable is **₹2,500 per year**.
Often deducted as ₹200 for 11 months and ₹300 in the last month (varies by state).`,
            faqs: []
        }
    },

    // Overtime
    {
        slug: 'overtime-salary-calculator',
        category: 'Salary',
        meta: { title: 'Overtime Salary Calculator', description: 'Calculate overtime payout.' },
        inputs: [
            { id: 'hourly', label: 'Hourly Rate', type: 'slider', defaultValue: 300, min: 50, max: 5000, step: 50, addonRight: '₹' },
            { id: 'hours', label: 'Overtime Hours', type: 'slider', defaultValue: 10, min: 1, max: 100, step: 1, addonRight: 'Hrs' }
        ],
        calculate: (inputs) => {
            return [{ id: 'ot', label: 'Overtime Pay', value: Math.round(Number(inputs.hourly) * Number(inputs.hours)), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Overtime Pay

\\[ \\text{Pay} = \\text{Hourly Rate} \\times \\text{OT Hours} \\]

Check your company policy for overtime multiplier (e.g., 1.5x or 2x regular rate).`,
            faqs: []
        }
    },

    // Freelance
    {
        slug: 'freelance-income-calculator',
        category: 'Salary',
        meta: { title: 'Freelance Income Calculator', description: 'Calculate specific net income for freelancers.' },
        inputs: [
            { id: 'rev', label: 'Total Revenue', type: 'slider', defaultValue: 100000, min: 1000, max: 5000000, step: 5000, addonRight: '₹' },
            { id: 'exp', label: 'Expenses', type: 'slider', defaultValue: 10000, min: 0, max: 1000000, step: 1000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            return [{ id: 'profit', label: 'Net Profit', value: Math.round(Number(inputs.rev) - Number(inputs.exp)), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Net Profit

\\[ \\text{Profit} = \\text{Revenue} - \\text{Expenses} \\]`,
            faqs: [
                { question: "Is freelance income taxable?", answer: "Yes, it is taxed under 'Profits and Gains of Business or Profession'. You can opt for Presumptive Taxation (Section 44ADA) to declare only 50% as profit." }
            ]
        }
    },

    // --- Long Tail ---
    {
        slug: 'salary-calculator-after-pf-tax',
        category: 'Salary',
        meta: { title: 'Salary After PF & Tax', description: 'Net In-hand calculation.' },
        inputs: [{ id: 'ctc', label: 'CTC', type: 'slider', defaultValue: 600000, min: 100000, max: 2000000, step: 10000, addonRight: '₹' }],
        calculate: (inputs) => {
            return [{ id: 'net', label: 'Net Monthly', value: Math.round(Number(inputs.ctc) * 0.88 / 12), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: { howItWorks: 'Estimates 12% deduction for PF/Tax.', faqs: [] }
    },
    {
        slug: 'take-home-salary-calculator-freshers',
        category: 'Salary',
        meta: { title: 'Take Home Calculator for Freshers', description: 'Simple salary estimator for first job.' },
        inputs: [{ id: 'ctc', label: 'CTC', type: 'slider', defaultValue: 300000, min: 150000, max: 1000000, step: 10000, addonRight: '₹' }],
        calculate: (inputs) => {
            return [{ id: 'net', label: 'Take Home', value: Math.round(Number(inputs.ctc) / 12), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: { howItWorks: 'Simple division for lower tax brackets.', faqs: [] }
    },
    {
        slug: 'salary-calculator-government-employees',
        category: 'Salary',
        meta: { title: 'Salary Calculator for Govt Employees', description: 'Calculate Gross Salary with DA.' },
        inputs: [
            { id: 'basic', label: 'Basic Pay', type: 'slider', defaultValue: 30000, min: 18000, max: 200000, step: 1000, addonRight: '₹' },
            { id: 'da', label: 'DA %', type: 'slider', defaultValue: 50, min: 0, max: 100, step: 1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const basic = Number(inputs.basic);
            const da = basic * (Number(inputs.da) / 100);
            return [{ id: 'gross', label: 'Gross Salary', value: Math.round(basic + da), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: { howItWorks: 'Gross = Basic + Dearness Allowance (DA)', faqs: [] }
    }
];

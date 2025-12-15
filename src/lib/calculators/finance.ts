import { CalculatorConfig } from "@/types/calculator";

// Helper for EMI Calculation
const calculateEMI = (principal: number, rate: number, tenureYears: number) => {
    const r = rate / 12 / 100;
    const n = tenureYears * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - principal;
    return { emi, totalInterest, totalAmount };
};

// Content Generator for EMI Calculators
const getEMIContent = (title: string, type: 'home' | 'car' | 'personal' | 'generic') => {
    const isHome = type === 'home';
    const isCar = type === 'car';

    // Custom FAQs based on loan type
    const specificFaqs = [];
    if (isHome) {
        specificFaqs.push(
            { question: "Can I get tax benefits on Home Loan?", answer: "Yes, under Section 80C (principal repayment) and Section 24(b) (interest payment) of the Income Tax Act." },
            { question: "What is a good Home Loan interest rate?", answer: "Rates vary by bank and repo rate, typically ranging from 8.3% to 9.5% p.a." },
            { question: "Should I choose fixed or floating rate?", answer: "Floating rates are generally lower but fluctuate. Fixed rates offer stability but are usually higher." }
        );
    } else if (isCar) {
        specificFaqs.push(
            { question: "What is the maximum tenure for a Car Loan?", answer: "Most banks maximize car loan tenure at 7 years (84 months)." },
            { question: "Does car loan affect insurance?", answer: "Yes, the vehicle is hypothecated to the bank until the loan is cleared." }
        );
    } else {
        specificFaqs.push(
            { question: "How does tenure affect EMI?", answer: "Longer tenure reduces monthly EMI but increases total interest payable. Shorter tenure increases EMI but saves interest cost." }
        );
    }

    return {
        howItWorks: `## How ${title} Works

This calculator helps you determine your **Equated Monthly Installment (EMI)** – the fixed amount you pay every month towards your loan repayment.

### EMI Formula:
\\[ E = P \\times r \\times \\frac{(1+r)^n}{(1+r)^n-1} \\]

Where:
- **E** = EMI Amount
- **P** = Principal Loan Amount
- **r** = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)
- **n** = Loan Tenure in Months

### How to use?
1. **Enter Loan Amount**: The total amount you wish to borrow.
2. **Set Interest Rate**: The annual interest rate offered by the bank.
3. **Choose Tenure**: The number of years you want to take to repay the loan.

The calculator instantly shows your **Monthly EMI**, **Total Interest Payable**, and **Total Payment** (Principal + Interest).`,
        faqs: [
            { question: "What is EMI?", answer: "EMI stands for Equated Monthly Installment. It is a fixed amount paid by a borrower to a lender at a specified date each calendar month." },
            { question: "Does a lower EMI mean cheaper loan?", answer: "Not necessarily. A lower EMI often results from a longer tenure, which means you pay more interest over time." },
            { question: "Can I prepay my loan?", answer: "Yes, most loans allow prepayment. It can significantly reduce your outstanding principal and total interest burden." },
            ...specificFaqs
        ]
    };
};

// Factory for EMI Calculators
const createEMICalculator = (slug: string, title: string, defaultRate: number, type: 'home' | 'car' | 'personal' | 'generic' = 'generic'): CalculatorConfig => ({
    slug,
    category: 'Finance',
    meta: {
        title: title,
        description: `Calculate your ${title} instantly. Get accurate monthly EMI, total interest payable, and amortization details.`
    },
    inputs: [
        { id: 'principal', label: 'Loan Amount', type: 'slider', defaultValue: 1000000, min: 10000, max: 100000000, step: 5000, addonRight: '₹' },
        { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: defaultRate, min: 1, max: 30, step: 0.1, addonRight: '%' },
        { id: 'tenure', label: 'Loan Tenure', type: 'slider', defaultValue: 10, min: 1, max: 30, step: 1, addonRight: 'Years' }
    ],
    calculate: (inputs) => {
        const { emi, totalInterest, totalAmount } = calculateEMI(Number(inputs.principal), Number(inputs.rate), Number(inputs.tenure));
        return [
            { id: 'emi', label: 'Monthly EMI', value: Math.round(emi), type: 'currency', isHighlight: true },
            { id: 'totalInterest', label: 'Total Interest', value: Math.round(totalInterest), type: 'currency' },
            { id: 'totalAmount', label: 'Total Amount', value: Math.round(totalAmount), type: 'currency' }
        ];
    },
    chartType: 'pie',
    content: getEMIContent(title, type)
});

export const financeCalculators: CalculatorConfig[] = [
    // --- Core Calculators ---
    createEMICalculator('emi-calculator', 'EMI Calculator - Home/Car/Personal', 8.5, 'generic'),
    createEMICalculator('home-loan-emi-calculator', 'Home Loan EMI Calculator', 8.5, 'home'),
    createEMICalculator('car-loan-emi-calculator', 'Car Loan EMI Calculator', 9.5, 'car'),
    createEMICalculator('personal-loan-emi-calculator', 'Personal Loan EMI Calculator', 11, 'personal'),

    // Loan Interest Calculator
    {
        slug: 'loan-interest-calculator',
        category: 'Finance',
        meta: { title: 'Loan Interest Calculator', description: 'Calculate total interest payable on your loan to plan repayments better.' },
        inputs: [
            { id: 'principal', label: 'Loan Amount', type: 'slider', defaultValue: 500000, min: 10000, max: 10000000, step: 5000, addonRight: '₹' },
            { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 10, min: 1, max: 30, step: 0.1, addonRight: '%' },
            { id: 'tenure', label: 'Tenure', type: 'slider', defaultValue: 5, min: 1, max: 30, step: 1, addonRight: 'Years' }
        ],
        calculate: (inputs) => {
            const { emi, totalInterest, totalAmount } = calculateEMI(Number(inputs.principal), Number(inputs.rate), Number(inputs.tenure));
            return [
                { id: 'interest', label: 'Total Interest', value: Math.round(totalInterest), type: 'currency', isHighlight: true },
                { id: 'principal', label: 'Principal', value: Math.round(Number(inputs.principal)), type: 'currency' },
                { id: 'total', label: 'Total Repayment', value: Math.round(totalAmount), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## Understanding Loan Interest

Interest is the cost of borrowing money. This calculator helps you separate the interest component from your total repayment.

### How it Works:
1. Input your **Principal Loan Amount**.
2. Enter the **Annual Interest Rate**.
3. Select the **Tenure** in years.

The calculator uses the EMI formula to determine the total interest payable over the life of the loan.

### Key Insight:
A longer tenure reduces your monthly EMI but **drastically increases the total interest** you pay. Use this tool to find the sweet spot between affordable EMI and lowest interest cost.`,
            faqs: [
                { question: "How is interest calculated?", answer: "Interest is calculated on the reducing balance of your principal amount each month." },
                { question: "How can I reduce my interest burden?", answer: "Opt for a shorter tenure, negotiate a lower interest rate, or make prepayments to reduce the principal." }
            ]
        }
    },

    // SIP
    {
        slug: 'sip-calculator',
        category: 'Finance',
        meta: { title: 'SIP Calculator', description: 'Calculate the future value of your Systematic Investment Plan (SIP) investments.' },
        inputs: [
            { id: 'investment', label: 'Monthly Investment', type: 'slider', defaultValue: 5000, min: 500, max: 100000, step: 500, addonRight: '₹' },
            { id: 'rate', label: 'Expected Return', type: 'slider', defaultValue: 12, min: 1, max: 30, step: 0.5, addonRight: '%' },
            { id: 'years', label: 'Time Period', type: 'slider', defaultValue: 10, min: 1, max: 40, step: 1, addonRight: 'Years' }
        ],
        calculate: (inputs) => {
            const p = Number(inputs.investment);
            const i = Number(inputs.rate) / 100 / 12;
            const n = Number(inputs.years) * 12;
            const val = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            const invested = p * n;
            return [
                { id: 'totalValue', label: 'Total Value', value: Math.round(val), type: 'currency', isHighlight: true },
                { id: 'investedAmount', label: 'Invested Amount', value: Math.round(invested), type: 'currency' },
                { id: 'estReturns', label: 'Est. Returns', value: Math.round(val - invested), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## Power of SIP Compounding

A Systematic Investment Plan (SIP) allows you to invest small amounts regularly in mutual funds.

### Formula Used:
\\[ FV = P \\times \\frac{(1+i)^n - 1}{i} \\times (1+i) \\]
Where:
- **FV** = Future Value
- **P** = Monthly Investment Amount
- **i** = Monthly Rate of Return
- **n** = Total Number of Months

### Why SIP?
1. **Rupee Cost Averaging**: You buy more units when market is low and fewer when high.
2. **Compounding**: Returns on your returns accelerate wealth creation over time.
3. **Discipline**: Enforces a saving habit.`,
            faqs: [
                { question: "What is a good return rate for SIP?", answer: "Equity mutual funds typically deliver 12-15% returns over the long term (10+ years), though past performance doesn't guarantee future results." },
                { question: "Is SIP taxable?", answer: "Equity SIPs held for >1 year have LTCG tax of 10% on gains exceeding ₹1 Lakh. Short term (<1 year) gains are taxed at 15%." },
                { question: "Can I increase my SIP amount?", answer: "Yes, you can step-up your SIP amount annually to reach your goals faster." }
            ]
        }
    },

    // FD
    {
        slug: 'fd-calculator',
        category: 'Finance',
        meta: { title: 'FD Calculator', description: 'Calculate the maturity amount and interest earned on your Fixed Deposits.' },
        inputs: [
            { id: 'investment', label: 'Total Investment', type: 'slider', defaultValue: 100000, min: 10000, max: 10000000, step: 5000, addonRight: '₹' },
            { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 6.5, min: 3, max: 15, step: 0.1, addonRight: '%' },
            { id: 'years', label: 'Time Period', type: 'slider', defaultValue: 5, min: 1, max: 20, step: 1, addonRight: 'Years' }
        ],
        calculate: (inputs) => {
            const P = Number(inputs.investment);
            const r = Number(inputs.rate) / 100;
            const n = 4; // Quarterly compounding is standard for Indian FDs
            const t = Number(inputs.years);
            const A = P * Math.pow(1 + r / n, n * t);
            return [
                { id: 'maturity', label: 'Maturity Amount', value: Math.round(A), type: 'currency', isHighlight: true },
                { id: 'invested', label: 'Invested Amount', value: Math.round(P), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## Fixed Deposit Calculation

Fixed Deposits (FDs) offer guaranteed returns with low risk. In India, FD interest is typically **compounded quarterly**.

### Formula:
\\[ A = P \\times (1 + \\frac{r}{n})^{n \\times t} \\]
Where:
- **A** = Maturity Amount
- **P** = Principal Investment
- **r** = Annual Interest Rate
- **n** = Compounding Frequency (4 for quarterly)
- **t** = Time in Years

This calculator assumes quarterly compounding, which allows your interest to earn further interest every 3 months.`,
            faqs: [
                { question: "Is FD interest taxable?", answer: "Yes, interest earned is added to your income and taxed as per your slab. TDS is deducted if interest exceeds ₹40k/year (₹50k for seniors)." },
                { question: "Do senior citizens get extra interest?", answer: "Yes, most banks offer an additional 0.50% interest rate to senior citizens." },
                { question: "Can I withdraw FD before maturity?", answer: "Yes, but you may face a penalty (usually 0.5% - 1%) on the interest rate." }
            ]
        }
    },

    // RD
    {
        slug: 'rd-calculator',
        category: 'Finance',
        meta: { title: 'RD Calculator', description: 'Calculate the maturity value of your Recurring Deposit (RD) investments.' },
        inputs: [
            { id: 'investment', label: 'Monthly Deposit', type: 'slider', defaultValue: 5000, min: 500, max: 100000, step: 500, addonRight: '₹' },
            { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 6.5, min: 3, max: 15, step: 0.1, addonRight: '%' },
            { id: 'years', label: 'Time Period', type: 'slider', defaultValue: 5, min: 1, max: 10, step: 1, addonRight: 'Years' }
        ],
        calculate: (inputs) => {
            const P = Number(inputs.investment);
            const i = Number(inputs.rate) / 100 / 12;
            const n = Number(inputs.years) * 12;
            const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            return [
                { id: 'maturity', label: 'Maturity Value', value: Math.round(M), type: 'currency', isHighlight: true },
                { id: 'totalDeposit', label: 'Total Deposit', value: Math.round(P * n), type: 'currency' },
                { id: 'interest', label: 'Interest Earned', value: Math.round(M - (P * n)), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## Recurring Deposit Calculation

Recurring Deposits (RD) let you save a fixed amount every month while earning FD-like interest rates.

### How it Works
Unlike FDs where you invest once, in RD you invest monthly. Interest is calculated on each installment for the period it remains with the bank.

**Key Features:**
- Disciplined monthly savings
- Guaranteed returns
- Interest rates similar to Fixed Deposits

This calculator estimates your maturity value based on monthly compounding logic commonly used for easy estimation.`,
            faqs: [
                { question: "Is RD TDS applicable?", answer: "Yes, TDS on RD interest is applicable similar to FDs if interest exceeds the threshold." },
                { question: "Can I miss an installment?", answer: "Banks may charge a penalty/late fee for missing RD installments." }
            ]
        }
    },

    // Credit Card EMI
    createEMICalculator('credit-card-emi-calculator', 'Credit Card EMI Calculator', 16, 'generic'),

    // Used Bike
    createEMICalculator('used-bike-emi-calculator', 'Used Bike EMI Calculator', 14, 'generic'),

    // Gold Loan
    createEMICalculator('gold-loan-emi-calculator', 'Gold Loan EMI Calculator', 7.5, 'generic'),

    // Education Loan
    createEMICalculator('education-loan-emi-calculator', 'Education Loan EMI Calculator', 10, 'generic'),

    // Business Loan EMI
    createEMICalculator('business-loan-emi-calculator', 'Business Loan EMI Calculator', 12, 'generic'),

    // --- Long Tail Variants ---
    createEMICalculator('emi-calculator-prepayment', 'EMI Calculator with Prepayment', 8.5, 'generic'),
    createEMICalculator('emi-calculator-gst', 'EMI Calculator with GST', 9, 'generic'),
    createEMICalculator('emi-calculator-low-cibil', 'EMI Calculator for Low CIBIL', 14, 'generic'),
    createEMICalculator('emi-calculator-self-employed', 'EMI Calculator for Self-Employed', 11, 'generic'),
    createEMICalculator('emi-calculator-nbfc-loans', 'EMI Calculator for NBFC Loans', 13, 'generic'),

    // Lump Sum Calculator
    {
        slug: 'lumpsum-calculator',
        category: 'Finance',
        meta: { title: 'Lump Sum Calculator', description: 'Calculate returns on your one-time mutual fund investment.' },
        inputs: [
            { id: 'invested', label: 'Investment', type: 'slider', defaultValue: 100000, min: 5000, max: 10000000, step: 5000, addonRight: '₹' },
            { id: 'rate', label: 'Expected Return', type: 'slider', defaultValue: 12, min: 1, max: 30, step: 0.1, addonRight: '%' },
            { id: 'years', label: 'Time Period', type: 'slider', defaultValue: 10, min: 1, max: 40, step: 1, addonRight: 'Ys' }
        ],
        calculate: (inputs) => {
            const P = Number(inputs.invested);
            const r = Number(inputs.rate) / 100;
            const n = Number(inputs.years);
            const FV = P * Math.pow((1 + r), n);
            return [
                { id: 'total', label: 'Maturity Value', value: Math.round(FV), type: 'currency', isHighlight: true },
                { id: 'gain', label: 'Wealth Gained', value: Math.round(FV - P), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## Lumpsum Investment Growth

A lumpsum investment is a single, one-time payment. This calculator shows how your money grows via compounding.

### Formula:
\\[ FV = P \\times (1 + r)^n \\]

Even a small difference in return rate \`r\` can make a huge difference over \`n\` years due to caching.

### Strategy
Lumpsum investments are best when markets are low (undervalued), whereas SIP is better for volatile markets.`,
            faqs: [
                { question: "Is Lumpsum better than SIP?", answer: "Lumpsum works best when you have a large corpus and markets are rising. SIP is safer for minimizing risk." },
                { question: "Where should I invest lumpsum money?", answer: "Depends on your goal: Debt funds for short term, Equity funds for long term (>5 years) wealth creation." }
            ]
        }
    },
    // PPF Calculator
    {
        slug: 'ppf-calculator',
        category: 'Finance',
        meta: { title: 'PPF Calculator', description: 'Calculate returns on your Public Provident Fund (PPF) investment.' },
        inputs: [
            { id: 'deposit', label: 'Yearly Deposit', type: 'slider', defaultValue: 100000, min: 500, max: 150000, step: 500, addonRight: '₹' },
            { id: 'years', label: 'Duration', type: 'slider', defaultValue: 15, min: 15, max: 50, step: 1, addonRight: 'Ys' },
            { id: 'rate', label: 'Interest Rate', type: 'slider', defaultValue: 7.1, min: 5, max: 10, step: 0.1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const P = Number(inputs.deposit);
            const n = Number(inputs.years);
            const i = Number(inputs.rate) / 100;
            const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            return [
                { id: 'maturity', label: 'Maturity Amount', value: Math.round(M), type: 'currency', isHighlight: true },
                { id: 'invested', label: 'Total Invested', value: P * n, type: 'currency' },
                { id: 'interest', label: 'Total Interest', value: Math.round(M - (P * n)), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## Public Provident Fund (PPF)

PPF is a government-backed long-term savings scheme with **EEE (Exempt-Exempt-Exempt)** tax status.

### Features
- **Tenure**: 15 Years (extendable in blocks of 5 years).
- **Limit**: Max ₹1.5 Lakh per financial year.
- **Tax Benefit**: Deposits deductible u/s 80C. Interest and Maturity amount are tax-free!

### Calculation
Uses the compounding formula for annual deposits.`,
            faqs: [
                { question: "Is PPF interest rate fixed?", answer: "No, the government revises PPF interest rates every quarter. Currently, it is around 7.1%." },
                { question: "Can I withdraw before 15 years?", answer: "Partial withdrawals are allowed from the 7th financial year." },
                { question: "Is PPF risk-free?", answer: "Yes, it is backed by the Government of India, making it one of the safest investments." }
            ]
        }
    },
    // NPS Calculator
    {
        slug: 'nps-calculator',
        category: 'Finance',
        meta: { title: 'NPS Calculator', description: 'Plan your retirement with the National Pension System (NPS) value estimator.' },
        inputs: [
            { id: 'monthly', label: 'Monthly Investment', type: 'slider', defaultValue: 5000, min: 500, max: 100000, step: 500, addonRight: '₹' },
            { id: 'rate', label: 'Expected Return', type: 'slider', defaultValue: 10, min: 5, max: 20, step: 0.5, addonRight: '%' },
            { id: 'age', label: 'Current Age', type: 'slider', defaultValue: 25, min: 18, max: 60, step: 1, addonRight: 'Ys' }
        ],
        calculate: (inputs) => {
            const P = Number(inputs.monthly);
            const r = Number(inputs.rate) / 100 / 12;
            const years = 60 - Number(inputs.age);
            const n = years * 12;
            const FV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
            return [
                { id: 'corpus', label: 'Total Corpus', value: Math.round(FV), type: 'currency', isHighlight: true },
                { id: 'invested', label: 'Invested', value: P * n, type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## National Pension System (NPS)

NPS is a voluntary retirement savings scheme designed to enable systematic savings.

### How it Helps
- **Market Linked Returns**: Option to invest in Equity (E), Corporate Bonds (C), and Govt Securities (G).
- **Tax Benefits**: Additional deduction of ₹50,000 u/s 80CCD(1B) over and above 80C.
- **Low Cost**: One of the lowest cost pension management schemes in the world.

This calculator projects your corpus at age 60 based on your monthly contribution.`,
            faqs: [
                { question: "Is the entire NPS corpus tax-free?", answer: "At maturity (age 60), you can withdraw 60% of the corpus tax-free. The remaining 40% must be used to buy an annuity." },
                { question: "Can I withdraw NPS before 60?", answer: "Partial withdrawal (up to 25% of own contribution) is allowed for specific reasons like illness, marriage, or housing after 3 years." }
            ]
        }
    },
    // Simple Interest
    {
        slug: 'simple-interest-calculator',
        category: 'Finance',
        meta: { title: 'Simple Interest Calculator', description: 'Basic interest calculation for loans or savings.' },
        inputs: [
            { id: 'principal', label: 'Principal', type: 'slider', defaultValue: 10000, min: 100, max: 1000000, step: 100, addonRight: '₹' },
            { id: 'rate', label: 'Rate (p.a)', type: 'slider', defaultValue: 5, min: 1, max: 50, step: 0.5, addonRight: '%' },
            { id: 'time', label: 'Time', type: 'slider', defaultValue: 2, min: 1, max: 30, step: 1, addonRight: 'Ys' }
        ],
        calculate: (inputs) => {
            const P = Number(inputs.principal);
            const R = Number(inputs.rate);
            const T = Number(inputs.time);
            const SI = (P * R * T) / 100;
            return [
                { id: 'si', label: 'Interest', value: Math.round(SI), type: 'currency', isHighlight: true },
                { id: 'total', label: 'Total Amount', value: Math.round(P + SI), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## Simple Interest Formula

Simple Interest is calculated only on the principal amount, ignoring any previously earned interest.

### Formula:
\\[ SI = \\frac{P \\times R \\times T}{100} \\]

Where:
- **P** = Principal Amount
- **R** = Annual Interest Rate %
- **T** = Time in Years

### Total Amount:
\\[ A = P + SI \\]`,
            faqs: [
                { question: "Where is simple interest used?", answer: "It is often used for short-term loans, car loans by some dealers, or informal lending." },
                { question: "How differs from Compound Interest?", answer: "SI is linear growth calculation. CI is exponential growth because interest earns interest." }
            ]
        }
    },
    // Compound Interest
    {
        slug: 'compound-interest-calculator',
        category: 'Finance',
        meta: { title: 'Compound Interest Calculator', description: 'See how your money grows exponentially with compounding.' },
        inputs: [
            { id: 'principal', label: 'Principal', type: 'slider', defaultValue: 10000, min: 100, max: 1000000, step: 100, addonRight: '₹' },
            { id: 'rate', label: 'Rate (p.a)', type: 'slider', defaultValue: 10, min: 1, max: 50, step: 0.5, addonRight: '%' },
            { id: 'time', label: 'Time', type: 'slider', defaultValue: 5, min: 1, max: 30, step: 1, addonRight: 'Ys' }
        ],
        calculate: (inputs) => {
            const P = Number(inputs.principal);
            const r = Number(inputs.rate) / 100;
            const t = Number(inputs.time);
            const A = P * Math.pow((1 + r), t);
            return [
                { id: 'ci', label: 'Compound Interest', value: Math.round(A - P), type: 'currency', isHighlight: true },
                { id: 'total', label: 'Total Amount', value: Math.round(A), type: 'currency' }
            ];
        },
        chartType: 'pie',
        content: {
            howItWorks: `## Eighth Wonder of the World

Compound Interest is when you earn interest on both your initial principal and the accumulated interest from previous periods.

### Formula:
\\[ A = P(1 + r)^t \\]

Where:
- **A** = Final Amount
- **P** = Principal
- **r** = Annual Interest Rate
- **t** = Time in Years

This simple formula is the secret behind massive wealth creation over long periods.`,
            faqs: [
                { question: "Frequency of compounding?", answer: "This calculator assumes annual compounding. More frequent compounding (monthly/daily) yields even higher returns." },
                { question: "Rule of 72?", answer: "A shortcut to estimate doubling time. Years to double = 72 ÷ Interest Rate." }
            ]
        }
    }
];

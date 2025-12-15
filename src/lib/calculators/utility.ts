import { CalculatorConfig } from "@/types/calculator";

export const utilityCalculators: CalculatorConfig[] = [
    // Age
    {
        slug: 'age-calculator',
        category: 'Utility',
        meta: { title: 'Age Calculator', description: 'Calculate your exact age in years.' },
        inputs: [{ id: 'year', label: 'Birth Year', type: 'slider', defaultValue: 2000, min: 1900, max: 2025, step: 1, addonRight: '' }],
        calculate: (inputs) => {
            const age = new Date().getFullYear() - Number(inputs.year);
            return [{ id: 'age', label: 'Age', value: age, type: 'number', isHighlight: true, addonRight: 'Years' }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Age Calculation

Calculates age based on the current year.

\\[ \\text{Age} = \\text{Current Year} - \\text{Birth Year} \\]

Note: This simple calculator uses only the year. For exact day precision, use a Date Difference Calculator.`,
            faqs: []
        }
    },

    // Date Difference (Real)
    {
        slug: 'date-difference-calculator',
        category: 'Utility',
        meta: { title: 'Date Difference Calculator', description: 'Calculate days between two dates.' },
        inputs: [
            { id: 'start', label: 'Start Date', type: 'date', defaultValue: new Date().toISOString().split('T')[0] },
            { id: 'end', label: 'End Date', type: 'date', defaultValue: new Date(Date.now() + 864000000).toISOString().split('T')[0] } // +10 days approx
        ],
        calculate: (inputs) => {
            const d1 = new Date(String(inputs.start));
            const d2 = new Date(String(inputs.end));
            const diffTime = Math.abs(d2.getTime() - d1.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return [{ id: 'diff', label: 'Duration', value: diffDays, type: 'text', isHighlight: true, addonRight: 'Days' }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Days Calculation

Calculates the absolute difference in days between two Gregorian calendar dates. It accounts for leap years.`,
            faqs: []
        }
    },

    // Time Duration
    {
        slug: 'time-duration-calculator',
        category: 'Utility',
        meta: { title: 'Time Duration Calculator', description: 'Convert Minutes to Hours and Minutes.' },
        inputs: [{ id: 'min', label: 'Total Minutes', type: 'slider', defaultValue: 125, min: 0, max: 1000, step: 1, addonRight: 'm' }],
        calculate: (inputs) => {
            const m = Number(inputs.min);
            const hrs = Math.floor(m / 60);
            const mins = m % 60;
            return [{ id: 'res', label: 'Duration', value: `${hrs}h ${mins}m`, type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Time Conversion

Converts total minutes into a readable Hour:Minute format.

\\[ \\text{Hours} = \\lfloor \\text{Minutes} / 60 \\rfloor \\]
\\[ \\text{Rem. Minutes} = \\text{Minutes} \\% 60 \\]`,
            faqs: []
        }
    },

    // Percentage
    {
        slug: 'percentage-calculator',
        category: 'Utility',
        meta: { title: 'Percentage Calculator', description: 'Calculate percentage of a number.' },
        inputs: [
            { id: 'part', label: 'Part', type: 'slider', defaultValue: 20, min: 0, max: 1000, step: 1, addonRight: '' },
            { id: 'whole', label: 'Whole', type: 'slider', defaultValue: 100, min: 1, max: 1000, step: 1, addonRight: '' }
        ],
        calculate: (inputs) => {
            return [{ id: 'pct', label: 'Result', value: ((Number(inputs.part) / Number(inputs.whole)) * 100).toFixed(1), type: 'percent', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Percentage Formula

\\[ \\text{Percentage} = (\\frac{\\text{Part}}{\\text{Whole}}) \\times 100 \\]`,
            faqs: []
        }
    },

    // Average
    {
        slug: 'average-calculator',
        category: 'Utility',
        meta: { title: 'Average Calculator', description: 'Find the mean of two numbers.' },
        inputs: [
            { id: 'a', label: 'Number A', type: 'slider', defaultValue: 10, min: 0, max: 100, step: 1, addonRight: '' },
            { id: 'b', label: 'Number B', type: 'slider', defaultValue: 20, min: 0, max: 100, step: 1, addonRight: '' }
        ],
        calculate: (inputs) => {
            return [{ id: 'avg', label: 'Average', value: (Number(inputs.a) + Number(inputs.b)) / 2, type: 'number', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Arithmetic Mean

\\[ \\text{Average} = \\frac{A + B}{2} \\]`,
            faqs: []
        }
    },

    // Fuel Cost
    {
        slug: 'fuel-cost-calculator',
        category: 'Utility',
        meta: { title: 'Fuel Cost Calculator', description: 'Estimate trip cost based on mileage.' },
        inputs: [
            { id: 'dist', label: 'Distance', type: 'slider', defaultValue: 100, min: 1, max: 1000, step: 10, addonRight: 'km' },
            { id: 'mil', label: 'Vehicle Mileage', type: 'slider', defaultValue: 15, min: 5, max: 40, step: 1, addonRight: 'km/l' },
            { id: 'price', label: 'Fuel Price', type: 'slider', defaultValue: 100, min: 50, max: 150, step: 1, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            return [{ id: 'cost', label: 'Trip Cost', value: Math.round((Number(inputs.dist) / Number(inputs.mil)) * Number(inputs.price)), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Trip Cost Formula

\\[ \\text{Fuel Needed} = \\frac{\\text{Distance}}{\\text{Mileage}} \\]
\\[ \\text{Total Cost} = \\text{Fuel Needed} \\times \\text{Price/Liter} \\]`,
            faqs: []
        }
    },

    // Electricity Bill
    {
        slug: 'electricity-bill-calculator',
        category: 'Utility',
        meta: { title: 'Electricity Bill Calculator', description: 'Estimate monthly electricity bill.' },
        inputs: [
            { id: 'units', label: 'Units Consumed', type: 'slider', defaultValue: 200, min: 10, max: 1000, step: 10, addonRight: 'kWh' },
            { id: 'rate', label: 'Rate per Unit', type: 'slider', defaultValue: 8, min: 1, max: 20, step: 0.5, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            return [{ id: 'bill', label: 'Estimated Bill', value: Math.round(Number(inputs.units) * Number(inputs.rate)), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Electricity Cost

\\[ \\text{Bill} = \\text{Units (kWh)} \\times \\text{Rate per Unit} \\]

Note: Actual bills often include fixed charges and taxes not calculated here.`,
            faqs: []
        }
    },

    // Internet Speed
    {
        slug: 'internet-speed-calculator',
        category: 'Utility',
        meta: { title: 'Internet Speed Calculator', description: 'Calculate download time for a file.' },
        inputs: [
            { id: 'size', label: 'File Size', type: 'slider', defaultValue: 1, min: 1, max: 100, step: 1, addonRight: 'GB' },
            { id: 'speed', label: 'Internet Speed', type: 'slider', defaultValue: 50, min: 1, max: 500, step: 5, addonRight: 'Mbps' }
        ],
        calculate: (inputs) => {
            const sizeGb = Number(inputs.size);
            const speedMbps = Number(inputs.speed);

            // 1 GB = 1024 MB = 8192 Megabits
            const totalMegabits = sizeGb * 1024 * 8;
            const seconds = totalMegabits / speedMbps;

            const mins = Math.floor(seconds / 60);
            const secs = Math.round(seconds % 60);

            return [{ id: 'time', label: 'Time Est.', value: `${mins}m ${secs}s`, type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Bandwidth vs Speed

Internet speed is usually measured in **Megabits per second (Mbps)**, while file sizes are in **Megabytes (MB)** or Gigabytes (GB).

\\[ 1 \\text{ Byte} = 8 \\text{ bits} \\]

To download 1 GB (8192 Megabits) at 10 Mbps:
Time = 8192 / 10 = 819.2 seconds.`,
            faqs: []
        }
    },

    // Unit Converter (km to miles)
    {
        slug: 'unit-converter',
        category: 'Utility',
        meta: { title: 'Unit Converter (km to miles)', description: 'Convert Kilometers to Miles.' },
        inputs: [{ id: 'km', label: 'Kilometers', type: 'slider', defaultValue: 10, min: 1, max: 1000, step: 1, addonRight: 'km' }],
        calculate: (inputs) => {
            return [{ id: 'miles', label: 'Miles', value: (Number(inputs.km) * 0.621371).toFixed(2), type: 'number', isHighlight: true, addonRight: 'mi' }];
        },
        chartType: 'none',
        content: { howItWorks: '1 km ≈ 0.621371 miles', faqs: [] }
    },



    // Number to Word
    {
        slug: 'number-to-word-converter',
        category: 'Utility',
        meta: { title: 'Number to Word Converter', description: 'Convert number to words (Indian System).' },
        inputs: [{ id: 'num', label: 'Number', type: 'number', defaultValue: 1550, min: 1, max: 999999999, step: 1, addonRight: '' }],
        calculate: (inputs) => {
            const num = Number(inputs.num);
            const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
            const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

            const inWords = (n: number): string => {
                const numStr = n.toString();
                if (numStr.length > 9) return 'Limit Exceeded';

                // Regex for Indian comma system grouping: e.g. 12,34,56,789
                // Groups: Crore(2), Lakh(2), Thousand(2), Hundred(1), Rest(2)
                // Need to pad to 9 digits: 001550 -> 00,00,01,5,50
                const n_array = ('000000000' + numStr).slice(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                if (!n_array) return '';

                const getVal = (idx: number) => {
                    const val = Number(n_array[idx]);
                    if (val === 0) return '';
                    if (val < 20) return (a[val] || '');
                    const tens = Math.floor(val / 10);
                    const units = val % 10;
                    return (b[tens] || '') + ' ' + (a[units] || '');
                };

                let str = '';
                str += getVal(1) ? getVal(1) + 'crore ' : '';
                str += getVal(2) ? getVal(2) + 'lakh ' : '';
                str += getVal(3) ? getVal(3) + 'thousand ' : '';
                str += getVal(4) ? getVal(4) + 'hundred ' : '';

                if (getVal(5)) {
                    str += (str !== '') ? 'and ' : '';
                    str += getVal(5);
                }

                return str.trim();
            };

            return [{ id: 'word', label: 'In Words', value: num === 0 ? 'Zero' : inWords(num) + ' only', type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Indian Numbering System

Converts numbers into Lakhs and Crores format.
- 1,00,00,000 = One Crore`,
            faqs: []
        }
    },

    // EMI vs Rent
    {
        slug: 'emi-vs-rent-calculator',
        category: 'Utility',
        meta: { title: 'EMI vs Rent Calculator', description: 'Simple comparison of monthly outflow.' },
        inputs: [
            { id: 'emi', label: 'Potential EMI', type: 'slider', defaultValue: 30000, min: 5000, max: 100000, step: 1000, addonRight: '₹' },
            { id: 'rent', label: 'Current Rent', type: 'slider', defaultValue: 20000, min: 5000, max: 100000, step: 1000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const emi = Number(inputs.emi);
            const rent = Number(inputs.rent);
            const diff = emi - rent;
            return [{ id: 'diff', label: 'Extra Monthly Cost for Home', value: Math.round(diff), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Buy vs Rent Check

This tool compares raw monthly cash outflow.
If **EMI > Rent**, you pay more monthly to own the asset.
Note: This doesn't account for property appreciation, tax benefits, or maintenance costs.`,
            faqs: []
        }
    },

    // Commission
    {
        slug: 'commission-calculator',
        category: 'Utility',
        meta: { title: 'Commission Calculator', description: 'Calculate sales commission.' },
        inputs: [
            { id: 'sale', label: 'Sale Amount', type: 'slider', defaultValue: 50000, min: 1000, max: 1000000, step: 1000, addonRight: '₹' },
            { id: 'rate', label: 'Commission Rate', type: 'slider', defaultValue: 5, min: 0.1, max: 50, step: 0.1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            return [{ id: 'comm', label: 'Commission', value: Math.round(Number(inputs.sale) * Number(inputs.rate) / 100), type: 'currency', isHighlight: true }];
        },
        chartType: 'none',
        content: { howItWorks: 'Sale Amount * Rate %', faqs: [] }
    },
    // Sales Tax
    {
        slug: 'sales-tax-calculator',
        category: 'Utility',
        meta: { title: 'Sales Tax Calculator', description: 'Add tax to net price.' },
        inputs: [
            { id: 'net', label: 'Net Price', type: 'slider', defaultValue: 1000, min: 10, max: 100000, step: 10, addonRight: '₹' },
            { id: 'tax', label: 'Tax Rate', type: 'slider', defaultValue: 18, min: 0, max: 50, step: 0.1, addonRight: '%' }
        ],
        calculate: (inputs) => {
            const net = Number(inputs.net);
            const tax = Number(inputs.tax);
            const taxAmt = net * (tax / 100);
            return [
                { id: 'gross', label: 'Gross Price', value: Math.round(net + taxAmt), type: 'currency', isHighlight: true },
                { id: 'tax', label: 'Tax Amount', value: Math.round(taxAmt), type: 'currency' }
            ];
        },
        chartType: 'none',
        content: { howItWorks: 'Net Price + (Net * Tax%)', faqs: [] }
    },
    // Tip Calculator
    {
        slug: 'tip-calculator',
        category: 'Utility',
        meta: { title: 'Tip Calculator', description: 'Split bill and calculate tips.' },
        inputs: [
            { id: 'bill', label: 'Bill Amount', type: 'slider', defaultValue: 2000, min: 100, max: 50000, step: 100, addonRight: '₹' },
            { id: 'tip', label: 'Tip %', type: 'slider', defaultValue: 10, min: 0, max: 30, step: 1, addonRight: '%' },
            { id: 'split', label: 'Split (People)', type: 'slider', defaultValue: 1, min: 1, max: 20, step: 1, addonRight: '' }
        ],
        calculate: (inputs) => {
            const bill = Number(inputs.bill);
            const tipVal = bill * (Number(inputs.tip) / 100);
            const total = bill + tipVal;
            const split = Number(inputs.split);
            return [
                { id: 'per', label: 'Per Person', value: Math.round(total / split), type: 'currency', isHighlight: true },
                { id: 'total', label: 'Total Bill', value: Math.round(total), type: 'currency' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Tipping Guide

Calculates total bill including tip and splits it equally.

\\[ \\text{Total} = \\text{Bill} + (\\text{Bill} \\times \\text{Tip \\%}) \\]
\\[ \\text{Per Person} = \\text{Total} / \\text{People} \\]`,
            faqs: []
        }
    },
    // Salary Hike
    {
        slug: 'salary-hike-calculator',
        category: 'Utility',
        meta: { title: 'Salary Hike Calculator', description: 'Calculate percentage hike on salary.' },
        inputs: [
            { id: 'old', label: 'Current Salary', type: 'slider', defaultValue: 50000, min: 10000, max: 500000, step: 1000, addonRight: '₹' },
            { id: 'new', label: 'New Salary', type: 'slider', defaultValue: 60000, min: 10000, max: 600000, step: 1000, addonRight: '₹' }
        ],
        calculate: (inputs) => {
            const o = Number(inputs.old);
            const n = Number(inputs.new);
            const hike = ((n - o) / o) * 100;
            return [{ id: 'hike', label: 'Hike Percentage', value: hike.toFixed(2), type: 'percent', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Hike Percentage

\\[ \\text{Hike \\%} = \\frac{\\text{New Salary} - \\text{Old Salary}}{\\text{Old Salary}} \\times 100 \\]`,
            faqs: []
        }
    },
    // Alphabet Calculator
    {
        slug: 'alphabet-calculator',
        category: 'Utility',
        meta: { title: 'Alphabet Calculator (A1Z26)', description: 'Convert text to numbers (A=1, B=2...).' },
        inputs: [{ id: 'text', label: 'Enter Text', type: 'text', defaultValue: 'HELLO WORLD' }],
        calculate: (inputs) => {
            const text = String(inputs.text || '').toUpperCase();
            const result = text.split('').map(char => {
                const code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    return code - 64; // A=65 -> 1
                }
                return char;
            }).join(' ');
            return [{ id: 'res', label: 'Result', value: result, type: 'text', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### A1Z26 Cipher
Converts each letter to its position in the alphabet.
- A = 1
- B = 2
- Z = 26
Non-letter characters are left unchanged.`,
            faqs: []
        }
    }
];

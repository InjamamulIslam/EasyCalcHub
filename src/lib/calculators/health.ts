import { CalculatorConfig } from "@/types/calculator";

export const healthCalculators: CalculatorConfig[] = [
    // BMI
    {
        slug: 'bmi-calculator',
        category: 'Health',
        meta: { title: 'BMI Calculator', description: 'Calculate Body Mass Index to check if you are Underweight, Normal, or Overweight.' },
        inputs: [
            { id: 'weight', label: 'Weight', type: 'slider', defaultValue: 70, min: 30, max: 200, step: 1, addonRight: 'kg' },
            { id: 'height', label: 'Height', type: 'slider', defaultValue: 170, min: 100, max: 250, step: 1, addonRight: 'cm' }
        ],
        calculate: (inputs) => {
            const w = Number(inputs.weight);
            const h = Number(inputs.height) / 100;
            const bmi = w / (h * h);

            let status = 'Normal';
            if (bmi < 18.5) status = 'Underweight';
            else if (bmi >= 25 && bmi < 29.9) status = 'Overweight';
            else if (bmi >= 30) status = 'Obese';

            return [
                { id: 'bmi', label: 'Your BMI', value: bmi.toFixed(1), type: 'number', isHighlight: true },
                { id: 'status', label: 'Status', value: status, type: 'text' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Body Mass Index (BMI)

BMI is a simple screening tool to identify possible weight problems for adults.

### Formula:
\\[ BMI = \\frac{\\text{Weight (kg)}}{(\\text{Height (m)})^2} \\]

### Categories:
- **Below 18.5**: Underweight
- **18.5 – 24.9**: Healthy Weight
- **25.0 – 29.9**: Overweight
- **30.0 and Above**: Obesity`,
            faqs: [
                { question: "Is BMI accurate for everyone?", answer: "No, BMI does not distinguish between muscle and fat. Athletes may have high BMI but low body fat." },
                { question: "What is a healthy BMI?", answer: "A BMI between 18.5 and 24.9 is considered healthy for most adults." }
            ]
        }
    },

    // BMR
    {
        slug: 'bmr-calculator',
        category: 'Health',
        meta: { title: 'BMR Calculator', description: 'Calculate Basal Metabolic Rate - calories burned at rest.' },
        inputs: [
            { id: 'weight', label: 'Weight', type: 'slider', defaultValue: 70, min: 30, max: 200, step: 1, addonRight: 'kg' }
        ],
        calculate: (inputs) => {
            // Very simple BMR est: Weight * 24
            return [{ id: 'bmr', label: 'BMR (Calories/Day)', value: Math.round(Number(inputs.weight) * 24), type: 'number', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Basal Metabolic Rate (BMR)

BMR is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions like breathing, circulation, and cell production.
Think of it as the calories you would burn if you stayed in bed all day.

### Simplified Estimate:
\\[ BMR \\approx \\text{Weight (kg)} \\times 24 \\text{ hours} \\]`,
            faqs: [
                { question: "Does BMR decrease with age?", answer: "Yes, as muscle mass tends to decrease with age, BMR also slows down." }
            ]
        }
    },

    // Calorie Intake
    {
        slug: 'calorie-intake-calculator',
        category: 'Health',
        meta: { title: 'Calorie Intake Calculator', description: 'Estimate daily calories needed to maintain weight.' },
        inputs: [{ id: 'weight', label: 'Weight', type: 'slider', defaultValue: 70, min: 30, max: 200, step: 1, addonRight: 'kg' }],
        calculate: (inputs) => {
            return [{ id: 'cal', label: 'Daily Calories', value: Math.round(Number(inputs.weight) * 30), type: 'number', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Maintenance Calories

This estimates the calories required to **maintain** your current weight based on an average activity level.

### Formula:
\\[ \\text{Calories} \\approx \\text{Weight (kg)} \\times 30 \\]

To lose weight, you generally need to consume 500 calories less than this number.`,
            faqs: []
        }
    },

    // Ideal Weight
    {
        slug: 'ideal-weight-calculator',
        category: 'Health',
        meta: { title: 'Ideal Weight Calculator', description: 'Find your ideal body weight based on height.' },
        inputs: [{ id: 'height', label: 'Height', type: 'slider', defaultValue: 170, min: 140, max: 210, step: 1, addonRight: 'cm' }],
        calculate: (inputs) => {
            const h = Number(inputs.height);
            return [{ id: 'wt', label: 'Ideal Weight', value: Math.round(h - 100), type: 'number', isHighlight: true, addonRight: 'kg' }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Broca Index

One of the simplest methods to estimate ideal weight.

\\[ \\text{Ideal Weight (kg)} = \\text{Height (cm)} - 100 \\]

Note: This is a rough estimation relative to simple height.`,
            faqs: []
        }
    },

    // Body Fat
    {
        slug: 'body-fat-percentage-calculator',
        category: 'Health',
        meta: { title: 'Body Fat % Calculator', description: 'Estimate body fat percentage using RFM method.' },
        inputs: [
            { id: 'waist', label: 'Waist Circumference', type: 'slider', defaultValue: 90, min: 60, max: 150, step: 1, addonRight: 'cm' },
            { id: 'height', label: 'Height', type: 'slider', defaultValue: 170, min: 140, max: 210, step: 1, addonRight: 'cm' }
        ],
        calculate: (inputs) => {
            const w = Number(inputs.waist);
            const h = Number(inputs.height);
            // Relative Fat Mass (RFM) Index: 64 - (20 * Height / Waist)
            const bf = 64 - (20 * h / w);
            return [{ id: 'bf', label: 'Est. Body Fat', value: bf.toFixed(1), type: 'percent', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Relative Fat Mass (RFM)

RFM is considered more accurate than BMI for estimating body fat percentage as it considers waist circumference.

### Formula:
\\[ RFM = 64 - (20 \\times \\frac{\\text{Height}}{\\text{Waist}}) \\]`,
            faqs: [
                { question: "What is a healthy body fat %?", answer: "For men: 10-20%. For women: 18-28%." }
            ]
        }
    },

    // Daily Water
    {
        slug: 'daily-water-intake-calculator',
        category: 'Health',
        meta: { title: 'Daily Water Intake', description: 'How much water should you drink daily?' },
        inputs: [{ id: 'weight', label: 'Weight', type: 'slider', defaultValue: 70, min: 30, max: 200, step: 1, addonRight: 'kg' }],
        calculate: (inputs) => {
            return [{ id: 'water', label: 'Daily Water', value: (Number(inputs.weight) * 0.033).toFixed(1), type: 'number', isHighlight: true, addonRight: 'L' }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Hydration Needs

A general rule of thumb is to drink approximately 30-35ml of water per kg of body weight.

\\[ \\text{Water (L)} = \\text{Weight (kg)} \\times 0.033 \\]`,
            faqs: [
                { question: "Does coffee count?", answer: "Yes, but plain water is best. Caffeinated drinks have a mild diuretic effect." }
            ]
        }
    },

    // Steps to Calories
    {
        slug: 'steps-to-calories-calculator',
        category: 'Health',
        meta: { title: 'Steps to Calories', description: 'Convert your walking steps to calories burned.' },
        inputs: [{ id: 'steps', label: 'Daily Steps', type: 'slider', defaultValue: 5000, min: 100, max: 50000, step: 100, addonRight: '' }],
        calculate: (inputs) => {
            // Avg 0.04 kcal per step
            return [{ id: 'kcal', label: 'Calories Burned', value: Math.round(Number(inputs.steps) * 0.04), type: 'number', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Walking & Energy

An average person burns about **0.04 calories per step**.
10,000 steps roughly equals 400 calories burned.`,
            faqs: []
        }
    },

    // Pregnancy Due Date
    {
        slug: 'pregnancy-due-date-calculator',
        category: 'Health',
        meta: { title: 'Pregnancy Due Date', description: 'Estimate baby due date based on LMP.' },
        inputs: [{ id: 'days', label: 'Days since Last Period', type: 'slider', defaultValue: 10, min: 0, max: 280, step: 1, addonRight: 'Days' }],
        calculate: (inputs) => {
            const remaining = 280 - Number(inputs.days);
            return [{ id: 'rem', label: 'Days Remaining', value: remaining > 0 ? remaining : 0, type: 'number', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Naegele's Rule

Pregnancy lasts approximately **280 days** (40 weeks) from the first day of the Last Menstrual Period (LMP).

\\[ \\text{Due Date} = \\text{LMP} + 280 \\text{ days} \\]`,
            faqs: [
                { question: "Is the due date accurate?", answer: "Only about 4% of babies are born on their exact due date. Most are born within 2 weeks before or after." }
            ]
        }
    },

    // Period Cycle
    {
        slug: 'period-cycle-calculator',
        category: 'Health',
        meta: { title: 'Period Cycle Calculator', description: 'Predict next period start date.' },
        inputs: [{ id: 'cycle', label: 'Cycle Length', type: 'slider', defaultValue: 28, min: 21, max: 35, step: 1, addonRight: 'Days' }],
        calculate: (inputs) => {
            return [{ id: 'next', label: 'Days until Next', value: Number(inputs.cycle), type: 'number', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Menstrual Cycle Calculation

Based on your average cycle length (typically 28 days), this tool helps predict your next period.`,
            faqs: []
        }
    },

    // Lean Body Mass
    {
        slug: 'lean-body-mass-calculator',
        category: 'Health',
        meta: { title: 'Lean Body Mass Calculator', description: 'Calculate LBM using Boer Formula.' },
        inputs: [
            { id: 'weight', label: 'Weight', type: 'slider', defaultValue: 70, min: 30, max: 150, step: 1, addonRight: 'kg' },
            { id: 'height', label: 'Height', type: 'slider', defaultValue: 170, min: 100, max: 220, step: 1, addonRight: 'cm' },
            { id: 'gender', label: 'Gender', type: 'radio', defaultValue: 0, options: [{ label: 'Male', value: '0' }, { label: 'Female', value: '1' }] }
        ],
        calculate: (inputs) => {
            const w = Number(inputs.weight);
            const h = Number(inputs.height);
            let lbm = 0;
            if (String(inputs.gender) === '0') {
                // Male: 0.407W + 0.267H - 19.2
                lbm = (0.407 * w) + (0.267 * h) - 19.2;
            } else {
                // Female: 0.252W + 0.473H - 48.3
                lbm = (0.252 * w) + (0.473 * h) - 48.3;
            }
            return [{ id: 'lbm', label: 'Lean Body Mass', value: lbm.toFixed(1), type: 'number', addonRight: 'kg', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Boer Formula

Lean Body Mass (LBM) is weight minus body fat. The Boer formula is considered one of the most accurate methods.

**Men:** $LBM = 0.407 \\times W + 0.267 \\times H - 19.2$
**Women:** $LBM = 0.252 \\times W + 0.473 \\times H - 48.3$`,
            faqs: [
                { question: "Why is LBM important?", answer: "It allows you to calculate macronutrient needs more accurately and monitor muscle growth." }
            ]
        }
    },
    // Heart Rate Zone
    {
        slug: 'heart-rate-zone-calculator',
        category: 'Health',
        meta: { title: 'Heart Rate Zone Calculator', description: 'Calculate target heart rate zones for cardio efficiency.' },
        inputs: [
            { id: 'age', label: 'Age', type: 'slider', defaultValue: 30, min: 10, max: 90, step: 1, addonRight: 'Ys' }
        ],
        calculate: (inputs) => {
            const maxHr = 220 - Number(inputs.age);
            const zoneLow = Math.round(maxHr * 0.5); // 50%
            const zoneHigh = Math.round(maxHr * 0.85); // 85%
            return [
                { id: 'max', label: 'Max Heart Rate', value: maxHr, type: 'number', addonRight: 'bpm' },
                { id: 'zone', label: 'Target Zone', value: `${zoneLow} - ${zoneHigh}`, type: 'text', isHighlight: true }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Target Heart Rate

For effective cardio, aim to keep your heart rate between **50% and 85%** of your maximum heart rate.

**Maximum Heart Rate (MHR):**
\\[ MHR = 220 - \\text{Age} \\]`,
            faqs: [
                { question: "What is fat burn zone?", answer: "Usually 60-70% of your maximum heart rate. It is easier to sustain for longer durations." }
            ]
        }
    },
    // BAC Calculator (Simplified Widmark)
    {
        slug: 'bac-calculator',
        category: 'Health',
        meta: { title: 'BAC Calculator', description: 'Estimate Blood Alcohol Content.' },
        inputs: [
            { id: 'drinks', label: 'Drinks (Standard)', type: 'slider', defaultValue: 2, min: 1, max: 20, step: 1, addonRight: '' },
            { id: 'weight', label: 'Weight', type: 'slider', defaultValue: 70, min: 40, max: 150, step: 1, addonRight: 'kg' },
            { id: 'hours', label: 'Hours Since Drinking', type: 'slider', defaultValue: 1, min: 0, max: 24, step: 0.5, addonRight: 'hr' }
        ],
        calculate: (inputs) => {
            const A = Number(inputs.drinks) * 14;
            const W = Number(inputs.weight) * 1000;
            const r = 0.68;
            const t = Number(inputs.hours);
            let bac = ((A / (r * W)) * 100) - (0.015 * t);
            if (bac < 0) bac = 0;
            return [{ id: 'bac', label: 'Est. BAC %', value: bac.toFixed(3), type: 'percent', isHighlight: true }];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Widmark Formula

Used to estimate Blood Alcohol Content.
Note: **This is only an estimate.** Do not rely on it for driving legality.

**Assumption:**
1 Standard Drink = 14 grams of pure alcohol.
Metabolism rate = 0.015% per hour.`,
            faqs: [
                { question: "What is the legal limit?", answer: "In India, the legal limit for driving is 0.03% BAC (30mg/100ml)." }
            ]
        }
    }
];

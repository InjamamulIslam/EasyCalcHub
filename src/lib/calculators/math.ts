import { CalculatorConfig } from "@/types/calculator";

export const mathCalculators: CalculatorConfig[] = [
    {
        slug: 'scientific-calculator',
        category: 'Math',
        meta: {
            title: 'Scientific Calculator',
            description: 'Advanced calculator for scientific, engineering, and mathematical calculations.'
        },
        inputs: [], // Interactive UI
        calculate: () => [], // Handled by component
        content: {
            howItWorks: `### Scientific Calculator
This is a fully functional scientific calculator supporting:
- **Trigonometry**: Sin, Cos, Tan (and inverse)
- **Logarithms**: Log, Ln
- **Powers**: Square, Cube, Roots
- **Constants**: Pi, Euler's number

Use the keypad to perform complex calculations directly in your browser.`,
            faqs: []
        },
        chartType: 'none'
    },
    {
        slug: 'normal-calculator',
        category: 'Math',
        meta: {
            title: 'Normal Calculator',
            description: 'Simple standard calculator for daily use.'
        },
        inputs: [], // Interactive UI
        calculate: () => [],
        content: {
            howItWorks: `### Standard Calculator
A simple and clean calculator for basic arithmetic:
- Addition, Subtraction, Multiplication, Division.
- Percentage and Clear functions.
- Large buttons for easy typing.`,
            faqs: []
        },
        chartType: 'none'
    },
    // Algebra: Quadratic Solver
    {
        slug: 'quadratic-equation-solver',
        category: 'Math',
        meta: { title: 'Quadratic Equation Solver', description: 'Solve ax² + bx + c = 0.' },
        inputs: [
            { id: 'a', label: 'a (Coefficient of x²)', type: 'number', defaultValue: 1, step: 0.1 },
            { id: 'b', label: 'b (Coefficient of x)', type: 'number', defaultValue: -3, step: 0.1 },
            { id: 'c', label: 'c (Constant)', type: 'number', defaultValue: 2, step: 0.1 }
        ],
        calculate: (inputs) => {
            const a = Number(inputs.a);
            const b = Number(inputs.b);
            const c = Number(inputs.c);
            const d = b * b - 4 * a * c;

            if (d < 0) {
                return [{
                    id: 'roots',
                    label: 'Roots',
                    value: 'Complex Roots',
                    type: 'text',
                    isHighlight: true,
                    steps: [
                        `Identify coefficients: a=${a}, b=${b}, c=${c}`,
                        `Calculate Discriminant (Δ) = b² - 4ac`,
                        `Δ = (${b})² - 4(${a})(${c})`,
                        `Δ = ${b * b} - ${4 * a * c} = ${d}`,
                        `Since Δ < 0, the equation has no real roots.`
                    ]
                }];
            }
            const x1 = (-b + Math.sqrt(d)) / (2 * a);
            const x2 = (-b - Math.sqrt(d)) / (2 * a);
            return [
                {
                    id: 'x1',
                    label: 'Root x₁',
                    value: Number.isInteger(x1) ? x1 : x1.toFixed(4),
                    type: 'number',
                    isHighlight: true,
                    steps: [
                        `Identify coefficients: a=${a}, b=${b}, c=${c}`,
                        `Calculate Discriminant (Δ) = b² - 4ac`,
                        `Δ = (${b})² - 4(${a})(${c}) = ${d}`,
                        `Apply Quadratic Formula: x = (-b ± √Δ) / 2a`,
                        `x = (${-b} ± √${d}) / ${2 * a}`,
                        `x₁ = (${-b} + ${Math.sqrt(d).toFixed(4)}) / ${2 * a} = ${x1.toFixed(4)}`,
                        `x₂ = (${-b} - ${Math.sqrt(d).toFixed(4)}) / ${2 * a} = ${x2.toFixed(4)}`
                    ]
                },
                { id: 'x2', label: 'Root x₂', value: Number.isInteger(x2) ? x2 : x2.toFixed(4), type: 'number' },
                { id: 'disc', label: 'Discriminant (Δ)', value: d, type: 'number' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Quadratic Formula
Solves equations of form \\( ax^2 + bx + c = 0 \\).

\\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]`,
            faqs: [{ question: "What if discriminant is negative?", answer: "The equation has no real solutions (complex roots)." }]
        }
    },
    // Trigonometry: Right Triangle
    {
        slug: 'right-triangle-calculator',
        category: 'Math',
        meta: { title: 'Right Triangle Calculator', description: 'Find missing sides and angles.' },
        inputs: [
            { id: 'a', label: 'Side A (Leg)', type: 'number', defaultValue: 3, min: 0 },
            { id: 'b', label: 'Side B (Leg)', type: 'number', defaultValue: 4, min: 0 }
        ],
        calculate: (inputs) => {
            const a = Number(inputs.a);
            const b = Number(inputs.b);
            const c = Math.sqrt(a * a + b * b);
            const angA = (Math.asin(a / c) * 180) / Math.PI;
            const angB = 90 - angA;
            return [
                {
                    id: 'c',
                    label: 'Hypotenuse (c)',
                    value: Number.isInteger(c) ? c : c.toFixed(4),
                    type: 'number',
                    isHighlight: true,
                    steps: [
                        `Given legs: a = ${a}, b = ${b}`,
                        `Calculate Hypotenuse (c) using Pythagoras theorem: c = √(a² + b²)`,
                        `c = √(${a * a} + ${b * b}) = √${(a * a + b * b).toFixed(2)} = ${c.toFixed(4)}`,
                        `Calculate Angle A: A = arcsin(a/c)`,
                        `A = arcsin(${a}/${c.toFixed(4)}) = ${angA.toFixed(2)}°`,
                        `Calculate Angle B: B = 90° - A`,
                        `B = 90° - ${angA.toFixed(2)}° = ${angB.toFixed(2)}°`,
                        `Calculate Area: Area = 0.5 * a * b`,
                        `Area = 0.5 * ${a} * ${b} = ${(0.5 * a * b).toFixed(2)}`
                    ]
                },
                { id: 'angA', label: 'Angle A', value: angA.toFixed(2) + '°', type: 'text' },
                { id: 'angB', label: 'Angle B', value: angB.toFixed(2) + '°', type: 'text' },
                { id: 'area', label: 'Area', value: 0.5 * a * b, type: 'number' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Pythagorean Theorem
\\[ a^2 + b^2 = c^2 \\]
Finds the hypotenuse and angles of a right triangle given two legs.`,
            faqs: []
        }
    },
    // Calculus: Derivative (Slope)
    {
        slug: 'derivative-calculator',
        category: 'Math',
        meta: { title: 'Derivative Calculator (Numeric)', description: 'Find the slope of a curve at a point.' },
        inputs: [
            { id: 'eq', label: 'Function f(x) (JS syntax)', type: 'text', defaultValue: 'x*x' }, // Caution: Security risk if strict
            { id: 'x', label: 'Point x', type: 'number', defaultValue: 2 }
        ],
        calculate: (inputs) => {
            // Numerical differentiation: f'(x) ≈ (f(x+h) - f(x))/h
            try {
                const eq = String(inputs.eq).replace(/\^/g, '**');
                const xVal = Number(inputs.x);
                const h = 0.0001;

                // Eval function
                const f = (v: number) => {
                    return new Function('x', 'return ' + eq)(v);
                };

                const slope = (f(xVal + h) - f(xVal)) / h;
                return [
                    { id: 'slope', label: `f'(${xVal})`, value: slope.toFixed(4), type: 'number', isHighlight: true }
                ];
            } catch {
                return [{ id: 'err', label: 'Error', value: 'Invalid Syntax', type: 'text', isHighlight: true }];
            }
        },
        chartType: 'none',
        content: {
            howItWorks: `### Numerical Differentiation
Calculates the approximate slope of function \\( f(x) \\) at point \\( x \\) using the limit definition:
\\[ f'(x) \\approx \\frac{f(x+h) - f(x)}{h} \\]`,
            faqs: [{ question: "Supported syntax?", answer: "Use JS Math syntax: x*x for square, Math.sin(x), etc." }]
        }
    }
    ,
    // Statistics: Mean, Median, Mode
    {
        slug: 'mean-median-mode-calculator',
        category: 'Math',
        meta: { title: 'Mean, Median, Mode Calculator', description: 'Calculate statistical averages.' },
        inputs: [
            { id: 'data', label: 'Data Set (comma separated)', type: 'text', defaultValue: '1, 2, 2, 3, 4, 7, 9' }
        ],
        calculate: (inputs) => {
            const arr = String(inputs.data).split(',').map(n => Number(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b);
            if (arr.length === 0) return [{ id: 'err', label: 'Error', value: 'Invalid Data', type: 'text', isHighlight: true }];

            const sum = arr.reduce((a, b) => a + b, 0);
            const mean = sum / arr.length;

            const mid = Math.floor(arr.length / 2);
            const median = arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;

            const modeMap: Record<string, number> = {};
            let maxCount = 0;
            arr.forEach(n => {
                modeMap[n] = (modeMap[n] || 0) + 1;
                if (modeMap[n] > maxCount) maxCount = modeMap[n];
            });
            const modes = Object.keys(modeMap).filter(k => modeMap[k] === maxCount && maxCount > 1);
            const modeStr = modes.length > 0 ? modes.join(', ') : 'None';

            return [
                {
                    id: 'mean',
                    label: 'Mean (Average)',
                    value: mean.toFixed(2),
                    type: 'number',
                    isHighlight: true,
                    steps: [
                        `Data Set (Sorted): [${arr.join(', ')}]`,
                        `Count (n): ${arr.length}`,
                        `Sum (Σx): ${sum}`,
                        `Mean = Σx / n = ${sum} / ${arr.length} = ${mean.toFixed(4)}`,
                        `Median Position: ${(arr.length + 1) / 2}`,
                        `Median Value: ${median}`,
                        `Mode: ${modeStr} (Frequency: ${maxCount})`,
                        `Range: Max - Min = ${arr[arr.length - 1]} - ${arr[0]} = ${arr[arr.length - 1] - arr[0]}`
                    ]
                },
                { id: 'median', label: 'Median', value: median, type: 'number' },
                { id: 'mode', label: 'Mode', value: modeStr, type: 'text' },
                { id: 'range', label: 'Range', value: arr[arr.length - 1] - arr[0], type: 'number' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Measures of Central Tendency
- **Mean**: Average of all numbers.
- **Median**: The middle value in a sorted list.
- **Mode**: The most frequent number(s).`,
            faqs: []
        }
    },
    // Number Theory: LCM & GCD
    {
        slug: 'lcm-gcd-calculator',
        category: 'Math',
        meta: { title: 'LCM & GCD Calculator', description: 'Find Least Common Multiple & Greatest Common Divisor.' },
        inputs: [
            { id: 'a', label: 'Number A', type: 'number', defaultValue: 12, min: 1, step: 1 },
            { id: 'b', label: 'Number B', type: 'number', defaultValue: 18, min: 1, step: 1 }
        ],
        calculate: (inputs) => {
            const a = Math.round(Math.abs(Number(inputs.a)));
            const b = Math.round(Math.abs(Number(inputs.b)));

            const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
            const lcm = (x: number, y: number): number => (x * y) / gcd(x, y);

            const gcdVal = gcd(a, b);
            const lcmVal = lcm(a, b);

            return [
                { id: 'lcm', label: 'LCM (Least Common Multiple)', value: lcmVal, type: 'number', isHighlight: true },
                { id: 'gcd', label: 'GCD (Greatest Common Divisor)', value: gcdVal, type: 'number' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### LCM and GCD
- **LCM**: Smallest positive integer that is divisible by both a and b.
- **GCD**: Largest positive integer that divides each of the integers.`,
            faqs: []
        }
    },
    // Geometry: Circle Solver
    {
        slug: 'circle-calculator',
        category: 'Math',
        meta: { title: 'Circle Calculator', description: 'Calculate Area, Circumference, Diameter from Radius.' },
        inputs: [
            { id: 'r', label: 'Radius (r)', type: 'number', defaultValue: 5, min: 0 }
        ],
        calculate: (inputs) => {
            const r = Number(inputs.r);
            return [
                { id: 'area', label: 'Area (A)', value: (Math.PI * r * r).toFixed(2), type: 'number', isHighlight: true },
                { id: 'circ', label: 'Circumference (C)', value: (2 * Math.PI * r).toFixed(2), type: 'number' },
                { id: 'd', label: 'Diameter (d)', value: 2 * r, type: 'number' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Circle Formulas
- **Area**: \\[ A = \\pi r^2 \\]
- **Circumference**: \\[ C = 2 \\pi r \\]
- **Diameter**: \\[ d = 2r \\]`,
            faqs: []
        }
    },
    // Linear Algebra: 2x2 Matrix Determinant
    {
        slug: 'matrix-determinant-calculator',
        category: 'Math',
        meta: { title: 'Matrix Determinant (2x2)', description: 'Calculate determinant of a 2x2 matrix.' },
        inputs: [
            { id: 'a', label: 'a (Top Left)', type: 'number', defaultValue: 1 },
            { id: 'b', label: 'b (Top Right)', type: 'number', defaultValue: 2 },
            { id: 'c', label: 'c (Bottom Left)', type: 'number', defaultValue: 3 },
            { id: 'd', label: 'd (Bottom Right)', type: 'number', defaultValue: 4 }
        ],
        calculate: (inputs) => {
            const det = (Number(inputs.a) * Number(inputs.d)) - (Number(inputs.b) * Number(inputs.c));
            return [
                { id: 'det', label: 'Determinant (|A|)', value: det, type: 'number', isHighlight: true }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### 2x2 Determinant
For matrix:
\\[ \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\]
**Determinant** = \\( ad - bc \\)`,
            faqs: []
        }
    },
    // Combinatorics: nPr and nCr
    {
        slug: 'permutation-combination-calculator',
        category: 'Math',
        meta: { title: 'Permutation & Combination', description: 'Calculate nPr and nCr.' },
        inputs: [
            { id: 'n', label: 'Total items (n)', type: 'number', defaultValue: 5, min: 0, step: 1 },
            { id: 'r', label: 'Selected items (r)', type: 'number', defaultValue: 2, min: 0, step: 1 }
        ],
        calculate: (inputs) => {
            const n = Math.floor(Number(inputs.n));
            const r = Math.floor(Number(inputs.r));

            if (r > n) return [{ id: 'err', label: 'Error', value: 'r cannot be > n', type: 'text', isHighlight: true }];

            const fact = (num: number): number => num <= 1 ? 1 : num * fact(num - 1);

            const nPr = fact(n) / fact(n - r);
            const nCr = fact(n) / (fact(r) * fact(n - r));

            return [
                { id: 'nCr', label: 'Combinations (nCr)', value: nCr, type: 'number', isHighlight: true },
                { id: 'nPr', label: 'Permutations (nPr)', value: nPr, type: 'number' }
            ];
        },
        chartType: 'none',
        content: {
            howItWorks: `### Formulas
- **Permutation (Order matters)**: \\[ nPr = \\frac{n!}{(n-r)!} \\]
- **Combination (Order doesn't matter)**: \\[ nCr = \\frac{n!}{r!(n-r)!} \\]`,
            faqs: []
        }
    }
];

export type InputType = 'number' | 'slider' | 'select' | 'radio' | 'date' | 'text';

export interface CalculatorOption {
    label: string;
    value: string;
}

export interface CalculatorInput {
    id: string;
    label: string;
    type: InputType;
    defaultValue: number | string;
    min?: number;
    max?: number;
    step?: number;
    options?: CalculatorOption[];
    addonRight?: string; // e.g., "years", "%"
    helpText?: string;
}

export interface CalculatorResult {
    id: string;
    label: string;
    value: number | string;
    type: 'currency' | 'percent' | 'number' | 'text';
    isHighlight?: boolean; // Main large result
    steps?: string[]; // Step-by-step solution steps
}

export interface CalculatorMeta {
    title: string;
    description: string;
}

export interface CalculatorContent {
    howItWorks: string; // Markdown supported
    faqs: { question: string; answer: string }[];
}

export interface CalculatorConfig {
    slug: string;
    category: string; // 'finance', 'health', etc.
    meta: CalculatorMeta;
    inputs: CalculatorInput[];
    calculate: (inputs: Record<string, number | string>) => CalculatorResult[];
    content: CalculatorContent;
    chartType?: 'pie' | 'bar' | 'none';
}

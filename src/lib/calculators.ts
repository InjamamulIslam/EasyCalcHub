import { CalculatorConfig } from "@/types/calculator";
import { financeCalculators } from "./calculators/finance";
import { salaryCalculators } from "./calculators/salary";
import { businessCalculators } from "./calculators/business";
import { healthCalculators } from "./calculators/health";
import { utilityCalculators } from "./calculators/utility";
import { internationalCalculators } from "./calculators/international";
import { educationCalculators } from "./calculators/education";
import { mathCalculators } from "./calculators/math";
import { exchangeCalculators } from "./calculators/exchange";

export const calculators: CalculatorConfig[] = [
    ...financeCalculators,
    ...salaryCalculators,
    ...businessCalculators,
    ...healthCalculators,
    ...utilityCalculators,
    ...internationalCalculators,
    ...educationCalculators,
    ...mathCalculators,
    ...exchangeCalculators
];

export const getCalculator = (slug: string) => calculators.find(c => c.slug === slug);

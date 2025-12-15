"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CalculatorInput } from "@/types/calculator";
import { HelpCircle } from "lucide-react";

interface InputGroupProps {
    input: CalculatorInput;
    value: number | string;
    onChange: (value: number | string) => void;
    className?: string;
}

export function InputGroup({ input, value, onChange, className }: InputGroupProps) {
    const [showTooltip, setShowTooltip] = React.useState(false);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Allow empty string
        if (val === '') {
            onChange('');
            return;
        }
        // Convert to number to remove leading zeros
        const numVal = Number(val);
        // Only update if it's a valid number
        if (!isNaN(numVal)) {
            onChange(numVal);
        }
    };

    const handleRadioChange = (val: string) => {
        onChange(val);
    };

    return (
        <div className={cn("space-y-3", className)}>
            {/* Label Row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <label htmlFor={input.id} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {input.label}
                    </label>
                    {input.helpText && (
                        <div className="relative">
                            <button
                                type="button"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                onClick={() => setShowTooltip(!showTooltip)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                <HelpCircle className="w-4 h-4" />
                            </button>
                            {showTooltip && (
                                <div className="absolute left-0 top-6 z-50 w-64 p-3 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-xl">
                                    {input.helpText}
                                    <div className="absolute -top-1 left-4 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45"></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Number Input for Slider */}
                {input.type === 'slider' && (
                    <div className="relative">
                        <input
                            type="number"
                            id={input.id}
                            value={value}
                            onChange={handleInputChange}
                            min={input.min}
                            max={input.max}
                            className={cn(
                                "w-40 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-right text-base font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                input.addonRight && "pr-14"
                            )}
                        />
                        {input.addonRight && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400 pointer-events-none font-medium">
                                {input.addonRight}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Slider */}
            {input.type === 'slider' && (
                <div className="pt-2">
                    <input
                        type="range"
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        value={value}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>{input.min?.toLocaleString('en-IN')} {input.addonRight}</span>
                        <span>{input.max?.toLocaleString('en-IN')} {input.addonRight}</span>
                    </div>
                </div>
            )}

            {/* Radio Buttons */}
            {input.type === 'radio' && input.options && (
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    {input.options.map((option) => {
                        const isSelected = String(value) === String(option.value);
                        return (
                            <button
                                key={option.value}
                                onClick={() => handleRadioChange(String(option.value))}
                                className={cn(
                                    "flex-1 py-2 px-4 text-sm font-semibold rounded-lg transition-all",
                                    isSelected
                                        ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                )}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Number Input (standalone) */}
            {input.type === 'number' && (
                <div className="relative">
                    <input
                        type="number"
                        id={input.id}
                        value={value}
                        onChange={handleInputChange}
                        min={input.min}
                        max={input.max}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-base font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {input.addonRight && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 pointer-events-none">
                            {input.addonRight}
                        </span>
                    )}
                </div>
            )}

            {/* Date Input */}
            {input.type === 'date' && (
                <input
                    type="date"
                    id={input.id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-base font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            )}

            {/* Select Dropdown */}
            {input.type === 'select' && input.options && (
                <div className="relative">
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-base font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {input.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
}

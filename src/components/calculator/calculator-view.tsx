"use client";

import { useState, useMemo, useEffect } from "react";
import { getCalculator } from "@/lib/calculators";
import { InputGroup } from "@/components/ui/input-group";
import { ResultCard } from "@/components/ui/result-card";
import { useSearchParams } from "next/navigation";
import { useHistory } from "@/hooks/use-history";
import { HistoryPanel } from "@/components/calculator/history-panel";

interface CalculatorViewProps {
    slug: string;
}

export function CalculatorView({ slug }: CalculatorViewProps) {
    const config = getCalculator(slug);
    const searchParams = useSearchParams();

    // 1. Initialize Inputs State
    const [inputs, setInputs] = useState<Record<string, number | string>>(() => {
        if (!config) return {};
        const initial: Record<string, number | string> = {};

        config.inputs.forEach(input => {
            const urlValue = searchParams.get(input.id);
            if (urlValue) {
                initial[input.id] = input.type === 'number' || input.type === 'slider'
                    ? Number(urlValue)
                    : urlValue;
            } else {
                initial[input.id] = input.defaultValue;
            }
        });
        return initial;
    });

    // 2. Calculate Results (Derived State)
    const results = config ? config.calculate(inputs) : [];

    // 3. Initialize History State
    const { items: history, addToHistory, clearHistory } = useHistory(slug);

    if (!config) return <div>Calculator not found</div>;

    const handleInputChange = (id: string, value: number | string) => {
        setInputs(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const saveToHistory = () => {
        const mainRes = results.find(r => r.isHighlight);
        const resultLabel = mainRes ? `${mainRes.label}: ${mainRes.value}` : 'Calculation';

        addToHistory({
            type: 'config',
            title: config.meta.title,
            result: resultLabel,
            inputs: { ...inputs }
        } as any); // Type assertion if needed, or adjust HistoryItem type
    };

    const restoreFromHistory = (item: any) => {
        if (item.inputs) {
            setInputs(item.inputs);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const breakdown = useMemo(() => {
        if (!slug.includes('emi') && !slug.includes('loan')) return undefined;

        const principal = Number(inputs.principal || inputs.amount || 0);
        const rate = Number(inputs.rate || 0) / 12 / 100;
        const tenure = Number(inputs.tenure || inputs.years || 0) * 12;

        if (!principal || !rate || !tenure) return undefined;

        const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
        let balance = principal;
        const schedule = [];

        for (let month = 1; month <= Math.min(tenure, 360); month++) {
            const interest = balance * rate;
            const principalPaid = emi - interest;
            balance = Math.max(0, balance - principalPaid);

            schedule.push({
                month,
                principal: Math.round(principalPaid),
                interest: Math.round(interest),
                balance: Math.round(balance)
            });
        }

        return schedule;
    }, [inputs, slug]);

    return (
        <div className="space-y-8">
            {/* Main Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 shadow-lg border border-slate-200 dark:border-slate-800">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                Input Values
                            </h2>
                            <p className="text-sm text-slate-500">Adjust parameters below</p>
                        </div>

                        {/* Inputs */}
                        <div className="space-y-6">
                            {config.inputs.map((input, index) => {
                                // For marks-to-percentage calculator, only show subject inputs based on numSubjects
                                if (slug === 'marks-to-percentage' && input.id.startsWith('subject')) {
                                    const subjectNum = parseInt(input.id.replace('subject', ''));
                                    const numSubjects = Number(inputs.numSubjects) || 5;
                                    if (subjectNum > numSubjects) {
                                        return null; // Don't render this input
                                    }
                                }

                                return (
                                    <InputGroup
                                        key={input.id}
                                        input={input}
                                        value={inputs[input.id]}
                                        onChange={(val) => handleInputChange(input.id, val)}
                                    />
                                );
                            })}
                        </div>

                        {/* Quick Actions */}
                        <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
                            <button
                                onClick={() => {
                                    const initial: Record<string, number | string> = {};
                                    config.inputs.forEach(input => {
                                        initial[input.id] = input.defaultValue;
                                    });
                                    setInputs(initial);
                                }}
                                className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={saveToHistory}
                                className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Save Result
                            </button>
                        </div>
                    </div>

                    {/* History Section */}
                    {history.length > 0 && (
                        <HistoryPanel
                            history={history}
                            onClear={clearHistory}
                            onRestore={restoreFromHistory}
                        />
                    )}
                </div>

                {/* Results Section */}
                <div className="lg:col-span-7 space-y-8">
                    <ResultCard
                        results={results}
                        chartType={config.chartType}
                        slug={slug}
                        inputs={inputs}
                        breakdown={breakdown}
                    />
                </div>
            </div>

            {/* Ad Slot 1 - Below Calculator (Horizontal Banner) */}
            <div className="w-full">
                <div className="max-w-[728px] mx-auto p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center min-h-[120px] flex flex-col items-center justify-center">
                    <div className="text-2xl mb-2">📢</div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Advertisement</span>
                    <span className="text-xs text-slate-400 mt-1">728 x 90 - Leaderboard</span>
                </div>
            </div>

            {/* Content Section - Related Calculators or Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Related Tools</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Explore more financial calculators</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Quick Tips</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Learn how to use this calculator</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Save Results</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Share or download your calculation</p>
                </div>
            </div>

            {/* Ad Slot 2 - Mid Content (Large Rectangle) */}
            <div className="w-full py-4">
                <div className="max-w-[336px] mx-auto p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center min-h-[300px] flex flex-col items-center justify-center">
                    <div className="text-3xl mb-3">📢</div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Advertisement</span>
                    <span className="text-xs text-slate-400 mt-1">336 x 280 - Large Rectangle</span>
                </div>
            </div>



            {/* Ad Slot 3 - Bottom (Horizontal Banner) */}
            <div className="w-full pb-8">
                <div className="max-w-[728px] mx-auto p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center min-h-[120px] flex flex-col items-center justify-center">
                    <div className="text-2xl mb-2">📢</div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Advertisement</span>
                    <span className="text-xs text-slate-400 mt-1">728 x 90 - Leaderboard</span>
                </div>
            </div>
        </div>
    );
}

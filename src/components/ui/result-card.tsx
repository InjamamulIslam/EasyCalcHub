"use client";

import { CalculatorResult } from "@/types/calculator";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Share2, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface ResultCardProps {
    results: CalculatorResult[];
    chartType?: 'pie' | 'bar' | 'none';
    slug?: string;
    inputs?: Record<string, number | string>;
    breakdown?: Array<{ month: number; principal: number; interest: number; balance: number }>;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export function ResultCard({ results, chartType = 'none', slug, inputs, breakdown }: ResultCardProps) {
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [copied, setCopied] = useState(false);

    const formatValue = (value: number | string, type: string) => {
        if (type === 'currency') {
            const numValue = Number(value);
            return `₹${numValue.toLocaleString('en-IN')}`;
        }
        if (type === 'percent') return `${value}%`;
        return value;
    };

    const handleShare = async () => {
        if (!slug || !inputs) return;

        const params = new URLSearchParams();
        Object.entries(inputs).forEach(([key, value]) => {
            params.set(key, String(value));
        });

        const shareUrl = `${window.location.origin}/${slug}?${params.toString()}`;

        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const chartData = results
        .filter(r => !r.isHighlight && typeof r.value === 'number' && r.value > 0)
        .map(r => ({
            name: r.label,
            value: Number(r.value)
        }));

    const mainResult = results.find(r => r.isHighlight);
    const otherResults = results.filter(r => !r.isHighlight);

    return (
        <div className="space-y-8">
            {/* Main Result Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-lg border border-slate-200 dark:border-slate-800">

                {/* Share Button */}
                {slug && inputs && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleShare}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title="Share calculator"
                        >
                            <Share2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </button>
                    </div>
                )}

                {copied && (
                    <div className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium text-center">
                        Link copied to clipboard!
                    </div>
                )}

                {/* Main Result */}
                {mainResult && (
                    <div className="text-center mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                                {mainResult.label}
                            </span>
                        </div>
                        <div className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            {formatValue(mainResult.value, mainResult.type)}
                        </div>
                    </div>
                )}

                {/* Chart & Details */}
                <div className={cn(
                    "grid gap-8 items-center",
                    chartType === 'pie' && chartData.length > 0 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
                )}>
                    {/* Chart */}
                    {chartType === 'pie' && chartData.length > 0 && (
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                                        contentStyle={{
                                            borderRadius: '8px',
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            padding: '8px 12px'
                                        }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Breakdown List */}
                    <div className="space-y-3">
                        {otherResults.map((result, index) => (
                            <div
                                key={result.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {result.label}
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                                    {formatValue(result.value, result.type)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Step-by-Step Solution */}
            {mainResult && mainResult.steps && mainResult.steps.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                            <span className="text-xl">💡</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Step-by-Step Solution
                            </h3>
                            <p className="text-xs text-slate-500">How this result was calculated</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {mainResult.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                    {idx + 1}
                                </span>
                                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Breakdown Table - Separate card with proper spacing */}
            {breakdown && breakdown.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => setShowBreakdown(!showBreakdown)}
                        className="flex items-center justify-between w-full mb-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Payment Schedule
                                </h3>
                                <p className="text-xs text-slate-500">Month-by-month breakdown</p>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {showBreakdown ? 'Hide' : 'Show'} ({breakdown.length})
                        </span>
                    </button>

                    {showBreakdown && (
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-700">
                                            <th className="text-left py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">Month</th>
                                            <th className="text-right py-3 px-3 font-semibold text-emerald-600">Principal</th>
                                            <th className="text-right py-3 px-3 font-semibold text-amber-600">Interest</th>
                                            <th className="text-right py-3 px-3 font-semibold text-blue-600">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {breakdown.slice(0, 12).map((row) => (
                                            <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                                <td className="py-3 px-3 font-medium">{row.month}</td>
                                                <td className="text-right py-3 px-3 font-mono text-emerald-600">
                                                    ₹{row.principal.toLocaleString('en-IN')}
                                                </td>
                                                <td className="text-right py-3 px-3 font-mono text-amber-600">
                                                    ₹{row.interest.toLocaleString('en-IN')}
                                                </td>
                                                <td className="text-right py-3 px-3 font-mono font-semibold text-blue-600">
                                                    ₹{row.balance.toLocaleString('en-IN')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {breakdown.length > 12 && (
                                <p className="text-center text-sm text-slate-500 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                                    Showing first 12 of {breakdown.length} months
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

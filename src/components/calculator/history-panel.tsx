"use client";

import { HistoryItem } from "@/hooks/use-history";
import { Trash2, RotateCcw, Clock } from "lucide-react";

interface HistoryPanelProps {
    history: HistoryItem[];
    onClear: () => void;
    onRestore: (item: HistoryItem) => void;
}

export function HistoryPanel({ history, onClear, onRestore }: HistoryPanelProps) {
    if (history.length === 0) return null;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent History</h3>
                </div>
                <button
                    onClick={onClear}
                    className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear All
                </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="group relative p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 transition-all cursor-pointer"
                        onClick={() => onRestore(item)}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] text-slate-400 font-mono">
                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <RotateCcw className="w-3 h-3" /> Restore
                            </span>
                        </div>

                        {/* Display depends on type */}
                        <div className="flex flex-col gap-0.5">
                            {item.expression && (
                                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                                    {item.expression} =
                                </div>
                            )}
                            <div className="font-semibold text-slate-700 dark:text-slate-200 text-sm truncate">
                                {item.result}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

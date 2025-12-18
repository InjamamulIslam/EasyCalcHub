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
        <div className="bg-card text-card-foreground rounded-3xl p-6 shadow-lg border border-border">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-lg font-bold text-card-foreground">Recent History</h3>
                </div>
                <button
                    onClick={onClear}
                    className="flex items-center gap-1.5 text-xs text-destructive hover:text-destructive/80 font-medium px-2 py-1 rounded-lg hover:bg-destructive/10 transition-colors"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear All
                </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="group relative p-3 rounded-xl bg-muted/50 hover:bg-muted border border-border transition-all cursor-pointer"
                        onClick={() => onRestore(item)}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] text-muted-foreground font-mono">
                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <RotateCcw className="w-3 h-3" /> Restore
                            </span>
                        </div>

                        {/* Display depends on type */}
                        <div className="flex flex-col gap-1">
                            {item.expression && (
                                <div className="text-xs text-muted-foreground font-mono truncate">
                                    {item.expression} =
                                </div>
                            )}
                            <div className="font-bold text-foreground text-sm">
                                {item.result.split(' · ')[0]}
                            </div>
                            {item.result.includes(' · ') && (
                                <div className="text-[10px] text-muted-foreground leading-relaxed">
                                    {item.result.split(' · ')[1]}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

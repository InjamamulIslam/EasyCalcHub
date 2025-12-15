"use client";

import { useState, useEffect, useCallback } from 'react';

export interface HistoryItem {
    id: string;
    timestamp: number;
    slug: string; // To filter by calculator
    type: 'config' | 'scientific' | 'currency';
    title: string; // e.g., "Home Loan"
    inputs?: Record<string, any>; // For config calculators
    expression?: string; // For scientific
    result: string; // Main result to display
}

const STORAGE_KEY = 'easycalchub_history';

export function useHistory(slug: string) {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setHistory(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Failed to load history", e);
        }
    }, []);

    // Save to local storage whenever history changes
    const persist = (newHistory: HistoryItem[]) => {
        setHistory(newHistory);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    };

    const addToHistory = useCallback((item: Omit<HistoryItem, 'id' | 'timestamp' | 'slug'>) => {
        const newItem: HistoryItem = {
            ...item,
            id: Date.now().toString() + Math.random().toString().slice(2, 6),
            timestamp: Date.now(),
            slug,
        };

        setHistory((prev) => {
            const updated = [newItem, ...prev].slice(0, 50); // Limit global history to 50
            persist(updated);
            return updated;
        });
    }, [slug]);

    const clearHistory = useCallback(() => {
        setHistory((prev) => {
            // Remove only items for this calculator
            const filtered = prev.filter(item => item.slug !== slug);
            persist(filtered);
            return filtered;
        });
    }, [slug]);

    const items = history.filter(item => item.slug === slug);

    return {
        items,
        addToHistory,
        clearHistory
    };
}

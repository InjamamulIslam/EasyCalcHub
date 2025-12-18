
"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CalculatorConfig } from "@/types/calculator";
import { Search, Calculator, ArrowRight, LayoutGrid, Coins, Briefcase, HeartPulse, Activity, Globe, Zap, GraduationCap, X, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorDirectoryProps {
    calculators: CalculatorConfig[];
}

// Category Config with Colors & Icons (reused)
const CATEGORY_STYLES: Record<string, { icon: React.ElementType, color: string, bg: string }> = {
    'Finance': {
        icon: Coins,
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    'Salary': {
        icon: Briefcase,
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    'Business': {
        icon: Activity,
        color: 'text-violet-600 dark:text-violet-400',
        bg: 'bg-violet-50 dark:bg-violet-900/20',
    },
    'Health': {
        icon: HeartPulse,
        color: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
    'Utility': {
        icon: Zap,
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
    'International': {
        icon: Globe,
        color: 'text-cyan-600 dark:text-cyan-400',
        bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    },
    'Education': {
        icon: GraduationCap,
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    'Math': {
        icon: Calculator,
        color: 'text-fuchsia-600 dark:text-fuchsia-400',
        bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20',
    },
    'Exchange': {
        icon: ArrowRightLeft,
        color: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-50 dark:bg-orange-900/20',
    }
};

function DirectoryContent({ calculators }: CalculatorDirectoryProps) {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category');

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All");

    // Sync state if URL changes significantly, but allow user override
    useEffect(() => {
        if (initialCategory) {
            setSelectedCategory(initialCategory);
        }
    }, [initialCategory]);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(calculators.map((c) => c.category));
        return Array.from(cats);
    }, [calculators]);

    // Filter logic
    const filteredCalculators = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        let filtered = calculators.filter((calc) => {
            const matchesCategory = selectedCategory === "All" || calc.category === selectedCategory;
            if (!matchesCategory) return false;

            if (!query) return true;

            const inTitle = calc.meta.title.toLowerCase().includes(query);
            const inDesc = calc.meta.description.toLowerCase().includes(query);

            return inTitle || inDesc;
        });

        // Relevance Sorting if there is a search query
        if (query) {
            filtered.sort((a, b) => {
                const titleA = a.meta.title.toLowerCase();
                const titleB = b.meta.title.toLowerCase();

                // 1. Exact Match Title (Winner)
                if (titleA === query) return -1;
                if (titleB === query) return 1;

                // 2. Starts With Title (High Priority)
                const startA = titleA.startsWith(query);
                const startB = titleB.startsWith(query);
                if (startA && !startB) return -1;
                if (!startA && startB) return 1;

                // 3. Contains in Title (Medium Priority)
                const incTitleA = titleA.includes(query);
                const incTitleB = titleB.includes(query);
                if (incTitleA && !incTitleB) return -1;
                if (!incTitleA && incTitleB) return 1;

                // 4. Alphabetical fallback
                return titleA.localeCompare(titleB);
            });
        }

        return filtered;
    }, [selectedCategory, searchQuery, calculators]);

    return (
        <div className="space-y-10">

            {/* 1. Hero Search Section (Centralized & Clean) */}
            <div className="relative max-w-3xl mx-auto -mt-6 mb-12">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-card/80 backdrop-blur-xl border-2 border-border rounded-full shadow-lg flex items-center p-2 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                        <div className="pl-4 text-muted-foreground">
                            <Search className="w-6 h-6" />
                        </div>
                        <input
                            type="text"
                            placeholder="What do you want to calculate today?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-none px-4 py-3 text-lg placeholder:text-muted-foreground focus:outline-none text-foreground font-medium"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Pills (Centered Below Search) */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                            selectedCategory === "All"
                                ? "bg-primary text-primary-foreground border-primary shadow-md"
                                : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground"
                        )}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                                selectedCategory === cat
                                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground hover:bg-muted"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Category Cards Guide (Only shown when filter is 'All' or just clearing things up) 
               Actually, let's show these only if no search and 'All' category to help discovery.
            */}
            {selectedCategory === 'All' && searchQuery === '' && (
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {categories.map((cat) => {
                        const style = CATEGORY_STYLES[cat] || { icon: LayoutGrid, color: 'text-slate-500', bg: 'bg-slate-100' };
                        const Icon = style.icon;
                        const count = calculators.filter(c => c.category === cat).length;

                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className="group relative flex flex-col items-center p-4 rounded-2xl bg-muted/50 border border-transparent hover:border-border hover:bg-card transition-all duration-300 hover:shadow-lg"
                            >
                                {/* NEW Badge for Education */}
                                {cat === 'Education' && (
                                    <div className="absolute -top-2 -right-2 z-10">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg animate-pulse">
                                            NEW
                                        </span>
                                    </div>
                                )}
                                <div className={cn("p-3 rounded-xl mb-3 transition-transform duration-300 group-hover:scale-110", style.bg)}>
                                    <Icon className={cn("w-6 h-6", style.color)} />
                                </div>
                                <span className="font-semibold text-sm text-foreground">{cat}</span>
                                <span className="text-xs text-muted-foreground">{count} Apps</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* 3. Main Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCalculators.map((calc) => {
                    const style = CATEGORY_STYLES[calc.category] || CATEGORY_STYLES['Utility'];
                    return (
                        <Link
                            key={calc.slug}
                            href={`/${calc.slug}`}
                            className="group relative bg-card text-card-foreground border border-border rounded-[2rem] p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                <Calculator className="w-24 h-24 rotate-12" />
                            </div>

                            <div className="flex justify-between items-start mb-6 relative z-10 w-full">
                                <span className={cn("px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 bg-opacity-50", style.bg, style.color)}>
                                    <style.icon className="w-3 h-3" />
                                    {calc.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors relative z-10">
                                {calc.meta.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 relative z-10 mb-4 flex-1">
                                {calc.meta.description}
                            </p>

                            <div className="relative z-10 flex items-center text-sm font-semibold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Link>
                    );
                })}

                {filteredCalculators.length === 0 && (
                    <div className="col-span-full text-center py-20">
                        <div className="inline-flex p-4 rounded-full bg-slate-50 dark:bg-slate-800 mb-4 text-slate-400">
                            <Search className="w-8 h-8" />
                        </div>
                        <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
                            No calculators found for &quot;{searchQuery}&quot;
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                            className="mt-4 text-primary hover:underline font-semibold"
                        >
                            View All Tools
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export function CalculatorDirectory(props: CalculatorDirectoryProps) {
    return (
        <Suspense fallback={<div>Loading directory...</div>}>
            <DirectoryContent {...props} />
        </Suspense>
    );
}

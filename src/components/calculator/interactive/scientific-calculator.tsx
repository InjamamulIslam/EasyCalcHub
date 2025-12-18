"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useHistory } from "@/hooks/use-history";
import { HistoryPanel } from "@/components/calculator/history-panel";

// Helper for Factorial
const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
};

export function ScientificCalculator() {
    const [display, setDisplay] = useState('0');
    const [lastAnswer, setLastAnswer] = useState('0'); // Ans key
    const [isDegrees, setIsDegrees] = useState(false); // Default Radians
    const [memory, setMemory] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [showMemoryIndicator, setShowMemoryIndicator] = useState(false);

    // History Hook
    const { items: historyItems, addToHistory, clearHistory } = useHistory('scientific-calculator');

    // Ref for focus management if needed
    const displayRef = useRef<HTMLDivElement>(null);

    // --- Core Display Logic ---

    const addToDisplay = useCallback((val: string) => {
        setError(null);
        setDisplay((prev) => {
            if (prev === '0' || prev === 'Error') return val;
            return prev + val;
        });
    }, []);

    const clearAll = useCallback(() => {
        setDisplay('0');
        setError(null);
    }, []);

    const backspace = useCallback(() => {
        setError(null);
        setDisplay((prev) => {
            if (prev.length <= 1 || prev === 'Error') return '0';
            return prev.slice(0, -1);
        });
    }, []);

    // --- Evaluation Logic ---

    const calculate = useCallback(() => {
        try {
            const originalExpression = display; // Capture for history
            let expr = display;

            // 1. Handle common replacements
            expr = expr.replace(/×/g, '*').replace(/÷/g, '/');
            expr = expr.replace(/π/g, '(Math.PI)');
            expr = expr.replace(/e/g, '(Math.E)');
            expr = expr.replace(/\^/g, '**');
            expr = expr.replace(/√\(/g, 'Math.sqrt(');

            // 2. Handle Functions with Mode Injection
            if (isDegrees) {
                expr = expr.replace(/sin\(/g, 'dSin(');
                expr = expr.replace(/cos\(/g, 'dCos(');
                expr = expr.replace(/tan\(/g, 'dTan(');
                expr = expr.replace(/asin\(/g, 'dAsin(');
                expr = expr.replace(/acos\(/g, 'dAcos(');
                expr = expr.replace(/atan\(/g, 'dAtan(');
            } else {
                expr = expr.replace(/sin\(/g, 'Math.sin(');
                expr = expr.replace(/cos\(/g, 'Math.cos(');
                expr = expr.replace(/tan\(/g, 'Math.tan(');
                expr = expr.replace(/asin\(/g, 'Math.asin(');
                expr = expr.replace(/acos\(/g, 'Math.acos(');
                expr = expr.replace(/atan\(/g, 'Math.atan(');
            }

            expr = expr.replace(/sinh\(/g, 'Math.sinh(');
            expr = expr.replace(/cosh\(/g, 'Math.cosh(');
            expr = expr.replace(/tanh\(/g, 'Math.tanh(');
            expr = expr.replace(/ln\(/g, 'Math.log(');
            expr = expr.replace(/log\(/g, 'Math.log10(');

            // 3. Define Helper Functions for the Scope
            const toRad = (d: number) => (d * Math.PI) / 180;
            const toDeg = (r: number) => (r * 180) / Math.PI;

            const scope = {
                Math,
                fact: factorial,
                dSin: (x: number) => Math.sin(toRad(x)),
                dCos: (x: number) => Math.cos(toRad(x)),
                dTan: (x: number) => Math.tan(toRad(x)),
                dAsin: (x: number) => toDeg(Math.asin(x)),
                dAcos: (x: number) => toDeg(Math.acos(x)),
                dAtan: (x: number) => toDeg(Math.atan(x)),
                sqr: (x: number) => x * x,
                cube: (x: number) => x * x * x,
                abs: Math.abs,
            };

            // 4. Construct Function
            const keys = Object.keys(scope);
            const values = Object.values(scope);

            const safeEval = new Function(...keys, 'return ' + expr);
            const res = safeEval(...values);

            if (!isFinite(res) || isNaN(res)) throw new Error("NaN");

            // Formatting: limit decimals
            const resultStr = String(Math.round(res * 1e12) / 1e12);

            setDisplay(resultStr);
            setLastAnswer(resultStr);

            // 5. Add to History
            addToHistory({
                type: 'scientific',
                title: 'Scientific Calculator',
                expression: originalExpression,
                result: resultStr
            });

        } catch (e) {
            console.error(e);
            setError('Error');
        }
    }, [display, isDegrees, addToHistory]);

    // --- Math & Memory Handlers ---

    const insertFunction = (fnName: string) => {
        addToDisplay(fnName + '(');
    };

    const handleMemory = (action: 'MC' | 'MR' | 'MS' | 'M+' | 'M-') => {
        const currentVal = parseFloat(display);
        switch (action) {
            case 'MC':
                setMemory(0);
                setShowMemoryIndicator(false);
                break;
            case 'MR':
                addToDisplay(String(memory));
                break;
            case 'MS':
                if (!isNaN(currentVal)) {
                    setMemory(currentVal);
                    setShowMemoryIndicator(true);
                }
                break;
            case 'M+':
                if (!isNaN(currentVal)) {
                    setMemory(m => m + currentVal);
                    setShowMemoryIndicator(true);
                }
                break;
            case 'M-':
                if (!isNaN(currentVal)) {
                    setMemory(m => m - currentVal);
                    setShowMemoryIndicator(true);
                }
                break;
        }
    };

    // --- Keyboard Support ---
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            if (/\d/.test(key)) addToDisplay(key);
            if (['+', '-', '*', '/', '(', ')', '.', '^', '%'].includes(key)) addToDisplay(key === '*' ? '×' : key === '/' ? '÷' : key);
            if (key === 'Enter') { e.preventDefault(); calculate(); }
            if (key === 'Backspace') backspace();
            if (key === 'Escape') clearAll();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [addToDisplay, backspace, calculate, clearAll]);


    // --- UI Classes ---
    const btnBase = "relative h-12 md:h-14 rounded-xl font-medium text-sm md:text-base shadow-[0px_2px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[2px] transition-all flex items-center justify-center select-none active:bg-opacity-80";
    const btnFunc = cn(btnBase, "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground");
    const btnNum = cn(btnBase, "bg-card text-card-foreground text-lg font-semibold hover:bg-muted/50");
    const btnOp = cn(btnBase, "bg-primary/10 text-primary text-lg hover:bg-primary/20");
    const btnDanger = cn(btnBase, "bg-destructive/10 text-destructive hover:bg-destructive/20");
    const btnSuccess = cn(btnBase, "bg-primary text-primary-foreground shadow-primary/25 hover:bg-primary/90 active:shadow-none");

    return (
        <div className="w-full max-w-4xl mx-auto p-1 space-y-8">
            <div className="bg-muted/30 p-4 md:p-6 rounded-[2rem] shadow-2xl border border-border relative overflow-hidden">
                {/* Background decorative gloss */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-50"></div>

                {/* --- Screen --- */}
                <div
                    ref={displayRef}
                    className="relative bg-card w-full h-32 md:h-40 mb-6 rounded-2xl border-4 border-muted shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] p-4 md:p-6 text-right flex flex-col justify-between overflow-hidden"
                >
                    {/* Status Bar */}
                    <div className="flex justify-between text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                        <div className="flex gap-4">
                            <span className={isDegrees ? "text-foreground" : "text-muted-foreground/50"}>DEG</span>
                            <span className={!isDegrees ? "text-foreground" : "text-muted-foreground/50"}>RAD</span>
                        </div>
                        {showMemoryIndicator && <span className="text-primary font-extrabold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> MEMORY
                        </span>}
                    </div>

                    {/* Main Display */}
                    <div className="flex-1 flex items-center justify-end overflow-hidden">
                        <span className={cn(
                            "font-mono text-3xl md:text-5xl tracking-wide text-foreground break-all",
                            error && "text-destructive"
                        )}>
                            {error || display}
                        </span>
                    </div>
                </div>

                {/* --- Controls Bar --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 px-1 gap-2">
                    {/* RAD/DEG Selection */}
                    <div className="flex bg-muted p-1 rounded-xl">
                        <button
                            onClick={() => setIsDegrees(false)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                !isDegrees ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Rad
                        </button>
                        <button
                            onClick={() => setIsDegrees(true)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                isDegrees ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Deg
                        </button>
                    </div>

                    {/* Memory Controls */}
                    <div className="flex gap-1 md:gap-2">
                        {['MC', 'MR', 'M+', 'M-', 'MS'].map((m) => (
                            <button
                                key={m}
                                onClick={() => handleMemory(m as any)}
                                className={cn(
                                    "px-2 md:px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-colors border border-transparent",
                                    m === 'MS' || m === 'MC' ? "text-destructive bg-destructive/10 hover:bg-destructive/20" : "text-muted-foreground bg-muted hover:bg-muted/80 hover:text-foreground"
                                )}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Keypad Grid --- */}
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3">

                    {/* Row 1 */}
                    <button onClick={() => insertFunction('sinh')} className={btnFunc}>sinh</button>
                    <button onClick={() => insertFunction('cosh')} className={btnFunc}>cosh</button>
                    <button onClick={() => insertFunction('tanh')} className={btnFunc}>tanh</button>
                    <button onClick={() => addToDisplay('^')} className={btnFunc}>xʸ</button>
                    <button onClick={() => addToDisplay('(')} className={btnFunc}>(</button>

                    <button onClick={() => addToDisplay(')')} className={btnFunc}>)</button>
                    <button onClick={backspace} className={btnDanger}><ChevronLeft size={20} /></button>
                    <button onClick={clearAll} className={cn(btnDanger, "font-bold")}>AC</button>
                    <button onClick={() => addToDisplay('%')} className={btnFunc}>%</button>
                    <button onClick={() => addToDisplay('÷')} className={btnOp}>÷</button>

                    {/* Row 2 */}
                    <button onClick={() => insertFunction('asinh')} className={btnFunc}><span className="text-[10px] leading-tight">sinh⁻¹</span></button>
                    <button onClick={() => insertFunction('acosh')} className={btnFunc}><span className="text-[10px] leading-tight">cosh⁻¹</span></button>
                    <button onClick={() => insertFunction('atanh')} className={btnFunc}><span className="text-[10px] leading-tight">tanh⁻¹</span></button>
                    <button onClick={() => insertFunction('log')} className={btnFunc}>log</button>
                    <button onClick={() => insertFunction('ln')} className={btnFunc}>ln</button>

                    <button onClick={() => addToDisplay('7')} className={btnNum}>7</button>
                    <button onClick={() => addToDisplay('8')} className={btnNum}>8</button>
                    <button onClick={() => addToDisplay('9')} className={btnNum}>9</button>
                    <button onClick={() => addToDisplay('×')} className={btnOp}>×</button>
                    <button onClick={() => insertFunction('√')} className={btnFunc}>√</button>

                    {/* Row 3 */}
                    <button onClick={() => addToDisplay('π')} className={btnFunc}>π</button>
                    <button onClick={() => addToDisplay('e')} className={btnFunc}>e</button>
                    <button onClick={() => insertFunction('fact')} className={btnFunc}>n!</button>
                    <button onClick={() => addToDisplay('^(-1)')} className={btnFunc}>1/x</button>
                    <button onClick={() => insertFunction('abs')} className={btnFunc}>|x|</button>

                    <button onClick={() => addToDisplay('4')} className={btnNum}>4</button>
                    <button onClick={() => addToDisplay('5')} className={btnNum}>5</button>
                    <button onClick={() => addToDisplay('6')} className={btnNum}>6</button>
                    <button onClick={() => addToDisplay('-')} className={btnOp}>-</button>
                    <button onClick={() => addToDisplay('^(2)')} className={btnFunc}>x²</button>

                    {/* Row 4 */}
                    <button onClick={() => insertFunction('sin')} className={btnFunc}>sin</button>
                    <button onClick={() => insertFunction('cos')} className={btnFunc}>cos</button>
                    <button onClick={() => insertFunction('tan')} className={btnFunc}>tan</button>
                    <button onClick={() => addToDisplay('^(3)')} className={btnFunc}>x³</button>
                    <button onClick={() => addToDisplay('^(1/3)')} className={btnFunc}>∛</button>

                    <button onClick={() => addToDisplay('1')} className={btnNum}>1</button>
                    <button onClick={() => addToDisplay('2')} className={btnNum}>2</button>
                    <button onClick={() => addToDisplay('3')} className={btnNum}>3</button>
                    <button onClick={() => addToDisplay('+')} className={btnOp}>+</button>
                    <button onClick={() => insertFunction('exp')} className={btnFunc}>eˣ</button>

                    {/* Row 5 */}
                    <button onClick={() => insertFunction('asin')} className={btnFunc}><span className="text-[10px] leading-tight">sin⁻¹</span></button>
                    <button onClick={() => insertFunction('acos')} className={btnFunc}><span className="text-[10px] leading-tight">cos⁻¹</span></button>
                    <button onClick={() => insertFunction('atan')} className={btnFunc}><span className="text-[10px] leading-tight">tan⁻¹</span></button>
                    <button onClick={() => addToDisplay(lastAnswer)} className={cn(btnFunc, "text-xs font-bold")}>Ans</button>
                    <button onClick={() => addToDisplay('10^')} className={btnFunc}>10ˣ</button>

                    <button onClick={() => addToDisplay('0')} className={cn(btnNum, "col-span-2 w-full")}>0</button>
                    <button onClick={() => addToDisplay('.')} className={btnNum}>.</button>
                    <button onClick={calculate} className={cn(btnSuccess, "col-span-2 w-full text-xl shadow-success-900")}>=</button>

                </div>
            </div>

            {/* History Panel */}
            {historyItems.length > 0 && (
                <HistoryPanel
                    history={historyItems}
                    onClear={clearHistory}
                    onRestore={(item) => setDisplay(item.result)}
                />
            )}

            <div className="mt-4 text-center">
                <p className="text-xs text-slate-400">
                    Keyboard Shortcuts: Enter to Calculate, Esc to Clear, Backspace to Delete.
                </p>
            </div>
        </div>
    );
}

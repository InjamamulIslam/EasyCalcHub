"use client";

import { useState } from 'react';
import { Delete, RotateCcw, Equal } from 'lucide-react';
import { useHistory } from "@/hooks/use-history";
import { HistoryPanel } from "@/components/calculator/history-panel";

export function NormalCalculator() {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const [isNewNumber, setIsNewNumber] = useState(true);

    const { items: historyItems, addToHistory, clearHistory } = useHistory('normal-calculator');

    const handleNumber = (num: string) => {
        if (display === '0' || isNewNumber) {
            setDisplay(num);
            setIsNewNumber(false);
        } else {
            setDisplay(display + num);
        }
    };

    const handleOperator = (op: string) => {
        setEquation(display + ' ' + op + ' ');
        setIsNewNumber(true);
    };

    const calculate = () => {
        try {
            const fullEq = equation + display;
            // Replace visual operators with JS operators
            const safeEq = fullEq.replace(/×/g, '*').replace(/÷/g, '/');

            const result = new Function('return ' + safeEq)();
            const resultStr = String(result);

            // SAVE TO HISTORY
            if (fullEq.trim() && !isNaN(result)) {
                addToHistory({
                    type: 'scientific', // 'scientific' type renders expression nicely
                    title: 'Standard Calculator',
                    expression: fullEq,
                    result: resultStr
                });
            }

            setDisplay(resultStr);
            setEquation('');
            setIsNewNumber(true);
        } catch {
            setDisplay('Error');
            setEquation('');
            setIsNewNumber(true);
        }
    };

    const clear = () => {
        setDisplay('0');
        setEquation('');
        setIsNewNumber(true);
    };

    const backspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
            setIsNewNumber(true);
        }
    };

    const percentage = () => {
        const val = String(Number(display) / 100);
        setDisplay(val);
        setIsNewNumber(true);
    };

    const btnClass = "h-16 rounded-2xl font-bold text-xl transition-all active:scale-95 flex items-center justify-center shadow-sm";
    const numClass = `${btnClass} bg-card text-card-foreground hover:bg-muted/50`;
    const opClass = `${btnClass} bg-primary/10 text-primary hover:bg-primary/20`;
    const actionClass = `${btnClass} bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground`;
    const eqClass = `${btnClass} bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25`;

    return (
        <div className="max-w-sm mx-auto space-y-6">
            <div className="bg-muted/30 p-6 rounded-[2.5rem] shadow-2xl border border-border">
                {/* Display */}
                <div className="bg-card rounded-3xl p-6 mb-6 text-right shadow-inner border border-input h-28 flex flex-col justify-end">
                    <div className="text-muted-foreground text-sm h-6 font-medium tracking-wider">{equation}</div>
                    <div className="text-4xl font-bold text-card-foreground tracking-tight overflow-hidden text-ellipsis">{display}</div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-4 gap-3">
                    <button onClick={clear} className={actionClass}>AC</button>
                    <button onClick={backspace} className={actionClass}><Delete className="w-5 h-5" /></button>
                    <button onClick={percentage} className={actionClass}>%</button>
                    <button onClick={() => handleOperator('÷')} className={opClass}>÷</button>

                    <button onClick={() => handleNumber('7')} className={numClass}>7</button>
                    <button onClick={() => handleNumber('8')} className={numClass}>8</button>
                    <button onClick={() => handleNumber('9')} className={numClass}>9</button>
                    <button onClick={() => handleOperator('×')} className={opClass}>×</button>

                    <button onClick={() => handleNumber('4')} className={numClass}>4</button>
                    <button onClick={() => handleNumber('5')} className={numClass}>5</button>
                    <button onClick={() => handleNumber('6')} className={numClass}>6</button>
                    <button onClick={() => handleOperator('-')} className={opClass}>-</button>

                    <button onClick={() => handleNumber('1')} className={numClass}>1</button>
                    <button onClick={() => handleNumber('2')} className={numClass}>2</button>
                    <button onClick={() => handleNumber('3')} className={numClass}>3</button>
                    <button onClick={() => handleOperator('+')} className={opClass}>+</button>

                    <button onClick={() => handleNumber('0')} className={`${numClass} col-span-2`}>0</button>
                    <button onClick={() => handleNumber('.')} className={numClass}>.</button>
                    <button onClick={calculate} className={eqClass}><Equal className="w-6 h-6" /></button>
                </div>
            </div>

            {historyItems.length > 0 && (
                <HistoryPanel
                    history={historyItems}
                    onClear={clearHistory}
                    onRestore={(item) => setDisplay(item.result)}
                />
            )}
        </div>
    );
}

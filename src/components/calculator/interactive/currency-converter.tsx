"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCw, TrendingUp, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHistory } from "@/hooks/use-history";
import { HistoryPanel } from "@/components/calculator/history-panel";

// Supported Currencies
const FIAT_CURRENCIES = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
    { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', symbol: 'S$' },
    { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ' },
];

const CRYPTO_CURRENCIES = [
    { code: 'BTC', name: 'Bitcoin', flag: '₿', id: 'bitcoin' },
    { code: 'ETH', name: 'Ethereum', flag: 'Ξ', id: 'ethereum' },
    { code: 'SOL', name: 'Solana', flag: '◎', id: 'solana' },
    { code: 'BNB', name: 'Binance Coin', flag: '🟡', id: 'binancecoin' },
    { code: 'XRP', name: 'Ripple', flag: '✕', id: 'ripple' },
    { code: 'DOGE', name: 'Dogecoin', flag: '🐶', id: 'dogecoin' },
    { code: 'ADA', name: 'Cardano', flag: '₳', id: 'cardano' },
];

const ALL_CURRENCIES = [...FIAT_CURRENCIES, ...CRYPTO_CURRENCIES];

export function CurrencyConverter() {
    const [amount, setAmount] = useState<number>(1);
    const [from, setFrom] = useState<string>('USD');
    const [to, setTo] = useState<string>('INR');
    const [rate, setRate] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const { items: historyItems, addToHistory, clearHistory } = useHistory('currency-converter');

    const fetchRate = async () => {
        setLoading(true);
        setError(null);
        try {
            let fetchedRate = 0;

            const isFromCrypto = CRYPTO_CURRENCIES.some(c => c.code === from);
            const isToCrypto = CRYPTO_CURRENCIES.some(c => c.code === to);

            // Strategy: Convert everything to USD first, then to target
            // This is easier because APIs often base on USD

            // Helper to get price in USD
            const getUSDPrice = async (code: string): Promise<number> => {
                const crypto = CRYPTO_CURRENCIES.find(c => c.code === code);
                if (crypto) {
                    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto.id}&vs_currencies=usd`);
                    const data = await res.json();
                    return data[crypto.id].usd;
                }
                if (code === 'USD') return 1;
                // For Fiat, use open.er-api.com
                const res = await fetch(`https://open.er-api.com/v6/latest/USD`);
                const data = await res.json();
                const rate = data.rates[code];
                return 1 / rate; // Price of 1 unit in USD
            };

            // Optimization: Use open.er-api.com for straight fiat-to-fiat
            if (!isFromCrypto && !isToCrypto) {
                const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
                const data = await res.json();
                if (!data.rates || !data.rates[to]) throw new Error("Rate not found");
                fetchedRate = data.rates[to];
            } else {
                // Crypto involved
                // 1. Get From -> USD
                // 2. Get To -> USD
                // 3. Rate = (FromInUSD) / (ToInUSD)
                const [fromInUSD, toInUSD] = await Promise.all([
                    getUSDPrice(from),
                    getUSDPrice(to)
                ]);

                fetchedRate = fromInUSD / toInUSD;
            }

            setRate(fetchedRate);
            setLastUpdated(new Date());

        } catch (err) {
            console.error(err);
            setError("Failed to fetch exchange rate. Please try again.");
            setRate(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRate();
        // Set up interval for refreshing every 60s
        const interval = setInterval(fetchRate, 60000);
        return () => clearInterval(interval);
    }, [from, to]);

    const handleSwap = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSave = () => {
        if (!rate) return;
        const resultVal = (amount * rate).toLocaleString(undefined, { maximumFractionDigits: 5 });
        addToHistory({
            type: 'currency',
            title: 'Currency Converter',
            expression: `${amount} ${from}`,
            result: `${resultVal} ${to}`,
            inputs: { amount, from, to }
        });
    };

    const handleRestore = (item: any) => {
        if (item.inputs) {
            setAmount(item.inputs.amount);
            setFrom(item.inputs.from);
            setTo(item.inputs.to);
        }
    };

    const fromCurrency = ALL_CURRENCIES.find(c => c.code === from);
    const toCurrency = ALL_CURRENCIES.find(c => c.code === to);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                {/* Converter Card */}
                <div className="bg-card text-card-foreground rounded-3xl p-6 lg:p-8 shadow-lg border border-border">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">Currency Converter</h2>
                            <p className="text-sm text-muted-foreground">Real-time Fiat & Crypto Rates</p>
                        </div>
                        {loading && <RefreshCw className="w-5 h-5 text-primary animate-spin" />}
                    </div>

                    <div className="space-y-6">
                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full text-3xl font-bold p-4 rounded-2xl bg-muted border border-border outline-none focus:ring-2 focus:ring-primary transition-all font-mono text-foreground"
                            />
                        </div>

                        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                            {/* From */}
                            <div className="relative group">
                                <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">From</label>
                                <select
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="w-full appearance-none p-4 rounded-2xl bg-card border border-border outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer font-semibold text-foreground"
                                >
                                    <optgroup label="Fiat Currencies">
                                        {FIAT_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                                    </optgroup>
                                    <optgroup label="Cryptocurrencies">
                                        {CRYPTO_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                                    </optgroup>
                                </select>
                            </div>

                            {/* Swap Button */}
                            <button
                                onClick={handleSwap}
                                className="mt-6 p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors border border-border"
                            >
                                <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
                            </button>

                            {/* To */}
                            <div className="relative group">
                                <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">To</label>
                                <select
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="w-full appearance-none p-4 rounded-2xl bg-card border border-border outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer font-semibold text-foreground"
                                >
                                    <optgroup label="Fiat Currencies">
                                        {FIAT_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                                    </optgroup>
                                    <optgroup label="Cryptocurrencies">
                                        {CRYPTO_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                                    </optgroup>
                                </select>
                            </div>
                        </div>

                        {/* Result Display */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 mt-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <TrendingUp className="w-24 h-24" />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium mb-1">Converted Amount</p>
                                    <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                                        {rate ? (amount * rate).toLocaleString(undefined, { maximumFractionDigits: 5 }) : '---'}
                                        <span className="text-2xl md:text-3xl ml-2 opacity-80">{to}</span>
                                    </div>
                                    <p className="text-blue-200 text-xs">
                                        1 {from} = {rate ? rate.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '...'} {to}
                                    </p>
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                                    title="Save to History"
                                >
                                    <Save className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {lastUpdated && (
                            <p className="text-center text-xs text-muted-foreground">
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </p>
                        )}

                        {error && (
                            <p className="text-center text-sm text-destructive bg-destructive/10 p-2 rounded-lg border border-destructive/20">
                                {error}
                            </p>
                        )}
                    </div>
                </div>

                {/* History & Info Wrapper to stack them */}
                <div className="space-y-6">
                    {/* History Panel */}
                    {historyItems.length > 0 && (
                        <HistoryPanel
                            history={historyItems}
                            onClear={clearHistory}
                            onRestore={handleRestore}
                        />
                    )}

                    {/* Info Card */}
                    <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-md border border-border">
                        <h3 className="text-lg font-bold text-card-foreground mb-4 flex items-center gap-2">
                            <span>{fromCurrency?.flag}</span> {fromCurrency?.name}
                            <span className="text-muted-foreground">to</span>
                            <span>{toCurrency?.flag}</span> {toCurrency?.name}
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-border">
                                <span className="text-muted-foreground text-sm">Base Currency</span>
                                <span className="font-medium">{fromCurrency?.name} ({from})</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border">
                                <span className="text-muted-foreground text-sm">Target Currency</span>
                                <span className="font-medium">{toCurrency?.name} ({to})</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground text-sm">Current Rate</span>
                                <span className="font-medium font-mono text-primary">
                                    {rate ? `1 ${from} = ${rate.toFixed(4)} ${to}` : 'Loading...'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Conversions */}
                    <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-md border border-border">
                        <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Quick Conversions</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            {[1, 5, 10, 25, 50, 100].map(val => (
                                <div key={val} className="flex justify-between p-2 rounded-lg bg-muted/50">
                                    <span className="font-medium text-muted-foreground">{val} {from}</span>
                                    <span className="font-bold text-foreground">
                                        {rate ? (val * rate).toFixed(2) : '-'} {to}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


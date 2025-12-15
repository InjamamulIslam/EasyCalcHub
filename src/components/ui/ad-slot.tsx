"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
    slotId?: string; // Data-ad-slot ID
    format?: "auto" | "fluid" | "rectangle";
    layout?: string; // For in-article ads
}

export function AdSlot({ slotId, format = "auto", layout }: AdSlotProps) {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        // Only push if window exists and adsbygoogle is defined
        try {
            if (typeof window !== "undefined") {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    // In development mode, OR if no slotId is provided, render the safe placeholder
    const isDev = process.env.NODE_ENV === 'development';

    if (!slotId || isDev) {
        return (
            <div className="w-full py-6 flex justify-center">
                <div className="w-full max-w-[728px] p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center min-h-[120px] flex flex-col items-center justify-center">
                    <span className="text-2xl mb-2 grayscale opacity-50">📢</span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Advertisement Space</span>
                    <span className="text-xs text-slate-400 mt-1">
                        {isDev ? `Dev Mode (Slot: ${slotId || 'None'})` : 'Dynamic Ad Slot'}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center py-4 overflow-hidden">
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
                data-ad-layout-key={layout}
            />
        </div>
    );
}

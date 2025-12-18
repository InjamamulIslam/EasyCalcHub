"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface CalculatorNavProps {
    slug: string;
}

export function CalculatorNav({ slug }: CalculatorNavProps) {
    const pathname = usePathname();
    const baseUrl = `/${slug}`;

    const tabs = [
        { label: "Calculator", href: baseUrl, active: pathname === baseUrl },
        { label: "How It Works", href: `${baseUrl}/how-it-works`, active: pathname === `${baseUrl}/how-it-works` },
        { label: "FAQs", href: `${baseUrl}/faqs`, active: pathname === `${baseUrl}/faqs` },
    ];

    return (
        <nav className="flex space-x-1 rounded-xl bg-secondary p-1 mb-8 w-fit mx-auto">
            {tabs.map((tab) => (
                <Link
                    key={tab.href}
                    href={tab.href}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        tab.active
                            ? "bg-card text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                >
                    {tab.label}
                </Link>
            ))}
        </nav>
    );
}

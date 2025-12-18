"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: "Finance", href: "/?category=Finance" },
        { name: "Salary", href: "/?category=Salary" },
        { name: "Business", href: "/?category=Business" },
        { name: "Health", href: "/?category=Health" },
        { name: "Math", href: "/?category=Math" },
        { name: "Exchange", href: "/?category=Exchange", className: "text-orange-600 dark:text-orange-400" },
        { name: "Utility", href: "/?category=Utility" },
        { name: "Education", href: "/?category=Education" },
        { name: "International", href: "/?category=International" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary z-50">
                    <Calculator className="h-6 w-6" />
                    <span>EasyCalcHub</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex gap-5 text-sm font-semibold text-muted-foreground items-center">
                    <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn("hover:text-primary transition-colors", link.className)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <ModeToggle />

                    {/* Mobile Menu Toggle */}
                    <button
                        className="xl:hidden p-2 text-foreground z-50"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Nav Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-3xl p-6 xl:hidden animate-in slide-in-from-top-5 duration-200 shadow-2xl border-t border-border overflow-y-auto h-[calc(100vh-4rem)]">
                        <nav className="flex flex-col gap-4 text-lg font-medium">
                            <Link
                                href="/"
                                className="py-3 border-b border-border/50 text-foreground/80 hover:text-primary transition-colors hover:pl-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn("py-3 border-b border-border/50 text-foreground/80 hover:text-primary transition-colors hover:pl-2", link.className)}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

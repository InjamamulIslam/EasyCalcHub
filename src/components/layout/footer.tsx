import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t bg-muted/40 py-12 mt-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1">
                    <Link href="/" className="font-bold text-xl text-primary mb-4 block">
                        EasyCalcHub
                    </Link>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Free online calculators for Finance, Math, Business, and Daily Utilities.
                        100% free, fast, and privacy-focused.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-4 text-foreground">Tools</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/?category=Finance" className="hover:text-primary transition-colors">Finance Calculators</Link></li>
                        <li><Link href="/?category=Salary" className="hover:text-primary transition-colors">Salary & Tax</Link></li>
                        <li><Link href="/?category=Business" className="hover:text-primary transition-colors">Business Tools</Link></li>
                        <li><Link href="/?category=Health" className="hover:text-primary transition-colors">Health & Fitness</Link></li>
                        <li><Link href="/?category=Education" className="hover:text-primary transition-colors">Education Tools</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4 text-foreground">More</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/?category=Math" className="hover:text-primary transition-colors">Math & Algebra</Link></li>
                        <li><Link href="/?category=Utility" className="hover:text-primary transition-colors">Utility & Converters</Link></li>
                        <li><Link href="/?category=International" className="hover:text-primary transition-colors">International</Link></li>
                        <li><Link href="/?category=Exchange" className="hover:text-primary transition-colors text-orange-600 font-medium">Currency & Crypto</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
                <p className="mb-2">
                    Disclaimer: The calculators provided on EasyCalcHub are for informational purposes only.
                    We do not guarantee the accuracy of results. Please consult a financial advisor for professional advice.
                </p>
                <p>&copy; {new Date().getFullYear()} EasyCalcHub. All rights reserved.</p>
            </div>
        </footer>
    );
}

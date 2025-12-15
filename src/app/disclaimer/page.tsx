import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Disclaimer - EasyCalcHub',
    description: 'Disclaimer regarding financial, medical, and general information accuracy on EasyCalcHub.',
};

export default function DisclaimerPage() {
    return (
        <main className="bg-slate-50 dark:bg-black/50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        Disclaimer
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Important information about the nature of our tools and the limitations of liability.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
                        <span>Last Updated: December 14, 2025</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 space-y-2">
                            <p className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-4 px-2">Contents</p>
                            <nav className="flex flex-col gap-1 text-sm">
                                {['General Info', 'Financial Tools', 'Health Tools', 'External Links', 'No Warranties'].map((item) => (
                                    <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors block">
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <div className="lg:col-span-9">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">

                            <section id="general-info">
                                <h2>1. General Information</h2>
                                <p>
                                    All information on EasyCalcHub.com is provided in good faith. However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="financial-tools">
                                <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-200 dark:border-amber-800 not-prose mb-6">
                                    <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                                        ⚠️ Not Financial Advice
                                    </h3>
                                    <p className="text-sm text-amber-800 dark:text-amber-200">
                                        Our financial calculators (EMI, Tax, Investment) are for illustrative purposes only. They are based on user inputs and generalized assumptions that may not apply to your specific situation.
                                    </p>
                                </div>
                                <p>
                                    The Site does not offer financial advice. User agrees that use of the Site is at User’s sole risk. Before making any financial decisions, we recommend consulting with a qualified professional.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="health-tools">
                                <h2>3. Health & Medical Disclaimer</h2>
                                <p>
                                    The health calculators (BMI, BMR, Pregnancy, etc.) provided on this Site are for general informational purposes only and are not intended as a substitute for professional medical advice, diagnosis, or treatment.
                                </p>
                                <p>
                                    Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="external-links">
                                <h2>4. External Links Disclaimer</h2>
                                <p>
                                    The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="no-warranties">
                                <h2>5. No Warranties</h2>
                                <p>
                                    This website is provided "as is," with all faults, and EasyCalcHub expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

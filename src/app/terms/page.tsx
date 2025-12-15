import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Terms & Conditions - EasyCalcHub',
    description: 'Terms of Service for EasyCalcHub.com. Please read these terms carefully before using our calculators.',
};

export default function TermsPage() {
    return (
        <main className="bg-slate-50 dark:bg-black/50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        Terms & Conditions
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Please read these terms and conditions carefully before using specific features of the EasyCalcHub website.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
                        <span>Last Updated: December 14, 2025</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Sidebar / Table of Contents */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 space-y-2">
                            <p className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-4 px-2">Contents</p>
                            <nav className="flex flex-col gap-1 text-sm">
                                {['Acceptance', 'Use License', 'Disclaimers', 'Limitations', 'Links', 'Governing Law', 'Changes'].map((item) => (
                                    <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors block">
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">

                            <section id="acceptance">
                                <h2>1. Acceptance of Terms</h2>
                                <p>
                                    By accessing this website, accessible from https://easycalchub.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="use-license">
                                <h2>2. Use License</h2>
                                <p>
                                    Permission is granted to use our online calculators for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul>
                                    <li>modify or copy the materials;</li>
                                    <li>use the materials for any commercial purpose or for any public display;</li>
                                    <li>attempt to reverse engineer any software contained on EasyCalcHub's Website;</li>
                                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                                    <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                                </ul>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="disclaimers">
                                <h2>3. Disclaimer</h2>
                                <p>
                                    All the materials on EasyCalcHub's Website are provided "as is". EasyCalcHub makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, EasyCalcHub does not make any representations concerning the accuracy or likely reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="limitations">
                                <h2>4. Limitations</h2>
                                <p>
                                    EasyCalcHub or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on EasyCalcHub's Website, even if EasyCalcHub or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="links">
                                <h2>5. Links to Other Sites</h2>
                                <p>
                                    EasyCalcHub has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by EasyCalcHub of the site. The use of any linked website is at the user's own risk.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="governing-law">
                                <h2>6. Governing Law</h2>
                                <p>
                                    Any claim related to EasyCalcHub's Website shall be governed by the laws of India without regards to its conflict of law provisions.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="changes">
                                <h2>7. Changes to Terms</h2>
                                <p>
                                    EasyCalcHub reserves the right to revise these Terms of Use at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

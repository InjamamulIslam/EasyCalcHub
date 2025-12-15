import { Metadata } from 'next';
import { Mail, MapPin, MessageCircle, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us - EasyCalcHub',
    description: 'Get in touch with the EasyCalcHub team for support, feedback, or inquiries.',
};

export default function ContactPage() {
    return (
        <main className="bg-slate-50 dark:bg-black/50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                        Have a question, suggestion, or just want to say hello? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Contact Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-primary shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">Email Support</h3>
                                        <p className="text-slate-500 mb-2 text-sm">For general inquiries, bug reports, and feedback:</p>
                                        <a href="mailto:contact@easycalchub.com" className="text-lg font-bold text-primary hover:underline">
                                            contact@easycalchub.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-purple-600 shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">Location</h3>
                                        <p className="text-slate-500 text-sm">
                                            EasyCalcHub Digital Services<br />
                                            Registered Office: New Delhi, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-sm text-slate-500 text-center italic">
                                We typically reply within 24-48 hours.
                            </p>
                        </div>
                    </div>

                    {/* FAQ / Info Column */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-6">
                                <HelpCircle className="w-6 h-6 text-slate-400" />
                                <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Can I suggest a new calculator?</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Absolutely! We are always looking to expand our library. Send us an email with your idea and we'll try to add it in the next update.
                                    </p>
                                </div>

                                <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>

                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Found a bug or error?</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        We strive for 100% accuracy. If you notice a calculation error, please email us with the calculator name and the inputs you used so we can fix it immediately.
                                    </p>
                                </div>

                                <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>

                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Is this service free?</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Yes, EasyCalcHub is and will always be 100% free to use. We are supported by non-intrusive advertisements.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

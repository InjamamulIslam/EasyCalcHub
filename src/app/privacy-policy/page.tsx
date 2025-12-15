import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy - EasyCalcHub',
    description: 'Comprehensive Privacy Policy for EasyCalcHub.com regarding data collection, cookies, and AdSense compliance.',
};

export default function PrivacyPolicy() {
    return (
        <main className="bg-slate-50 dark:bg-black/50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                            <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Your privacy is critically important to us. This policy details how we handle your data, use cookies, and comply with global privacy standards.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
                        <span>Last Updated: December 14, 2025</span>
                        <span>•</span>
                        <span>Effective Date: December 1, 2025</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Sidebar / Table of Contents (Desktop) */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 space-y-2">
                            <p className="font-semibold text-sm uppercase tracking-wider text-slate-500 mb-4 px-2">Contents</p>
                            <nav className="flex flex-col gap-1 text-sm">
                                {['Introduction', 'Information Collection', 'Log Files', 'Cookies & Web Beacons', 'Google AdSense', 'Third Party Policies', 'CCPA Rights', 'GDPR Rights', 'Children\'s Info'].map((item) => (
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

                            <section id="introduction">
                                <h2>1. Introduction</h2>
                                <p>
                                    At EasyCalcHub.com, accessible from https://easycalchub.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by EasyCalcHub and how we use it.
                                </p>
                                <p>
                                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in EasyCalcHub.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="consent">
                                <h2>2. Consent</h2>
                                <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="information-collection">
                                <h2>3. Information We Collect</h2>
                                <p>
                                    The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                                </p>
                                <p>
                                    If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                                </p>
                                <p>
                                    <strong>Calculation Data:</strong> Please note that inputs entered into our calculators (e.g., financial figures, health data) are processed locally within your browser using JavaScript. We do not transmit or store this sensitive data on our servers.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="log-files">
                                <h2>4. Log Files</h2>
                                <p>
                                    EasyCalcHub follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="cookies-&-web-beacons">
                                <h2>5. Cookies and Web Beacons</h2>
                                <p>
                                    Like any other website, EasyCalcHub uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="google-adsense">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 not-prose mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-indigo-500" />
                                        Google DoubleClick DART Cookie
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>
                                    </p>
                                </div>

                                <h2>6. Advertising Partners Privacy Policies</h2>
                                <p>
                                    You may consult this list to find the Privacy Policy for each of the advertising partners of EasyCalcHub.
                                </p>
                                <p>
                                    Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on EasyCalcHub, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                                </p>
                                <p>
                                    Note that EasyCalcHub has no access to or control over these cookies that are used by third-party advertisers.
                                </p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="ccpa-rights">
                                <h2>7. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                                <p>Under the CCPA, among other rights, California consumers have the right to:</p>
                                <ul>
                                    <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                                    <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                                    <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
                                </ul>
                                <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="gdpr-rights">
                                <h2>8. GDPR Data Protection Rights</h2>
                                <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                                <ul>
                                    <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                                    <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                                    <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                                    <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                                    <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                                    <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                                </ul>
                            </section>

                            <hr className="my-8 border-slate-200 dark:border-slate-800" />

                            <section id="children's-info">
                                <h2>9. Children's Information</h2>
                                <p>
                                    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                                </p>
                                <p>
                                    EasyCalcHub does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                                </p>
                            </section>

                        </div>

                        {/* Contact CTA */}
                        <div className="mt-8 bg-indigo-600 rounded-2xl p-8 text-center text-white">
                            <h3 className="text-xl font-bold mb-2">Have questions about your data?</h3>
                            <p className="text-indigo-100 mb-6">We are here to help. Contact our privacy team directly.</p>
                            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

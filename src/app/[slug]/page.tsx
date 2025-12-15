import { notFound } from "next/navigation";
import { getCalculator, calculators } from "@/lib/calculators";
import { CalculatorView } from "@/components/calculator/calculator-view";
import { CalculatorContent } from "@/components/calculator/calculator-content";
import { CalculatorNav } from "@/components/calculator/calculator-nav";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { NormalCalculator } from "@/components/calculator/interactive/normal-calculator";
import { ScientificCalculator } from "@/components/calculator/interactive/scientific-calculator";
import { CurrencyConverter } from "@/components/calculator/interactive/currency-converter";
import { AdSlot } from "@/components/ui/ad-slot";

interface Props {
    params: Promise<{ slug: string }>;
}

const safeDecode = (slug: string) => {
    try {
        return decodeURIComponent(slug);
    } catch {
        return slug;
    }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = safeDecode(slug);
    const calculator = getCalculator(decodedSlug);

    if (!calculator) {
        return {};
    }

    const title = `${calculator.meta.title} - EasyCalcHub`;
    const description = calculator.meta.description;
    const url = `https://easycalchub.com/${decodedSlug}`;
    const ogImage = `https://easycalchub.com/og/${decodedSlug}.png`; // Placeholder for dynamic OG gen

    return {
        title: title,
        description: description,
        keywords: [calculator.meta.title, calculator.category, 'calculator', 'free tool', 'online calculator', 'finance', 'math'],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: title,
            description: description,
            url: url,
            siteName: 'EasyCalcHub',
            type: 'website',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: calculator.meta.title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [ogImage]
        }
    };
}


export default async function CalculatorPage({ params }: Props) {
    const { slug } = await params;
    const calculator = getCalculator(safeDecode(slug));

    if (!calculator) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-5xl">
            <Breadcrumbs
                items={[
                    { label: calculator.category, href: `/?category=${calculator.category}` },
                    { label: calculator.meta.title }
                ]}
            />

            <div className="text-center mb-10 mt-6">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
                    {calculator.meta.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {calculator.meta.description}
                </p>
            </div>

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": calculator.meta.title,
                        "description": calculator.meta.description,
                        "applicationCategory": calculator.category,
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        // FAQ Schema if FAQs exist
                        ...(calculator.content.faqs && calculator.content.faqs.length > 0 ? {
                            "mainEntity": calculator.content.faqs.map(f => ({
                                "@type": "Question",
                                "name": f.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": f.answer
                                }
                            }))
                        } : {})
                    })
                }}
            />

            <CalculatorNav slug={slug} />

            <div className="mt-8">
                {slug === 'normal-calculator' ? (
                    <NormalCalculator />
                ) : slug === 'scientific-calculator' ? (
                    <ScientificCalculator />
                ) : slug === 'currency-converter' ? (
                    <CurrencyConverter />
                ) : (
                    <CalculatorView slug={slug} />
                )}
            </div>

            <CalculatorContent content={calculator.content} />

            {/* Footer Ad Slot */}
            <div className="mt-12">
                <AdSlot slotId="8901234567" format="auto" />
            </div>
        </main>
    );
}

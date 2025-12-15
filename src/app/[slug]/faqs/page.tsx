import { notFound } from "next/navigation";
import { getCalculator, calculators } from "@/lib/calculators";
import { CalculatorNav } from "@/components/calculator/calculator-nav";
import { AdSlot } from "@/components/ui/ad-slot";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return calculators.map((cal) => ({
        slug: cal.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const calculator = getCalculator(slug);
    return {
        title: `FAQs - ${calculator?.meta.title}`,
        description: `Frequently Asked Questions about ${calculator?.meta.title}.`,
    };
}

export default async function FaqPage({ params }: PageProps) {
    const { slug } = await params;
    const calculator = getCalculator(slug);

    if (!calculator) {
        notFound();
    }

    // Schema Markup for FAQ
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: calculator.content.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-muted-foreground">Everything you need to know</p>
            </div>

            <CalculatorNav slug={slug} />

            <div className="space-y-6">
                {calculator.content.faqs.map((faq, index) => (
                    <div key={index} className="bg-card p-6 rounded-xl border shadow-sm transition-all hover:shadow-md">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                ))}
            </div>

            {/* FAQ Ad */}
            <div className="mt-8">
                <AdSlot slotId="5678901234" format="auto" />
            </div>
        </main>
    );
}

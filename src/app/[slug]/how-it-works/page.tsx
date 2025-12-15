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
        title: `How It Works - ${calculator?.meta.title}`,
        description: `Learn how to use the ${calculator?.meta.title} and understand the formula behind it.`,
    };
}

export default async function HowItWorksPage({ params }: PageProps) {
    const { slug } = await params;
    const calculator = getCalculator(slug);

    if (!calculator) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-4">How It Works</h1>
                <p className="text-muted-foreground">Guide and Formula</p>
            </div>

            <CalculatorNav slug={slug} />

            <article className="prose prose-slate dark:prose-invert lg:prose-lg mx-auto bg-card p-8 rounded-2xl border shadow-sm">
                {/* Simple rendering for now. In real app, use a markdown component */}
                <div className="whitespace-pre-wrap font-sans text-foreground">
                    {/* Attempt to render rudimentary markdown-like layout */}
                    {calculator.content.howItWorks.split('\n').map((line, i) => {
                        if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace('### ', '')}</h3>;
                        if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
                        if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc mb-1">{line.replace('- ', '')}</li>;
                        if (line.startsWith('1. ')) return <li key={i} className="ml-4 list-decimal mb-1">{line.replace('1. ', '')}</li>;
                        return <p key={i} className="mb-2 leading-relaxed">{line}</p>;
                    })}
                </div>
            </article>

            {/* Article Ad */}
            <div className="mt-8">
                <AdSlot slotId="4567890123" format="auto" layout="-gw-1+2a-9x+5c" />
            </div>
        </main>
    );
}

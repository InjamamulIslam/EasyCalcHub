import { CalculatorContent as ContentType } from "@/types/calculator";
import { ChevronDown } from "lucide-react";

interface Props {
    content: ContentType;
}

export function CalculatorContent({ content }: Props) {
    if (!content) return null;

    return (
        <div className="space-y-12 mt-12">
            {/* How It Works Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="prose dark:prose-invert max-w-none space-y-4 text-slate-600 dark:text-slate-300">
                    <MarkdownViewer text={content.howItWorks} />
                </div>
            </div>

            {/* FAQs Section */}
            {content.faqs && content.faqs.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="text-blue-600 dark:text-blue-400">?</span> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {content.faqs.map((faq, index) => (
                            <details key={index} className="group border-b border-slate-100 dark:border-slate-800 last:border-0 pb-4 last:pb-0">
                                <summary className="flex items-center justify-between cursor-pointer list-none py-2 text-lg font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    {faq.question}
                                    <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
                                    <p>{faq.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Simple Markdown Renderer
function MarkdownViewer({ text }: { text: string }) {
    if (!text) return null;

    // Split by double newlines for paragraphs logic, 
    // but first let's handle blocks.
    const lines = text.split('\n');
    let output = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;

        // Formula Block \[ ... \]
        if (line.startsWith('\\[') && line.endsWith('\\]')) {
            const formula = line.replace('\\[', '').replace('\\]', '').trim();
            output.push(
                <div key={i} className="my-6 p-4 bg-slate-50 dark:bg-slate-800 border-l-4 border-blue-500 rounded-r-lg font-mono text-center text-lg text-slate-800 dark:text-slate-200 overflow-x-auto">
                    {parseInline(formula)}
                </div>
            );
            continue;
        }

        // Headers
        if (line.startsWith('### ')) {
            output.push(<h3 key={i} className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">{parseInline(line.replace('### ', ''))}</h3>);
        } else if (line.startsWith('## ')) {
            output.push(<h2 key={i} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{parseInline(line.replace('## ', ''))}</h2>);
        } else if (line.startsWith('- ')) {
            // List Items - could group them but simple rendering is okay for now
            output.push(
                <div key={i} className="flex gap-2 items-start mb-2 ml-1">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span className="flex-1">{parseInline(line.replace('- ', ''))}</span>
                </div>
            );
        } else {
            // Paragraph
            output.push(<p key={i} className="mb-4 leading-7 text-slate-600 dark:text-slate-300">{parseInline(line)}</p>);
        }
    }

    return <>{output}</>;
}

// Inline Parser for **bold**, `code`
function parseInline(text: string) {
    // We can use a simple split/map approach
    // This is not nested-safe but good enough for simple content
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={index} className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400">{part.slice(1, -1)}</code>;
        }
        return part;
    });
}

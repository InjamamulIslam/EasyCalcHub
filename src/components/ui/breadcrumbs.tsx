import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
    items: { label: string; href?: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
            <Link href="/" className="hover:text-primary transition-colors flex items-center">
                <Home className="w-4 h-4" />
            </Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-primary transition-colors font-medium">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-foreground font-semibold">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}

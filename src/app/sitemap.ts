import { MetadataRoute } from 'next';
import { calculators } from '@/lib/calculators';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://easycalchub.com';

    // 1. Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/disclaimer`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // 2. Dynamic Calculator Routes
    const calculatorRoutes: MetadataRoute.Sitemap = calculators.map((calc) => ({
        url: `${baseUrl}/${calc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 3. Category Routes (Optional, can be query params on home, but let's list them if we had pages)
    // Since categories are just query params on home page, we don't index them separately as pages usually
    // unless we make distinct pages for them. For now, sticking to tools.

    return [...staticRoutes, ...calculatorRoutes];
}

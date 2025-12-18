import { calculators } from "@/lib/calculators";
import { CalculatorDirectory } from "@/components/calculator/calculator-directory";
import { AdSlot } from "@/components/ui/ad-slot";

export default function Home() {
  // Serialize calculators for client component (exclude functions)
  const serializedCalculators = calculators.map(c => ({
    ...c,
    calculate: undefined // Remove function to avoid serialization error
  }));

  return (
    <main className="container mx-auto px-4 py-8 relative z-10 w-full min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Hero Section */}
        <header className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-center mb-6 tracking-tight text-foreground drop-shadow-sm dark:drop-shadow-2xl">
            Finance, Math & Daily Life <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Calculators</span>
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Free online tools for Finance, Business, Math, Education, Health, and Daily Utilities. Accurate, fast, and easy to use.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-card text-card-foreground rounded-xl p-4 shadow-md border border-border">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm font-semibold text-foreground">Instant Results</p>
            </div>
            <div className="bg-card text-card-foreground rounded-xl p-4 shadow-md border border-border">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm font-semibold text-foreground">100% Accurate</p>
            </div>
            <div className="bg-card text-card-foreground rounded-xl p-4 shadow-md border border-border">
              <div className="text-2xl mb-2">📱</div>
              <p className="text-sm font-semibold text-foreground">Mobile Friendly</p>
            </div>
            <div className="bg-card text-card-foreground rounded-xl p-4 shadow-md border border-border">
              <div className="text-2xl mb-2">🆓</div>
              <p className="text-sm font-semibold text-foreground">Always Free</p>
            </div>
          </div>
        </header>

        {/* Ad Slot 1 - Top Banner (After Hero) */}
        <div className="w-full py-6">
          <AdSlot slotId="1234567890" format="auto" />
        </div>

        {/* Calculator Directory */}
        {/* @ts-ignore */}
        <CalculatorDirectory calculators={serializedCalculators} />

        {/* Ad Slot 2 - Mid Content (Large Rectangle) */}
        <div className="w-full py-8">
          <AdSlot slotId="2345678901" format="rectangle" />
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-card text-card-foreground rounded-3xl p-8 lg:p-12 shadow-lg border border-border">
          <h2 className="text-3xl font-bold text-card-foreground mb-6 text-center">
            Why Choose Our Calculators?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                All calculations are done locally in your browser. Your data never leaves your device.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚙️</span>
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">Easy to Use</h3>
              <p className="text-sm text-muted-foreground">
                Simple, intuitive interface designed for everyone. No complex forms or confusing options.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">Detailed Results</h3>
              <p className="text-sm text-muted-foreground">
                Get comprehensive breakdowns with charts and tables for better understanding.
              </p>
            </div>
          </div>
        </div>

        {/* Ad Slot 3 - Bottom Banner */}
        <div className="w-full py-6 pb-12">
          <AdSlot slotId="3456789012" format="auto" />
        </div>

      </div>
    </main>
  );
}

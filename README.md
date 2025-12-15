# EasyCalcHub 🧮

**EasyCalcHub** is a comprehensive, production-ready calculator platform built with Next.js 16. It offers a suite of high-performance tools for Finance, Mathematics, Health, and Business, all designed with a premium, responsive UI.

![EasyCalcHub Preview](https://your-preview-image-link.com/screenshot.png)

## 🌟 Key Features

*   **Diverse Calculator Library**:
    *   **Finance**: EMI, SIP, FD, RD, PPF, GST, Income Tax.
    *   **Scientific**: Advanced trig, log, and memory functions.
    *   **Health**: BMI, BMR, Pregnancy Due Date.
    *   **Converters**: Real-time Currency & Crypto conversion.
*   **Production Ready**:
    *   **SEO Optimized**: Dynamic metadata, sitemap.xml, robots.txt, and JSON-LD schema.
    *   **AdSense Integrated**: Ad placements optimized for high CTR and compliance with "Valuable Inventory".
    *   **High Performance**: Lazy loaded scripts, optimized local fonts, and efficient calculation engines.
*   **Smart Architecture**:
    *   **Configuration Driven**: New calculators can be added by editing a central config file (`src/lib/calculators.ts`).
    *   **Local History**: Saves calculation history to `localStorage` for privacy and convenience.
    *   **Responsive Design**: Mobile-first UI with Tailwind CSS.

## 🛠 Tech Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Charts**: [Recharts](https://recharts.org/) / Chart.js
*   **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

*   Node.js 18+ installed
*   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/easycalchub.git
    cd easycalchub
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**:
    Copy the `.env.example` to `.env.local`:
    ```bash
    cp .env.example .env.local
    ```
    Populate the variables:
    *   `NEXT_PUBLIC_APP_URL`: Your local or production URL (e.g., `http://localhost:3000`).
    *   `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: Your Google AdSense Publisher ID (e.g., `ca-pub-1234567890123456`).

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── [slug]/          # Dynamic Calculator Pages
│   │   ├── layout.tsx       # Root layout with AdSense/Fonts
│   │   └── page.tsx         # Home Page
│   ├── components/
│   │   ├── calculator/      # Core Calculator UI Support
│   │   │   ├── interactive/ # Specific Calculator Logic (React)
│   │   │   └── ...
│   │   └── ui/              # Reusable Shadcn/Tailwind components
│   └── lib/
│       ├── calculators/     # Calculator Configuration Engines
│       │   ├── finance.ts
│       │   ├── math.ts
│       │   └── ...
│       └── calculators.ts   # Central Registry
└── public/                  # Static assets
```

## 🤝 Contributing

Contributions are welcome!
1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingCalculator`).
3.  Commit your changes (`git commit -m 'Add AmazingCalculator'`).
4.  Push to the branch (`git push origin feature/AmazingCalculator`).
5.  Open a Pull Request.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by Inja

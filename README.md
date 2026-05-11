## 📊 Demographic Insights

A sophisticated web dashboard providing high-level visual analysis of global demographic shifts. Leveraging the **United Nations Population Division API**, this application transforms complex datasets into intuitive, interactive, and high-fidelity visualizations.


## ✨ Features

-   **🌍 Global Overview**: Comprehensive insights into world demographic trends, including total population, life expectancy, and growth rates.
-   **⚖️ Comparative Analysis**: Side-by-side comparison of two countries across multiple indicators (e.g., Fertility Rate, Net Migration, Median Age).
-   **📈 Dynamic Visualizations**: Interactive time-series charts and population pyramids powered by Recharts.
-   **🔍 Granular Indicators**: Explore specific demographic metrics with historical data and future projections.
-   **🌓 Dark Mode Support**: Fully integrated dark and light themes for an optimal viewing experience.
-   **📱 Responsive Design**: Seamless performance across desktop, tablet, and mobile devices.

## 🚀 Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Library**: [React 19](https://reactjs.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) / Radix UI
-   **Charts**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **API**: [UN Population Division Data Portal](https://population.un.org/dataportal/home)

## 🛠️ Getting Started

### Prerequisites

-   Node.js 18.x or later
-   npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/demographic-insights.git
    cd demographic-insights
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open the application**:
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```text
demographic-insights/
├── app/                # Next.js App Router (pages, layout, globals)
│   ├── compare/        # Country comparison feature
│   ├── world/          # Global demographic overview
│   ├── components/     # Feature-specific components
│   └── layout.tsx      # Root layout & providers
├── components/         # Reusable UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API helpers
├── public/             # Static assets
└── package.json        # Project metadata and dependencies
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

-   Data provided by the [United Nations Population Division](https://population.un.org/dataportal/home).
-   Icons by [Lucide](https://lucide.dev/).
-   Inspiration from modern data visualization dashboards.

---

Built with ❤️ by [Vikas Saini](https://github.com/vikassaini)

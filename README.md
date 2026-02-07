# Sharestuff | Peer-to-Peer Luggage Storage Marketplace

**Live Demo:** [https://main.d1m7b.amplifyapp.com](https://github.com/mehrabmkhan/sharestuff-v1-stable)

Sharestuff is a high-performance, decentralized marketplace connecting travelers with verified local hosts for secure luggage storage. Built with a focus on trust, scalability, and modern UI/UX, this platform provides a seamless "check-in/check-out" experience using web-based QR scanning and dynamic insurance tiering.

## 🚀 How It Works

1. **Find & Book:** Travelers search for nearby storage "nodes" using an interactive map and filter by storage type, availability, and rating.
2. **Secure Drop-off:** Upon booking, a unique QR code is generated for the traveler's dashboard.
3. **Verified Check-in:** The host scans the traveler's QR code via the web-based scanner to officially start the storage timer and trigger insurance coverage.
4. **Automated Payouts:** After retrieval, the storage fee is calculated dynamically, and payouts are processed automatically via Stripe Connect.

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, and Tailwind CSS with Glassmorphism UI.
- **Backend Architecture:** Node.js with Express for marketplace logic.
- **Database:** PostgreSQL managed via Prisma for structured luggage and user data.
- **Cloud Infrastructure:** Hosted on **AWS Amplify** with integrated CI/CD pipelines.
- **Utilities:** Lucide-React for iconography and Framer Motion for interactive UI transitions.

## 🏗 Key Features

- **Dynamic Pricing Engine:** Calculates costs based on weight, value, urgency, and insurance tiers.
- **Dual-Dashboard System:** Dedicated views for Travelers (Drop-off management) and Hosts (Space management/QR Scanning).
- **Admin Command Center:** A centralized view for platform-wide oversight and dispute resolution.
- **Crowd-Courier Integration:** Ready for peer-to-peer item delivery modules.

## ☁️ Deployment on AWS

This project is deployed using **AWS Amplify**, leveraging the following cloud features:
- **CI/CD:** Automated builds triggered on every `git push` to the `main` branch.
- **Environment Management:** Secure handling of production secrets and database URLs.
- **Global Delivery:** Served via AWS's global edge locations for low-latency performance.

## 💻 Local Setup

1. Clone the repository:
   `git clone https://github.com/mehrabmkhan/sharestuff-v1-stable.git`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`

---
© 2026 Mehrab Mohsin Khan | Master of Engineering in Computer Networking @ TMU

import personal1 from "@/assets/work/personal-1.png";
import personal2 from "@/assets/work/personal-2.png";
import personal3 from "@/assets/work/personal-3.png";
import personalDashboard from "@/assets/work/personal-dashboard.png";
import personalReelInsights from "@/assets/work/personal-reel-insights.png";
import personalViewsCircle from "@/assets/work/personal-views-circle.png";
import personalContentType from "@/assets/work/personal-content-type.png";
import personalTopContent from "@/assets/work/personal-top-content.png";
import personalTopContent2 from "@/assets/work/personal-top-content-2.png";
import personalMarch from "@/assets/work/personal-march.png";
import personalApril from "@/assets/work/personal-april.png";
import personalJanuary from "@/assets/work/personal-january.png";
import personalViewsChart from "@/assets/work/personal-views-chart.png";
import yellow1 from "@/assets/work/yellow-1.png";
import yellow2 from "@/assets/work/yellow-2.png";
import coremars1 from "@/assets/work/coremars-1.png";
import coremars2 from "@/assets/work/coremars-2.png";
import coremarsPage from "@/assets/work/coremars-page.jpg";
import coremarsAnalysis from "@/assets/work/coremars-analysis.jpg";
import bosah1 from "@/assets/work/bosah-1.png";
import bosah2 from "@/assets/work/bosah-2.png";
import bosahPage from "@/assets/work/bosah-page.jpg";
import bosahAnalysis from "@/assets/work/bosah-analysis.jpg";

export const profile = {
  name: "Tomiwa Babatunde",
  tagline: "Social Media Manager · Content Strategist · Growth Marketer",
  location: "Lagos, Nigeria · Remote-Ready",
  email: "tommybab7@gmail.com",
  github: "https://github.com/tommy251",
  intro:
    "I grow brands on Instagram with viral Reels, data-led content calendars and audience strategy. 2M+ organic views, 4,400% client reach lift, and a personal Reel that hit 1.8M views — all in the last 12 months.",
};

export const stats = [
  { value: "1.9M", label: "Views in 30 days (Feb–Mar)" },
  { value: "1.8M", label: "Views on a single Reel" },
  { value: "916K", label: "Accounts reached" },
  { value: "98.3%", label: "Reach from non-followers" },
  { value: "+3,813%", label: "Accounts reached lift" },
  { value: "424.9K", label: "Interactions in 30 days" },
];

export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  category: "Personal" | "Real Estate" | "Finance" | "Lifestyle";
  stack: string[];
  summary: string;
  metrics: string[];
  accent: string;
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "personal-brand",
    title: "Personal Brand — Viral Reels Lab",
    period: "Feb — May 2026",
    role: "Strategy · Scripting · Editing",
    category: "Personal",
    stack: ["Reels Strategy", "Hooks", "Trend Analysis", "CapCut", "Analytics"],
    summary:
      "From 500 to 2,350+ followers in 2.5 months (and still climbing) — 1.9M views in 30 days, 1.8M on a single Reel, 98.3% from non-followers, 916K accounts reached (+3,813%). 100% Reels-driven. The lab where every system I sell to clients is tested first.",
    metrics: [
      "500 → 2,350+ followers (still growing)",
      "1.9M views (30d)",
      "1.8M top Reel",
      "916K accounts reached",
      "+3,813.9% reach lift",
      "424.9K interactions",
      "98.3% non-follower reach",
    ],
    accent: "from-[#ff9bd2] to-[#a45cff]",
    images: [
      personalViewsCircle,
      personalTopContent,
      personalTopContent2,
      personalReelInsights,
      personalDashboard,
      personalContentType,
      personalMarch,
      personalApril,
      personalJanuary,
      personalViewsChart,
      personal1,
      personal2,
      personal3,
    ],
  },
  {
    slug: "yellow-atlas",
    title: "Yellow Atlas Properties — Real Estate",
    period: "Mar — May 2026",
    role: "Social Media Manager",
    category: "Real Estate",
    stack: ["Content Calendar", "Carousels", "Reels", "Brand Design", "Lead Gen"],
    summary:
      "Built a full content engine for a Nigerian real-estate brand: educational carousels (Smart Investments, Dream Home Checklist), location-led Reels and trust-building campaigns.",
    metrics: ["9,084 views in 60 days", "+172.6% accounts reached", "6.6K-view top Reel"],
    accent: "from-[#ffd166] to-[#ef8354]",
    images: [yellow1, yellow2],
  },
  {
    slug: "coremars",
    title: "CoreMars Capital — Finance Education",
    period: "Apr — Sep 2025 · 6-mo contract",
    role: "Social Media Manager",
    category: "Finance",
    stack: ["Reels Hooks", "Finance Content", "Meta Ads", "Brevo", "ClickUp"],
    summary:
      "Grew a finance-education page from 77 → 4,400+ followers in 2 months. Authored Reels series (Woman Crush Wednesday, How African Mothers Invest, Real Estate Secrets) — top Reel hit 2,088 views organically.",
    metrics: ["77 → 4,400+ followers", "2,088 top Reel views", "Multiple 500+ view posts"],
    accent: "from-[#a8ffce] to-[#3dffae]",
    images: [coremars1, coremars2, coremarsPage, coremarsAnalysis],
  },
  {
    slug: "bosah-oak-roe",
    title: "Bosah Oak Roe — Lifestyle Brand",
    period: "Jan — Jun 2025 · 6-mo contract",
    role: "Social Media Manager",
    category: "Lifestyle",
    stack: ["Brand Calendars", "Stories", "Carousels", "Reels", "Reporting"],
    summary:
      "Owned the full social presence — organic Reels, branded carousels and story sequences. Delivered MoM growth and weekly performance reports that fed back into the next sprint's strategy.",
    metrics: ["Full-funnel ownership", "MoM organic growth", "Weekly KPI reporting"],
    accent: "from-[#7ec8e3] to-[#3d6aff]",
    images: [bosah1, bosah2, bosahPage, bosahAnalysis],
  },
];

export const categories = ["All", "Personal", "Real Estate", "Finance", "Lifestyle"] as const;

export const experience = [
  {
    role: "Social Media Manager",
    company: "Yellow Atlas Properties",
    period: "Mar — May 2026",
    bullets: [
      "Designed monthly content calendars across Reels, carousels and stories",
      "Drove +172.6% lift in accounts reached and a 6.6K-view top Reel in 60 days",
      "Built education-led campaigns (Smart Investments, Dream Home Checklist) to nurture leads",
    ],
  },
  {
    role: "Personal Brand — Reels Strategist",
    company: "Independent",
    period: "Feb — May 2026",
    bullets: [
      "500 → 2,350+ followers in 2.5 months (and still climbing) with a Reels-first system",
      "Single Reel reached 1.8M views; 98.3% of all reach came from non-followers",
      "Productised hooks, formats and posting cadence now reused for paying clients",
    ],
  },
  {
    role: "Social Media Manager (6-month contract)",
    company: "CoreMars Capital",
    period: "Apr — Sep 2025",
    bullets: [
      "Grew finance-education audience from 77 → 4,400+ in two months",
      "Created weekly Reels series (Woman Crush Wednesday, How African Mothers Invest)",
      "Applied the same viral Reels framework behind 1.8M-view personal content",
    ],
  },
  {
    role: "Social Media Manager (6-month contract)",
    company: "Bosah Oak Roe",
    period: "Jan — Jun 2025",
    bullets: [
      "Managed full social presence with organic Reels, carousels and stories",
      "Developed brand-aligned content calendars driving MoM growth",
      "Delivered performance reports and adjusted strategy from data",
    ],
  },
  {
    role: "Digital Marketing Project Coordinator",
    company: "Freelance · Lagos",
    period: "Oct — Dec 2025",
    bullets: [
      "Generated 57+ qualified leads via outreach and Brevo email automation",
      "Ran Meta Ads A/B tests, hit KPIs under ₦100K monthly budget",
      "Drove 4,400% reach growth and 90% website traffic increase for clients",
    ],
  },
];

export const skills = {
  "Content & Reels": [
    "Reels Strategy",
    "Hook Writing",
    "Trend Analysis",
    "Scripting",
    "Carousel Design",
    "Story Sequences",
  ],
  "Growth & Ads": ["Meta Ads Manager", "A/B Testing", "Audience Insights", "SEO Basics", "Lead Gen"],
  "Email & CRM": ["Brevo Automation", "Newsletter Strategy", "Drip Campaigns"],
  "Planning & Reporting": [
    "Content Calendars",
    "Monthly Roadmaps",
    "KPI Tracking",
    "ClickUp",
    "Stakeholder Reporting",
  ],
  "Design & Edit": ["Figma", "Canva", "CapCut", "Reels Editing"],
};

export const certs = [
  "Meta Social Media Marketing Professional Certificate (2023–2024)",
  "Google Digital Marketing & E-Commerce Certificate (2023–2024)",
  "Email Marketing Automation — Brevo (2025)",
  "Agile Project Management — PMI/Scrum Fundamentals (2022–2023)",
];

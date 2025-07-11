export const mockRepositories = [
  {
    id: 1,
    name: "portfolio-site",
    url: "https://github.com/john.doe/portfolio-site",
    language: "Next.js",
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: 2,
    name: "ecommerce-app",
    url: "https://github.com/john.doe/ecommerce-app",
    language: "React",
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: 3,
    name: "blog-platform",
    url: "https://github.com/john.doe/blog-platform",
    language: "Vue.js",
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: 4,
    name: "company-website",
    url: "https://github.com/john.doe/company-website",
    language: "HTML/CSS",
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
];

export const mockAuditIssues = [
  {
    error: "Missing meta description",
    file: "pages/index.js",
    line: 12,
    severity: "critical"
  },
  {
    error: "Title too short",
    file: "pages/about.js",
    line: 8,
    severity: "critical"
  },
  {
    error: "Missing alt text",
    file: "components/Hero.js",
    line: 24,
    severity: "warning"
  },
  {
    error: "Heading hierarchy skip",
    file: "src/pages/Products.js",
    line: 45,
    severity: "warning"
  },
  {
    error: "Missing structured data",
    file: "src/components/ProductCard.js",
    line: 18,
    severity: "warning"
  },
];

export const mockAIFixes = [
  {
    title: "Meta Description",
    description: "Add this meta description to your index.js file:",
    code: '<meta name="description" content="Professional portfolio showcasing modern web development projects and skills" />',
    file: "pages/index.js"
  },
  {
    title: "Title Optimization",
    description: "Update your about page title:",
    code: '<title>About John Doe - Full Stack Developer | Portfolio</title>',
    file: "pages/about.js"
  },
  {
    title: "Alt Text",
    description: "Add descriptive alt text to your hero image:",
    code: '<img src="hero.jpg" alt="Professional headshot of John Doe, web developer" />',
    file: "components/Hero.js"
  }
];

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAuditSchema, insertAiFixReportSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user (mock user for demo)
  app.get("/api/user", async (req, res) => {
    const user = await storage.getUser(1); // Mock user ID 1
    res.json(user);
  });

  // Get repositories for current user
  app.get("/api/repositories", async (req, res) => {
    const repositories = await storage.getRepositories(1); // Mock user ID 1
    res.json(repositories);
  });

  // Run audit on selected repositories
  app.post("/api/audit", async (req, res) => {
    const { repositoryIds } = req.body;
    
    const results = [];
    for (const repositoryId of repositoryIds) {
      // Mock audit results
      const mockIssues = [
        { error: "Missing meta description", file: "pages/index.js", line: 12, severity: "critical" },
        { error: "Title too short", file: "pages/about.js", line: 8, severity: "critical" },
        { error: "Missing alt text", file: "components/Hero.js", line: 24, severity: "warning" },
      ];
      
      const audit = await storage.createAudit({
        repositoryId,
        userId: 1,
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        issues: mockIssues,
        status: "complete",
      });
      
      results.push(audit);
    }
    
    res.json(results);
  });

  // Generate AI fixes for audit
  app.post("/api/ai-fix", async (req, res) => {
    const { auditId } = req.body;
    
    const mockFixes = [
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
    
    const aiFixReport = await storage.createAiFixReport({
      auditId,
      fixes: mockFixes,
      status: "generated",
    });
    
    res.json(aiFixReport);
  });

  // Get audit history
  app.get("/api/audits", async (req, res) => {
    const audits = await storage.getAudits(1); // Mock user ID 1
    res.json(audits);
  });

  // Get reports data
  app.get("/api/reports", async (req, res) => {
    const mockReportsData = {
      kpis: {
        overallScore: 87,
        scoreChange: 12,
        criticalIssues: 3,
        issuesChange: -2,
        totalAudits: 156,
        auditsChange: 23,
        repositories: 12
      },
      chartData: {
        seoScoreOverTime: [
          { month: "Jul", score: 75 },
          { month: "Aug", score: 78 },
          { month: "Sep", score: 82 },
          { month: "Oct", score: 85 },
          { month: "Nov", score: 84 },
          { month: "Dec", score: 87 }
        ],
        issuesBreakdown: [
          { type: "Critical", count: 3 },
          { type: "Warnings", count: 8 }
        ]
      },
      recentAudits: [
        { id: 1, repository: "portfolio-site", date: "2024-01-15", score: 92, issues: "2 critical", status: "In Progress" },
        { id: 2, repository: "ecommerce-app", date: "2024-01-14", score: 78, issues: "5 warnings", status: "Fixed" },
        { id: 3, repository: "blog-platform", date: "2024-01-13", score: 95, issues: "No issues", status: "Complete" },
        { id: 4, repository: "company-website", date: "2024-01-12", score: 65, issues: "8 critical", status: "Failed" },
        { id: 5, repository: "api-service", date: "2024-01-11", score: 88, issues: "3 warnings", status: "Fixed" }
      ]
    };
    
    res.json(mockReportsData);
  });

  const httpServer = createServer(app);
  return httpServer;
}

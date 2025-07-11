import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, type IStorage } from "./storage";
import { databaseStorage } from "./database";
import { insertAuditSchema, insertAiFixReportSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize database storage and mock data
  let activeStorage: IStorage = storage; // Default to in-memory storage
  
  if (process.env.DATABASE_URL) {
    try {
      await databaseStorage.initializeMockData();
      if (databaseStorage.isAvailable()) {
        activeStorage = databaseStorage as IStorage;
        console.log('Using database storage');
      } else {
        console.log('Database not available, using in-memory storage');
      }
    } catch (error) {
      console.log('Database initialization failed, using in-memory storage:', error);
    }
  } else {
    console.log('DATABASE_URL not provided, using in-memory storage');
  }

  // GitHub OAuth simulation endpoints
  app.get("/api/login", (req, res) => {
    // In a real implementation, this would redirect to GitHub OAuth
    // For demo purposes, we'll just redirect to dashboard
    res.redirect('/dashboard');
  });

  app.get("/api/logout", (req, res) => {
    // Clear session and redirect to home
    res.redirect('/');
  });

  // Get current user (mock user for demo)
  app.get("/api/user", async (req, res) => {
    const user = await activeStorage.getUser(1); // Mock user ID 1
    res.json(user);
  });

  // Get audit history
  app.get("/api/history", async (req, res) => {
    try {
      const audits = await activeStorage.getAudits(1); // Mock user ID 1
      const repositories = await activeStorage.getRepositories(1);
      const allFixes = await activeStorage.getAllAiFixReports();
      
      const activities = [];
      
      // Add audit activities
      for (const audit of audits) {
        const repo = repositories.find(r => r.id === audit.repositoryId);
        const auditFixes = allFixes.filter(fix => fix.auditId === audit.id);
        
        activities.push({
          id: `audit-${audit.id}`,
          type: 'audit',
          auditId: audit.id,
          repositoryName: repo?.name || 'Unknown Repository',
          score: audit.score,
          issues: audit.issues,
          issuesCount: Array.isArray(audit.issues) ? audit.issues.length : 0,
          date: audit.createdAt,
          status: audit.status,
          action: 'Audit'
        });
        
        // Add fix activities for this audit
        for (const fix of auditFixes) {
          activities.push({
            id: `fix-${fix.id}`,
            type: 'fix',
            auditId: audit.id,
            fixId: fix.id,
            repositoryName: repo?.name || 'Unknown Repository',
            fixes: Array.isArray(fix.fixes) ? fix.fixes.length : 0,
            date: fix.appliedAt || audit.createdAt,
            status: fix.status,
            action: 'Fix'
          });
        }
      }
      
      // Sort by date (most recent first)
      activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      res.json(activities);
    } catch (error) {
      console.error('Error fetching audit history:', error);
      res.status(500).json({ error: 'Failed to fetch audit history' });
    }
  });

  // Get reports data  
  app.get("/api/reports", async (req, res) => {
    try {
      const audits = await activeStorage.getAllAudits();
      const repositories = await activeStorage.getAllRepositories();
      const fixes = await activeStorage.getAllAiFixReports();
      
      // Generate reports data
      const reportData = {
        totalAudits: audits.length,
        totalRepositories: repositories.length,
        totalFixes: fixes.length,
        averageScore: audits.length > 0 ? Math.round(audits.reduce((sum, audit) => sum + (audit.score || 0), 0) / audits.length) : 0,
        recentAudits: audits.slice(-5).map(audit => {
          const repo = repositories.find(r => r.id === audit.repositoryId);
          return {
            id: audit.id,
            repositoryName: repo?.name || 'Unknown',
            score: audit.score,
            date: audit.createdAt,
            status: audit.status
          };
        }),
        scoreHistory: audits.slice(-10).map(audit => ({
          month: new Date(audit.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short' }),
          score: audit.score || 0
        })),
        issueTypes: [
          { type: 'Meta Tags', count: Math.floor(Math.random() * 20) + 5 },
          { type: 'Title Issues', count: Math.floor(Math.random() * 15) + 3 },
          { type: 'Structured Data', count: Math.floor(Math.random() * 10) + 2 },
          { type: 'Performance', count: Math.floor(Math.random() * 12) + 4 }
        ]
      };
      
      res.json(reportData);
    } catch (error) {
      console.error('Error generating reports:', error);
      res.status(500).json({ error: 'Failed to generate reports' });
    }
  });

  // Download endpoints for audit and fix reports
  app.get('/api/download/audit/:auditId', async (req, res) => {
    try {
      const auditId = parseInt(req.params.auditId);
      const audit = await activeStorage.getAuditById(auditId);
      
      if (!audit) {
        return res.status(404).json({ error: 'Audit not found' });
      }

      const repositories = await activeStorage.getRepositories(1);
      const repository = repositories.find(r => r.id === audit.repositoryId);
      const repositoryName = repository?.name || 'Unknown Repository';

      const mdData = `# SEO Audit Report

## Repository Information
- **Repository**: ${repositoryName}
- **Audit Date**: ${new Date(audit.createdAt || Date.now()).toLocaleDateString()}
- **SEO Score**: ${audit.score}%
- **Status**: ${audit.status}

## Issues Found

${Array.isArray(audit.issues) ? audit.issues.map((issue: any, index: number) => `
### ${index + 1}. ${issue.error}
- **File**: ${issue.file}
- **Line**: ${issue.line}
- **Severity**: ${issue.severity}
`).join('') : 'No issues data available'}

## Recommendations

Based on the audit results, here are the recommended actions:

1. **Critical Issues**: Address all critical severity issues first
2. **Warning Issues**: Review and fix warning level issues
3. **SEO Optimization**: Implement proper meta tags and structured data
4. **Performance**: Optimize page load times and core web vitals

---
*Report generated by Crawlin.io SEO Audit Tool*`;
      
      res.setHeader('Content-Type', 'text/markdown');
      res.setHeader('Content-Disposition', `attachment; filename="audit-${repositoryName}-${auditId}.md"`);
      res.send(mdData);
    } catch (error) {
      console.error('Error downloading audit:', error);
      res.status(500).json({ error: 'Failed to download audit' });
    }
  });

  app.get('/api/download/fix/:reportId', async (req, res) => {
    try {
      const reportId = parseInt(req.params.reportId);
      const report = await activeStorage.getAiFixReportById(reportId);
      
      if (!report) {
        return res.status(404).json({ error: 'Fix report not found' });
      }

      const mdData = `# AI Fix Report

## Fix Information
- **Report ID**: ${reportId}
- **Status**: ${report.status}
- **Applied Date**: ${report.appliedAt ? new Date(report.appliedAt).toLocaleDateString() : 'Not applied'}

## AI Generated Fixes

${Array.isArray(report.fixes) ? report.fixes.map((fix: any, index: number) => `
### ${index + 1}. ${fix.title || 'Fix'}
${fix.description || 'No description available'}

\`\`\`${fix.language || 'html'}
${fix.code || 'No code provided'}
\`\`\`

**File**: ${fix.file || 'Not specified'}
`).join('') : 'No fixes data available'}

## Application Status
- **Current Status**: ${report.status}
- **Next Steps**: ${report.status === 'applied' ? 'Fixes have been applied successfully' : 'Review and apply the suggested fixes'}

---
*Report generated by Crawlin.io AI Fix Tool*`;
      
      res.setHeader('Content-Type', 'text/markdown');
      res.setHeader('Content-Disposition', `attachment; filename="ai-fix-report-${reportId}.md"`);
      res.send(mdData);
    } catch (error) {
      console.error('Error downloading fix report:', error);
      res.status(500).json({ error: 'Failed to download fix report' });
    }
  });

  // Get repositories for current user
  app.get("/api/repositories", async (req, res) => {
    const repositories = await activeStorage.getRepositories(1); // Mock user ID 1
    res.json(repositories);
  });

  // Run audit on selected repositories
  app.post("/api/audit", async (req, res) => {
    const { repositoryId, repositoryIds } = req.body;
    
    // Handle single repository or multiple repositories
    const repoIds = repositoryIds || [repositoryId];
    
    const results = [];
    for (const repoId of repoIds) {
      // Mock audit results
      const mockIssues = [
        { error: "Missing meta description", file: "pages/index.js", line: 12, severity: "critical" },
        { error: "Title too short", file: "pages/about.js", line: 8, severity: "critical" },
        { error: "Missing alt text", file: "components/Hero.js", line: 24, severity: "warning" },
      ];
      
      const audit = await activeStorage.createAudit({
        repositoryId: repoId,
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
    
    const aiFixReport = await activeStorage.createAiFixReport({
      auditId,
      fixes: mockFixes,
      status: "generated",
    });
    
    res.json(aiFixReport);
  });

  // Get audit history
  app.get("/api/audits", async (req, res) => {
    const audits = await activeStorage.getAudits(1); // Mock user ID 1
    res.json(audits);
  });

  // Download audit report as markdown
  app.get("/api/download/audit/:id", async (req, res) => {
    const auditId = parseInt(req.params.id);
    const audit = await activeStorage.getAuditById(auditId);
    
    if (!audit) {
      return res.status(404).json({ error: "Audit not found" });
    }
    
    const repositories = await activeStorage.getAllRepositories();
    const repo = repositories.find((r: any) => r.id === audit.repositoryId);
    const issues = audit.issues as any[] || [];
    
    const markdown = `# SEO Audit Report
    
## Repository: ${repo?.name || 'Unknown'}
**Date:** ${audit.createdAt?.toLocaleDateString() || 'Unknown'}
**Score:** ${audit.score || 0}%
**Status:** ${audit.status || 'Unknown'}

## Issues Found (${issues.length})

${issues.map((issue: any, index: number) => `
### ${index + 1}. ${issue.error}
- **File:** ${issue.file}
- **Line:** ${issue.line}
- **Severity:** ${issue.severity}
`).join('\n')}

---
Generated by Crawlin.io SEO Audit Tool
`;
    
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', `attachment; filename="audit-${repo?.name || 'unknown'}-${audit.id}.md"`);
    res.send(markdown);
  });

  // Download AI fix report as markdown
  app.get("/api/download/fix/:id", async (req, res) => {
    const fixId = parseInt(req.params.id);
    const fixReport = await activeStorage.getAiFixReportById(fixId);
    
    if (!fixReport) {
      return res.status(404).json({ error: "Fix report not found" });
    }
    
    const allAudits = await activeStorage.getAllAudits();
    const audit = allAudits.find((a: any) => a.id === fixReport.auditId);
    const repositories = await activeStorage.getAllRepositories();
    const repo = audit ? repositories.find((r: any) => r.id === audit.repositoryId) : null;
    const fixes = fixReport.fixes as any[] || [];
    
    const markdown = `# AI Fix Report
    
## Repository: ${repo?.name || 'Unknown'}
**Date:** ${fixReport.appliedAt?.toLocaleDateString() || 'Unknown'}
**Status:** ${fixReport.status || 'Unknown'}
**Audit Score:** ${audit?.score || 0}%

## AI-Generated Fixes (${fixes.length})

${fixes.map((fix: any, index: number) => `
### ${index + 1}. ${fix.title}

**Description:** ${fix.description}

**File:** ${fix.file}

**Code:**
\`\`\`html
${fix.code}
\`\`\`
`).join('\n')}

---
Generated by Crawlin.io AI Fix Tool
`;
    
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', `attachment; filename="fix-${repo?.name || 'unknown'}-${fixReport.id}.md"`);
    res.send(markdown);
  });

  // Get combined history data
  app.get("/api/history", async (req, res) => {
    const audits = await activeStorage.getAllAudits();
    const fixReports = await activeStorage.getAllAiFixReports();
    const repositories = await activeStorage.getAllRepositories();
    
    const historyItems = [
      ...audits.map((audit: any) => {
        const repo = repositories.find((r: any) => r.id === audit.repositoryId);
        const issues = audit.issues as any[] || [];
        const criticalCount = issues.filter((i: any) => i.severity === 'critical').length;
        const warningCount = issues.filter((i: any) => i.severity === 'warning').length;
        
        return {
          id: `audit-${audit.id}`,
          auditId: audit.id,
          date: audit.createdAt?.toLocaleString() || 'Unknown',
          action: 'Audit',
          repository: repo?.name || 'Unknown',
          status: audit.status || 'Unknown',
          issues: criticalCount > 0 ? `${criticalCount} critical${warningCount > 0 ? `, ${warningCount} warnings` : ''}` : 
                  warningCount > 0 ? `${warningCount} warnings` : 'No issues',
          score: audit.score || 0,
          type: 'audit'
        };
      }),
      ...fixReports.map((fix: any) => {
        const audit = audits.find((a: any) => a.id === fix.auditId);
        const repo = audit ? repositories.find((r: any) => r.id === audit.repositoryId) : null;
        const fixes = fix.fixes as any[] || [];
        
        return {
          id: `fix-${fix.id}`,
          fixId: fix.id,
          date: fix.appliedAt?.toLocaleString() || 'Unknown',
          action: 'Fix',
          repository: repo?.name || 'Unknown',
          status: fix.status || 'Unknown',
          issues: `${fixes.length} fixes generated`,
          score: audit?.score || 0,
          type: 'fix'
        };
      })
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    res.json(historyItems);
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

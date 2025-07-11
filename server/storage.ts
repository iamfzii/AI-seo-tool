import { users, repositories, audits, aiFixReports, type User, type InsertUser, type Repository, type InsertRepository, type Audit, type InsertAudit, type AiFixReport, type InsertAiFixReport } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getRepositories(userId: number): Promise<Repository[]>;
  createRepository(repository: InsertRepository & { userId: number }): Promise<Repository>;
  updateRepository(id: number, updates: Partial<Repository>): Promise<Repository | undefined>;
  
  getAudits(userId: number): Promise<Audit[]>;
  getAuditsByRepository(repositoryId: number): Promise<Audit[]>;
  createAudit(audit: InsertAudit & { userId: number }): Promise<Audit>;
  
  getAiFixReports(auditId: number): Promise<AiFixReport[]>;
  createAiFixReport(report: InsertAiFixReport): Promise<AiFixReport>;
  
  // Additional methods for download functionality
  getAllAudits(): Promise<Audit[]>;
  getAllRepositories(): Promise<Repository[]>;
  getAllAiFixReports(): Promise<AiFixReport[]>;
  getAuditById(id: number): Promise<Audit | undefined>;
  getAiFixReportById(id: number): Promise<AiFixReport | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private repositories: Map<number, Repository>;
  private audits: Map<number, Audit>;
  private aiFixReports: Map<number, AiFixReport>;
  private currentUserId: number;
  private currentRepositoryId: number;
  private currentAuditId: number;
  private currentAiFixReportId: number;

  constructor() {
    this.users = new Map();
    this.repositories = new Map();
    this.audits = new Map();
    this.aiFixReports = new Map();
    this.currentUserId = 1;
    this.currentRepositoryId = 1;
    this.currentAuditId = 1;
    this.currentAiFixReportId = 1;
    
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Create a default user
    const defaultUser: User = {
      id: 1,
      username: "john.doe",
      password: "hashed_password",
      githubUsername: "john.doe",
      createdAt: new Date(),
    };
    this.users.set(1, defaultUser);
    this.currentUserId = 2;

    // Create mock repositories
    const mockRepos: Repository[] = [
      {
        id: 1,
        userId: 1,
        name: "portfolio-site",
        url: "https://github.com/john.doe/portfolio-site",
        language: "Next.js",
        lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        id: 2,
        userId: 1,
        name: "ecommerce-app",
        url: "https://github.com/john.doe/ecommerce-app",
        language: "React",
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        id: 3,
        userId: 1,
        name: "blog-platform",
        url: "https://github.com/john.doe/blog-platform",
        language: "Vue.js",
        lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        id: 4,
        userId: 1,
        name: "company-website",
        url: "https://github.com/john.doe/company-website",
        language: "HTML/CSS",
        lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
    ];
    
    mockRepos.forEach(repo => this.repositories.set(repo.id, repo));
    this.currentRepositoryId = 5;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      githubUsername: insertUser.githubUsername || null
    };
    this.users.set(id, user);
    return user;
  }

  async getRepositories(userId: number): Promise<Repository[]> {
    return Array.from(this.repositories.values()).filter(
      repo => repo.userId === userId
    );
  }

  async createRepository(repository: InsertRepository & { userId: number }): Promise<Repository> {
    const id = this.currentRepositoryId++;
    const repo: Repository = {
      ...repository,
      id,
      lastUpdated: new Date(),
      language: repository.language || null,
      isActive: repository.isActive ?? true
    };
    this.repositories.set(id, repo);
    return repo;
  }

  async updateRepository(id: number, updates: Partial<Repository>): Promise<Repository | undefined> {
    const repo = this.repositories.get(id);
    if (!repo) return undefined;
    
    const updatedRepo = { ...repo, ...updates };
    this.repositories.set(id, updatedRepo);
    return updatedRepo;
  }

  async getAudits(userId: number): Promise<Audit[]> {
    return Array.from(this.audits.values()).filter(
      audit => audit.userId === userId
    );
  }

  async getAuditsByRepository(repositoryId: number): Promise<Audit[]> {
    return Array.from(this.audits.values()).filter(
      audit => audit.repositoryId === repositoryId
    );
  }

  async createAudit(audit: InsertAudit & { userId: number }): Promise<Audit> {
    const id = this.currentAuditId++;
    const newAudit: Audit = {
      ...audit,
      id,
      createdAt: new Date(),
      status: audit.status || null,
      repositoryId: audit.repositoryId || null,
      score: audit.score || null,
      userId: audit.userId || null,
      issues: audit.issues || null
    };
    this.audits.set(id, newAudit);
    return newAudit;
  }

  async getAiFixReports(auditId: number): Promise<AiFixReport[]> {
    return Array.from(this.aiFixReports.values()).filter(
      report => report.auditId === auditId
    );
  }

  async createAiFixReport(report: InsertAiFixReport): Promise<AiFixReport> {
    const id = this.currentAiFixReportId++;
    const newReport: AiFixReport = {
      ...report,
      id,
      appliedAt: new Date(),
      status: report.status || null,
      auditId: report.auditId || null,
      fixes: report.fixes || null
    };
    this.aiFixReports.set(id, newReport);
    return newReport;
  }

  // Additional methods for download functionality
  async getAllAudits(): Promise<Audit[]> {
    return Array.from(this.audits.values());
  }

  async getAllRepositories(): Promise<Repository[]> {
    return Array.from(this.repositories.values());
  }

  async getAllAiFixReports(): Promise<AiFixReport[]> {
    return Array.from(this.aiFixReports.values());
  }

  async getAuditById(id: number): Promise<Audit | undefined> {
    return this.audits.get(id);
  }

  async getAiFixReportById(id: number): Promise<AiFixReport | undefined> {
    return this.aiFixReports.get(id);
  }
}

export const storage = new MemStorage();

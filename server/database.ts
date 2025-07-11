import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users, repositories, audits, aiFixReports, type User, type InsertUser, type Repository, type InsertRepository, type Audit, type InsertAudit, type AiFixReport, type InsertAiFixReport } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';
import type { IStorage } from './storage';

const connectionString = process.env.DATABASE_URL;

let client: any = null;
let db: any = null;
let isConnected = false;

if (connectionString) {
  try {
    client = postgres(connectionString);
    db = drizzle(client);
    
    // Test connection
    client.begin(async (sql: any) => {
      await sql`SELECT 1`;
      isConnected = true;
      console.log('Database connected successfully');
    }).catch((error: Error) => {
      console.warn('Database connection failed, falling back to in-memory storage:', error.message);
      isConnected = false;
    });
  } catch (error) {
    console.warn('Failed to initialize database connection:', error);
    isConnected = false;
  }
} else {
  console.log('DATABASE_URL not provided, using in-memory storage');
}

export class DatabaseStorage implements IStorage {
  private checkConnection() {
    if (!isConnected || !db) {
      throw new Error('Database not connected');
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    this.checkConnection();
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    this.checkConnection();
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    this.checkConnection();
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getRepositories(userId: number): Promise<Repository[]> {
    this.checkConnection();
    return await db.select().from(repositories).where(eq(repositories.userId, userId)).orderBy(desc(repositories.lastUpdated));
  }

  async createRepository(repository: InsertRepository & { userId: number }): Promise<Repository> {
    this.checkConnection();
    const result = await db.insert(repositories).values(repository).returning();
    return result[0];
  }

  async updateRepository(id: number, updates: Partial<Repository>): Promise<Repository | undefined> {
    this.checkConnection();
    const result = await db.update(repositories).set(updates).where(eq(repositories.id, id)).returning();
    return result[0];
  }

  async getAudits(userId: number): Promise<Audit[]> {
    this.checkConnection();
    return await db.select().from(audits).where(eq(audits.userId, userId)).orderBy(desc(audits.createdAt));
  }

  async getAuditsByRepository(repositoryId: number): Promise<Audit[]> {
    this.checkConnection();
    return await db.select().from(audits).where(eq(audits.repositoryId, repositoryId)).orderBy(desc(audits.createdAt));
  }

  async createAudit(audit: InsertAudit & { userId: number }): Promise<Audit> {
    this.checkConnection();
    const result = await db.insert(audits).values(audit).returning();
    return result[0];
  }

  async getAiFixReports(auditId: number): Promise<AiFixReport[]> {
    this.checkConnection();
    return await db.select().from(aiFixReports).where(eq(aiFixReports.auditId, auditId)).orderBy(desc(aiFixReports.appliedAt));
  }

  async createAiFixReport(report: InsertAiFixReport): Promise<AiFixReport> {
    this.checkConnection();
    const result = await db.insert(aiFixReports).values(report).returning();
    return result[0];
  }

  // Additional methods for download functionality
  async getAllAudits(): Promise<Audit[]> {
    this.checkConnection();
    return await db.select().from(audits).orderBy(desc(audits.createdAt));
  }

  async getAllRepositories(): Promise<Repository[]> {
    this.checkConnection();
    return await db.select().from(repositories).orderBy(desc(repositories.lastUpdated));
  }

  async getAllAiFixReports(): Promise<AiFixReport[]> {
    this.checkConnection();
    return await db.select().from(aiFixReports).orderBy(desc(aiFixReports.appliedAt));
  }

  async getAuditById(id: number): Promise<Audit | undefined> {
    this.checkConnection();
    const result = await db.select().from(audits).where(eq(audits.id, id)).limit(1);
    return result[0];
  }

  async getAiFixReportById(id: number): Promise<AiFixReport | undefined> {
    this.checkConnection();
    const result = await db.select().from(aiFixReports).where(eq(aiFixReports.id, id)).limit(1);
    return result[0];
  }

  // Initialize with mock data for demo
  async initializeMockData(): Promise<void> {
    try {
      if (!isConnected) {
        console.log('Database not connected, skipping mock data initialization');
        return;
      }

      // Check if user already exists
      const existingUser = await this.getUserByUsername('john.doe');
      if (existingUser) {
        console.log('Mock data already exists');
        return;
      }

      // Create mock user
      const mockUser = await this.createUser({
        username: 'john.doe',
        password: 'hashed_password',
        githubUsername: 'john.doe'
      });

      // Create mock repositories
      const mockRepos = [
        {
          userId: mockUser.id,
          name: 'portfolio-site',
          url: 'https://github.com/john.doe/portfolio-site',
          language: 'Next.js',
          isActive: true
        },
        {
          userId: mockUser.id,
          name: 'ecommerce-app',
          url: 'https://github.com/john.doe/ecommerce-app',
          language: 'React',
          isActive: true
        },
        {
          userId: mockUser.id,
          name: 'blog-platform',
          url: 'https://github.com/john.doe/blog-platform',
          language: 'Vue.js',
          isActive: true
        },
        {
          userId: mockUser.id,
          name: 'company-website',
          url: 'https://github.com/john.doe/company-website',
          language: 'HTML/CSS',
          isActive: true
        }
      ];

      for (const repo of mockRepos) {
        await this.createRepository(repo);
      }

      console.log('Mock data initialized successfully');
    } catch (error) {
      console.error('Failed to initialize mock data:', error);
    }
  }

  // Check if database is available
  isAvailable(): boolean {
    return isConnected && !!db;
  }


}

export const databaseStorage = new DatabaseStorage();
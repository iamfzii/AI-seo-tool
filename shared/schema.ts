import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  githubUsername: text("github_username"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const repositories = pgTable("repositories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  url: text("url").notNull(),
  language: text("language"),
  lastUpdated: timestamp("last_updated"),
  isActive: boolean("is_active").default(true),
});

export const audits = pgTable("audits", {
  id: serial("id").primaryKey(),
  repositoryId: integer("repository_id").references(() => repositories.id),
  userId: integer("user_id").references(() => users.id),
  score: integer("score"),
  issues: jsonb("issues"),
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiFixReports = pgTable("ai_fix_reports", {
  id: serial("id").primaryKey(),
  auditId: integer("audit_id").references(() => audits.id),
  fixes: jsonb("fixes"),
  appliedAt: timestamp("applied_at"),
  status: text("status"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  githubUsername: true,
});

export const insertRepositorySchema = createInsertSchema(repositories).pick({
  name: true,
  url: true,
  language: true,
  isActive: true,
});

export const insertAuditSchema = createInsertSchema(audits).pick({
  repositoryId: true,
  score: true,
  issues: true,
  status: true,
});

export const insertAiFixReportSchema = createInsertSchema(aiFixReports).pick({
  auditId: true,
  fixes: true,
  status: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Repository = typeof repositories.$inferSelect;
export type InsertRepository = z.infer<typeof insertRepositorySchema>;
export type Audit = typeof audits.$inferSelect;
export type InsertAudit = z.infer<typeof insertAuditSchema>;
export type AiFixReport = typeof aiFixReports.$inferSelect;
export type InsertAiFixReport = z.infer<typeof insertAiFixReportSchema>;

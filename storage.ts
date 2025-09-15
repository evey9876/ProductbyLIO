import { type User, type InsertUser, type TravelSubmission, type InsertTravelSubmission, users, travelSubmissions } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTravelSubmission(submission: InsertTravelSubmission): Promise<TravelSubmission>;
  listTravelSubmissions(): Promise<TravelSubmission[]>;
  getTravelSubmission(id: string): Promise<TravelSubmission | undefined>;
}

// Database connection setup
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createTravelSubmission(insertSubmission: InsertTravelSubmission): Promise<TravelSubmission> {
    const result = await db.insert(travelSubmissions).values(insertSubmission).returning();
    return result[0];
  }

  async listTravelSubmissions(): Promise<TravelSubmission[]> {
    return await db.select().from(travelSubmissions);
  }

  async getTravelSubmission(id: string): Promise<TravelSubmission | undefined> {
    const result = await db.select().from(travelSubmissions).where(eq(travelSubmissions.id, id)).limit(1);
    return result[0];
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private travelSubmissions: Map<string, TravelSubmission>;

  constructor() {
    this.users = new Map();
    this.travelSubmissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTravelSubmission(insertSubmission: InsertTravelSubmission): Promise<TravelSubmission> {
    const id = randomUUID();
    const submission: TravelSubmission = {
      id,
      name: insertSubmission.name,
      arrival_date: insertSubmission.arrival_date || null,
      arrival_time: insertSubmission.arrival_time || null,
      arrival_airline_flight: insertSubmission.arrival_airline_flight || null,
      departure_date: insertSubmission.departure_date || null,
      departure_time: insertSubmission.departure_time || null,
      departure_airline_flight: insertSubmission.departure_airline_flight || null,
      notes: insertSubmission.notes || null,
    };
    this.travelSubmissions.set(id, submission);
    return submission;
  }

  async listTravelSubmissions(): Promise<TravelSubmission[]> {
    return Array.from(this.travelSubmissions.values());
  }

  async getTravelSubmission(id: string): Promise<TravelSubmission | undefined> {
    return this.travelSubmissions.get(id);
  }
}

export const storage = new DbStorage();

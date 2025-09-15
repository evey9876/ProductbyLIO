import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const travelSubmissions = pgTable("travel_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  arrival_date: text("arrival_date"),
  arrival_time: text("arrival_time"),
  arrival_airline_flight: text("arrival_airline_flight"),
  departure_date: text("departure_date"),
  departure_time: text("departure_time"),
  departure_airline_flight: text("departure_airline_flight"),
  notes: text("notes"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTravelSubmissionSchema = createInsertSchema(travelSubmissions).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTravelSubmission = z.infer<typeof insertTravelSubmissionSchema>;
export type TravelSubmission = typeof travelSubmissions.$inferSelect;

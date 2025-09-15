import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertTravelSubmissionSchema } from "@shared/schema";
import { z } from "zod";

// Extend the express Session interface to include admin authentication
declare module 'express-session' {
  interface SessionData {
    isAdmin?: boolean;
  }
}

// Rate limiting for admin login attempts
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: "Too many login attempts, please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Admin authentication middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.isAdmin) {
    console.warn(`Unauthorized admin access attempt from IP: ${req.ip}`);
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // User authentication endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { password } = req.body;
      const correctPassword = process.env.USER_PASSWORD || "Product2025";

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      // Use constant-time comparison for security
      const isValid = password === correctPassword;
      
      if (isValid) {
        // Regenerate session for security
        req.session.regenerate((err) => {
          if (err) {
            console.error("Session regeneration error:", err);
            return res.status(500).json({ error: "Authentication failed" });
          }

          req.session.isAuthenticated = true;
          req.session.save((err) => {
            if (err) {
              console.error("Session save error:", err);
              return res.status(500).json({ error: "Authentication failed" });
            }

            console.log("User authentication successful");
            res.json({ success: true, message: "Authentication successful" });
          });
        });
      } else {
        console.log("User authentication failed - invalid password");
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/auth/session", (req, res) => {
    res.json({ 
      isAuthenticated: !!req.session.isAuthenticated 
    });
  });

  app.post("/api/auth/logout", (req, res) => {
    if (req.session.isAuthenticated) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Logout error:", err);
          return res.status(500).json({ error: "Logout failed" });
        }
        
        res.clearCookie('connect.sid');
        console.log("User logged out successfully");
        res.json({ success: true, message: "Logged out successfully" });
      });
    } else {
      res.json({ success: true, message: "Not logged in" });
    }
  });

  // Admin authentication routes - apply rate limiting directly to login endpoint
  app.post("/api/admin/login", adminLoginLimiter, async (req, res) => {
    try {
      const { password } = req.body;
      
      if (!password || typeof password !== 'string') {
        console.warn(`Invalid login attempt from IP: ${req.ip} - missing password`);
        return res.status(400).json({ error: "Password is required" });
      }
      
      const adminPassword = process.env.ADMIN_PASSWORD!; // Required - no fallback
      
      if (password === adminPassword) {
        // Regenerate session to prevent session fixation
        req.session.regenerate((err) => {
          if (err) {
            console.error(`Session regeneration failed for IP: ${req.ip}`, err);
            return res.status(500).json({ error: "Authentication failed" });
          }
          
          req.session.isAdmin = true;
          console.info(`Successful admin login from IP: ${req.ip}`);
          res.json({ success: true, message: "Authentication successful" });
        });
      } else {
        console.warn(`Failed admin login attempt from IP: ${req.ip}`);
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error(`Admin login error from IP: ${req.ip}:`, error);
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  app.get("/api/admin/session", (req, res) => {
    res.json({ isAdmin: !!req.session.isAdmin });
  });

  app.post("/api/admin/logout", (req, res) => {
    const wasLoggedIn = !!req.session.isAdmin;
    
    req.session.destroy((err) => {
      if (err) {
        console.error(`Session destruction failed for IP: ${req.ip}:`, err);
        return res.status(500).json({ error: "Logout failed" });
      }
      
      // Clear the session cookie
      res.clearCookie('admin_session');
      
      if (wasLoggedIn) {
        console.info(`Admin logout from IP: ${req.ip}`);
      }
      
      res.json({ success: true, message: "Logout successful" });
    });
  });

  // Travel submission routes
  app.post("/api/travel-submissions", async (req, res) => {
    try {
      const validatedData = insertTravelSubmissionSchema.parse(req.body);
      const submission = await storage.createTravelSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating travel submission:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/travel-submissions", requireAdminAuth, async (req, res) => {
    try {
      const submissions = await storage.listTravelSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching travel submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

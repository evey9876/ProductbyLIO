import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface AdminLoginPageProps {
  onAdminLogin: () => void;
}

export default function AdminLoginPage({ onAdminLogin }: AdminLoginPageProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest("POST", "/api/admin/login", { password });
      const data = await response.json();

      if (data.success) {
        console.log("Admin authentication successful");
        onAdminLogin();
        setLocation("/admin"); // Navigate to admin dashboard
      } else {
        setError("Invalid admin password");
      }
    } catch (error: any) {
      console.log("Admin authentication failed", error);
      setError(error.message || "Invalid admin password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  const handleBack = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--midnight-blue)', color: 'var(--white)' }}>
      <Card className="w-full max-w-md shadow-xl" style={{ background: 'var(--white)', color: 'var(--midnight-blue)', borderRadius: '10px' }}>
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBack}
              variant="ghost"
              size="sm"
              className="p-2"
              style={{ color: 'var(--midnight-blue)' }}
              data-testid="button-back-to-event"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1" />
          </div>
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Shield className="w-6 h-6" />
            Admin Access
          </CardTitle>
          <CardDescription style={{ color: 'var(--midnight-blue)' }}>
            Enter admin password to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-center border"
                style={{ 
                  border: '1px solid var(--light-grey)',
                  borderRadius: '5px',
                  padding: '10px',
                  width: '100%'
                }}
                data-testid="input-admin-password"
                autoFocus
              />
              {error && (
                <p className="text-sm text-center" style={{ color: 'var(--red)' }} data-testid="text-admin-error">
                  {error}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full border-none cursor-pointer"
              style={{
                background: 'var(--cisco-blue)',
                color: 'var(--white)',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none'
              }}
              disabled={isLoading}
              data-testid="button-admin-unlock"
            >
              {isLoading ? "Authenticating..." : "Access Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
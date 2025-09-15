import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const correctPassword = "Product2025"; // todo: remove mock functionality

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === correctPassword) {
      console.log("Authentication successful");
      onLogin();
    } else {
      setError("Incorrect password!");
      console.log("Authentication failed");
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--midnight-blue)', color: 'var(--white)' }}>
      <Card className="w-full max-w-md shadow-xl" style={{ background: 'var(--white)', color: 'var(--midnight-blue)', borderRadius: '10px' }}>
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            LIO Product Meeting Q2 FY25
          </CardTitle>
          <CardDescription style={{ color: 'var(--midnight-blue)' }}>
            Please enter the password to access event details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-center border transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                style={{ 
                  border: '2px solid var(--light-grey)',
                  borderRadius: '5px',
                  padding: '12px',
                  width: '100%',
                  fontSize: '16px',
                  backgroundColor: 'var(--white)',
                  outline: 'none'
                }}
                data-testid="input-password"
                autoFocus
              />
              {error && (
                <p className="text-sm text-center" style={{ color: 'var(--red)' }} data-testid="text-error">
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
              data-testid="button-unlock"
            >
              {isLoading ? "Unlocking..." : "Unlock"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
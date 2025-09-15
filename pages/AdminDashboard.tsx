import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import type { TravelSubmission } from "@shared/schema";

interface AdminDashboardProps {
  onAdminLogout: () => void;
}

export default function AdminDashboard({ onAdminLogout }: AdminDashboardProps) {
  const [, setLocation] = useLocation();

  const { data: submissions, isLoading, error } = useQuery<TravelSubmission[]>({
    queryKey: ["/api/travel-submissions"],
  });

  const handleBack = () => {
    setLocation("/");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>
        <div className="container mx-auto px-4 py-8">
          <Card className="border-0 shadow-none bg-card">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-destructive text-base" data-testid="text-error">
                  Error loading travel submissions. Please try again.
                </p>
                <Button onClick={handleBack} className="mt-4" data-testid="button-back-error">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button 
            onClick={handleBack}
            variant="outline"
            size="sm"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Event
          </Button>
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <Button 
            onClick={onAdminLogout}
            variant="ghost"
            size="sm"
            data-testid="button-admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Admin Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-none bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-card-foreground">
              Travel Submissions
            </CardTitle>
            <p className="text-base text-card-foreground">
              {isLoading ? "Loading..." : `${submissions?.length || 0} total submissions`}
            </p>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-base text-card-foreground" data-testid="text-loading">
                  Loading travel submissions...
                </p>
              </div>
            ) : submissions && submissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-submissions">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-bold text-card-foreground text-base">Name</th>
                      <th className="text-left py-3 px-2 font-bold text-card-foreground text-base">Arrival Date</th>
                      <th className="text-left py-3 px-2 font-bold text-card-foreground text-base">Arrival Time</th>
                      <th className="text-left py-3 px-2 font-bold text-card-foreground text-base">Arrival Flight</th>
                      <th className="text-left py-3 px-2 font-bold text-card-foreground text-base">Departure Date</th>
                      <th className="text-left py-3 px-2 font-bold text-card-foreground text-base">Departure Time</th>
                      <th className="text-left py-3 px-2 font-bold text-card-foreground text-base">Departure Flight</th>
                      <th className="text-left py-3 px-2 font-bold text-card-foreground text-base">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission, index) => (
                      <tr key={submission.id} className="border-b border-border" data-testid={`row-submission-${index}`}>
                        <td className="py-3 px-2 text-base text-card-foreground" data-testid={`cell-name-${index}`}>
                          {submission.name}
                        </td>
                        <td className="py-3 px-2 text-base text-card-foreground" data-testid={`cell-arrival-date-${index}`}>
                          {submission.arrival_date || "-"}
                        </td>
                        <td className="py-3 px-2 text-base text-card-foreground" data-testid={`cell-arrival-time-${index}`}>
                          {submission.arrival_time || "-"}
                        </td>
                        <td className="py-3 px-2 text-base text-card-foreground" data-testid={`cell-arrival-flight-${index}`}>
                          {submission.arrival_airline_flight || "-"}
                        </td>
                        <td className="py-3 px-2 text-base text-card-foreground" data-testid={`cell-departure-date-${index}`}>
                          {submission.departure_date || "-"}
                        </td>
                        <td className="py-3 px-2 text-base text-card-foreground" data-testid={`cell-departure-time-${index}`}>
                          {submission.departure_time || "-"}
                        </td>
                        <td className="py-3 px-2 text-base text-card-foreground" data-testid={`cell-departure-flight-${index}`}>
                          {submission.departure_airline_flight || "-"}
                        </td>
                        <td className="py-3 px-2 text-base text-card-foreground max-w-xs" data-testid={`cell-notes-${index}`}>
                          <div className="truncate" title={submission.notes || ""}>
                            {submission.notes || "-"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-base text-card-foreground" data-testid="text-no-submissions">
                  No travel submissions found.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
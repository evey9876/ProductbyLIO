import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Settings } from "lucide-react";
import EventHero from "./EventHero";
import AgendaSection from "./AgendaSection";
import PreWorkSection from "./PreWorkSection";
import TravelForm from "./TravelForm";
import FAQSection from "./FAQSection";
import NextStepsSection from "./NextStepsSection";
import DetailedAgendaSection from "./DetailedAgendaSection";
import TabContainer from "./TabContainer";

interface EventPageProps {
  onLogout: () => void;
}

export default function EventPage({ onLogout }: EventPageProps) {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    console.log("Logging out");
    onLogout();
  };

  const handleAdminAccess = () => {
    setLocation("/admin-login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', lineHeight: '1.6' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background border-border">
        <div className="container mx-auto px-4 py-3 flex justify-end items-center gap-2">
          <Button 
            onClick={handleAdminAccess}
            variant="ghost"
            size="sm"
            data-testid="button-admin"
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Button>
          <Button 
            onClick={handleLogout}
            variant="outline"
            size="sm"
            data-testid="button-logout"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <EventHero />

      {/* Main Content */}
      <TabContainer 
        tabs={[
          {
            id: "nextsteps",
            label: "What To Do Now",
            content: <NextStepsSection />
          },
          {
            id: "agenda",
            label: "Summary Agenda",
            content: <AgendaSection />
          },
          {
            id: "travel",
            label: "Travel Form",
            content: <TravelForm />
          },
          {
            id: "faq",
            label: "FAQ",
            content: <FAQSection />
          },
          {
            id: "prework",
            label: "Pre-Work",
            content: <PreWorkSection />
          },
          {
            id: "detailedagenda",
            label: "Detailed Agenda",
            content: <DetailedAgendaSection />
          }
        ]}
      />
    </div>
  );
}
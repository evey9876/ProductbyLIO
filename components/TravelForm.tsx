import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type InsertTravelSubmission } from "@shared/schema";

interface TravelFormData {
  name: string;
  arrival_date: string;
  arrival_time: string;
  arrival_airline_flight: string;
  departure_date: string;
  departure_time: string;
  departure_airline_flight: string;
  notes: string;
}

export default function TravelForm() {
  const [formData, setFormData] = useState<TravelFormData>({
    name: "",
    arrival_date: "",
    arrival_time: "",
    arrival_airline_flight: "",
    departure_date: "",
    departure_time: "",
    departure_airline_flight: "",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const createTravelSubmission = useMutation({
    mutationFn: async (data: InsertTravelSubmission) => {
      const response = await apiRequest("POST", "/api/travel-submissions", data);
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Your travel details have been submitted successfully.",
      });
      // Invalidate travel submissions query if needed
      queryClient.invalidateQueries({ queryKey: ["/api/travel-submissions"] });
    },
    onError: (error: Error) => {
      console.error("Error submitting travel form:", error);
      toast({
        title: "Error",
        description: "Failed to submit travel details. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert formData to match the schema
    const submissionData: InsertTravelSubmission = {
      name: formData.name,
      arrival_date: formData.arrival_date || null,
      arrival_time: formData.arrival_time || null,
      arrival_airline_flight: formData.arrival_airline_flight || null,
      departure_date: formData.departure_date || null,
      departure_time: formData.departure_time || null,
      departure_airline_flight: formData.departure_airline_flight || null,
      notes: formData.notes || null,
    };

    createTravelSubmission.mutate(submissionData);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--green)', color: 'var(--white)', fontSize: '2rem' }}>
          ✓
        </div>
        <h3 className="text-lg font-semibold mb-2 text-white">Travel Details Submitted!</h3>
        <p className="text-white">Thank you for providing your travel information.</p>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none bg-card">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-card-foreground font-bold">Your Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            data-testid="input-name"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '400px',
              margin: '10px 0',
              padding: '10px',
              border: '1px solid var(--medium-grey)',
              borderRadius: '5px'
            }}
          />
        </div>
        
        {/* Arrival Section */}
        <div className="space-y-4">
          <h3 className="text-card-foreground font-bold text-lg">Arrival Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="arrival_date" className="text-card-foreground font-bold">Arrival Date</label>
              <input
                id="arrival_date"
                name="arrival_date"
                type="date"
                value={formData.arrival_date}
                onChange={handleChange}
                data-testid="input-arrival-date"
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '400px',
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid var(--medium-grey)',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="arrival_time" className="text-card-foreground font-bold">Arrival Time</label>
              <input
                id="arrival_time"
                name="arrival_time"
                type="time"
                value={formData.arrival_time}
                onChange={handleChange}
                data-testid="input-arrival-time"
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '400px',
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid var(--medium-grey)',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="arrival_airline_flight" className="text-card-foreground font-bold">Airline & Flight Number</label>
              <input
                id="arrival_airline_flight"
                name="arrival_airline_flight"
                value={formData.arrival_airline_flight}
                onChange={handleChange}
                placeholder="e.g. United 1234"
                data-testid="input-arrival-airline-flight"
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '400px',
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid var(--medium-grey)',
                  borderRadius: '5px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Departure Section */}
        <div className="space-y-4">
          <h3 className="text-card-foreground font-bold text-lg">Departure Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="departure_date" className="text-card-foreground font-bold">Departure Date</label>
              <input
                id="departure_date"
                name="departure_date"
                type="date"
                value={formData.departure_date}
                onChange={handleChange}
                data-testid="input-departure-date"
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '400px',
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid var(--medium-grey)',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="departure_time" className="text-card-foreground font-bold">Departure Time</label>
              <input
                id="departure_time"
                name="departure_time"
                type="time"
                value={formData.departure_time}
                onChange={handleChange}
                data-testid="input-departure-time"
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '400px',
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid var(--medium-grey)',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="departure_airline_flight" className="text-card-foreground font-bold">Airline & Flight Number</label>
              <input
                id="departure_airline_flight"
                name="departure_airline_flight"
                value={formData.departure_airline_flight}
                onChange={handleChange}
                placeholder="e.g. United 5678"
                data-testid="input-departure-airline-flight"
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '400px',
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid var(--medium-grey)',
                  borderRadius: '5px'
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-card-foreground font-bold">Special Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Special notes (dietary, etc.)"
            rows={3}
            data-testid="textarea-notes"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '400px',
              margin: '10px 0',
              padding: '10px',
              border: '1px solid var(--medium-grey)',
              borderRadius: '5px',
              resize: 'vertical'
            }}
          />
        </div>

        <button 
          type="submit"
          disabled={createTravelSubmission.isPending}
          data-testid="button-submit-travel"
          style={{
            background: 'var(--cisco-blue)',
            color: 'var(--white)',
            border: 'none',
            padding: '10px 20px',
            marginTop: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            opacity: createTravelSubmission.isPending ? 0.7 : 1
          }}
        >
          {createTravelSubmission.isPending ? "Submitting..." : "Submit"}
        </button>
        </form>
      </CardContent>
    </Card>
  );
}
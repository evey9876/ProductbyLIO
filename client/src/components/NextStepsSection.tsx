import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const nextSteps = [
  "Book your flight - due end of September",
  "Book Courtyard by Marriott Raleigh Cary/Parkside Town Commons through concur",
  "Complete Travel Form"
];

export default function NextStepsSection() {
  return (
    <div>
      <Card className="border-0 shadow-none bg-card">
        <CardContent className="pt-6 space-y-3">
          {nextSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <span 
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 bg-primary text-primary-foreground"
                data-testid={`number-step-${index + 1}`}
              >
                {index + 1}
              </span>
              <p className="text-base text-card-foreground" data-testid={`text-step-${index + 1}`}>
                {step}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
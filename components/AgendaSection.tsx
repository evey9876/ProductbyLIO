import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface AgendaDay {
  title: string;
  items: string[];
}

const agendaDays: AgendaDay[] = [
  {
    title: "Monday 3 Nov – Travel / Arrivals",
    items: ["Group Dinner – optional depending on arrival times"]
  },
  {
    title: "Tuesday 4 Nov – Strategy & Product",
    items: [
      "Welcome & introductions",
      "FY26 priorities & North Star vision",
      "Product & market spotlights",
      "Team & culture working sessions",
      "",
      "Group Dinner – Product Team"
    ]
  },
  {
    title: "Wednesday 5 Nov – Leadership & Innovation",
    items: [
      "Lessons & key wins spotlights",
      "Challenges to the North Star (Stop/Start/Continue)",
      "Give Back activity – afternoon",
      "",
      "Group Dinner – possibly with CH team",
      "",
      "Optional departures for those travelling internationally"
    ]
  },
  {
    title: "Thursday 6 Nov – Collaboration & Wrap-Up",
    items: [
      "Working sessions with CH team (TBC – optional)",
      "",
      "Afternoon departures"
    ]
  }
];

export default function AgendaSection() {
  return (
    <div className="space-y-4">
      {agendaDays.map((day, index) => (
        <Card key={index} className="border-0 shadow-none bg-card">
          <CardContent className="pt-6">
            <div className="pl-4" data-testid={`agenda-day-${index}`}>
              <h3 className="font-bold text-xl mb-2 text-card-foreground">
                {day.title}
              </h3>
              <ul className="space-y-1">
                {day.items.map((item, itemIndex) => (
                  item === "" ? (
                    <li key={itemIndex} className="h-2"></li>
                  ) : (
                    <li key={itemIndex} className="text-base flex items-start gap-2 text-card-foreground">
                      <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--cisco-blue)' }}></span>
                      {item}
                    </li>
                  )
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
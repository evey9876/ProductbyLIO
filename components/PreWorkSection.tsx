import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

const preWorkItems = [
  "Product Managers : prep 5 min spotlight presentation on their Product - more details to follow",
  "Product Managers : prep 2 min spotlight presentation on a key win/ key success / key learning  - more details to follow"
];

export default function PreWorkSection() {
  return (
    <Card className="border-0 shadow-none bg-card">
      <CardContent className="pt-6">
        <div className="space-y-3">
          {preWorkItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3" data-testid={`prework-item-${index}`}>
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--cisco-blue)' }}></div>
              <span className="text-card-foreground">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
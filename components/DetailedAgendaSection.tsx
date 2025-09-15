import { Card, CardContent } from "@/components/ui/card";

export default function DetailedAgendaSection() {
  return (
    <Card className="border-0 shadow-none bg-card">
      <CardContent className="pt-6">
        <p className="text-base text-card-foreground">To Follow</p>
      </CardContent>
    </Card>
  );
}
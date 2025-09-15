import { Card, CardContent } from "@/components/ui/card";

export default function EventHero() {
  return (
    <div className="border-0 shadow-none text-center py-16 px-8" style={{ background: 'var(--cisco-blue)', color: 'var(--white)' }}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--white)' }}>
        LIO Product Meeting Q2 FY25
      </h1>
      <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--white)' }}>
        Welcome to our team offsite! Here's everything you need to know.
      </p>
    </div>
  );
}
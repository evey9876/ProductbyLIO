import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What airport should I fly into?",
    answer: "Durham, Raleigh"
  },
  {
    question: "Is food provided?",
    answer: "Breakfast will be at your hotel as part of B&B package.\n\nLunch (when onsite) will be available in cafe near to meeting room.\n\nDinners on Monday, Tuesday and Wednesday will be booked in advance."
  },
  {
    question: "What should I bring?",
    answer: "Comfortable clothes & shoes for outdoor activity\nLaptop\nWater bottle\nSnacks if you get hungry!"
  },
  {
    question: "If I want to stay longer than Thursday what do I do?",
    answer: "Ask your Director"
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Card className="border-0 shadow-none bg-card">
        <CardContent className="pt-6">
          <div className="w-full">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-4" data-testid={`faq-item-${index}`}>
                <summary 
                  className="font-bold cursor-pointer mb-2 text-card-foreground flex items-start gap-3" 
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-bold flex-shrink-0" style={{ color: 'var(--cisco-blue)' }}>Q</span>
                  <span>{item.question}</span>
                </summary>
                {openIndex === index && (
                  <div className="mt-2 pl-4 text-card-foreground whitespace-pre-line">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabContainerProps {
  tabs: Tab[];
}

export default function TabContainer({ tabs }: TabContainerProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-bold cursor-pointer border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'text-primary border-b-primary' 
                  : 'text-foreground border-b-transparent hover:text-primary'
              }`}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{ display: activeTab === tab.id ? 'block' : 'none' }}
            data-testid={`tab-content-${tab.id}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
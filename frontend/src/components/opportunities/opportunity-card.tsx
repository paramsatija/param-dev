import React from 'react';

interface Opportunity {
  title: string;
  value: string;
  stage: string;
}

const OpportunityCard: React.FC<{ opportunity: Opportunity }> = ({ opportunity }) => {
  return (
    <div className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">{opportunity.title}</h3>
          <p className="text-sm text-gray-600">${opportunity.value}</p>
        </div>
        <span className="text-gray-400 group-hover:text-gray-900 transition-colors">
          Stage: {opportunity.stage}
        </span>
      </div>
    </div>
  );
};

export default OpportunityCard;


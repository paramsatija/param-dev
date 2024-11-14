import React from 'react';

interface Lead {
  name: string;
  company: string;
}

const LeadItem: React.FC<{ lead: Lead }> = ({ lead }) => {
  return (
    <div className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium text-gray-900">{lead.name}</h4>
          <p className="text-sm text-gray-600">{lead.company}</p>
        </div>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
      </div>
    </div>
  );
};

export default LeadItem;


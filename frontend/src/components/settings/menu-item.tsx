import React from 'react';

interface Setting {
  name: string;
  description: string;
}

const MenuItem: React.FC<Setting> = ({ name, description }) => {
  return (
    <div className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transform hover:-translate-x-1 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
      </div>
    </div>
  );
};

export default MenuItem;


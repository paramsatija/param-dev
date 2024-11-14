import React from 'react';

interface Activity {
  description: string;
  time: string;
}

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <div className="group p-3 hover:bg-gray-50 rounded-lg transform hover:-translate-x-1 transition-all duration-200">
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <p className="flex-1 text-sm">{activity.description}</p>
        <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
          {activity.time}
        </span>
      </div>
    </div>
  );
};

export default ActivityItem;


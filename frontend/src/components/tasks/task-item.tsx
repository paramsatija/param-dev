import React from 'react';

interface Task {
  title: string;
  dueDate: string;
}

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input type="checkbox" className="rounded border-gray-300" />
          <span>{task.title}</span>
        </div>
        <span className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
          Due: {task.dueDate}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;


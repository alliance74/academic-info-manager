
import React from 'react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {student.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {student.email}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Age {student.age}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Course:</span> {student.course}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Enrolled:</span> {new Date(student.enrollmentDate).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;

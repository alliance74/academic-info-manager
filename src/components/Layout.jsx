
import React, { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

const Layout = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingStudent, setEditingStudent] = useState(null);
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();

  const handleAddStudent = (studentData) => {
    addStudent(studentData);
    setCurrentView('dashboard');
  };

  const handleUpdateStudent = (studentData) => {
    updateStudent(editingStudent.id, studentData);
    setEditingStudent(null);
    setCurrentView('dashboard');
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setCurrentView('edit');
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'add':
        return (
          <StudentForm
            onSubmit={handleAddStudent}
            onCancel={() => setCurrentView('dashboard')}
          />
        );
      case 'edit':
        return (
          <StudentForm
            initialData={editingStudent}
            onSubmit={handleUpdateStudent}
            onCancel={() => {
              setEditingStudent(null);
              setCurrentView('dashboard');
            }}
            isEditing={true}
          />
        );
      default:
        return (
          <StudentList
            students={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
            onAddNew={() => setCurrentView('add')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Student Management System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('add')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'add'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Layout;

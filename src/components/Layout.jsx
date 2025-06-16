
import React, { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, UserPlus, Home, BarChart3 } from 'lucide-react';

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
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <UserPlus className="h-6 w-6 text-blue-600" />
                  Add New Student
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StudentForm
                  onSubmit={handleAddStudent}
                  onCancel={() => setCurrentView('dashboard')}
                />
              </CardContent>
            </Card>
          </div>
        );
      case 'edit':
        return (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Users className="h-6 w-6 text-green-600" />
                  Edit Student
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StudentForm
                  initialData={editingStudent}
                  onSubmit={handleUpdateStudent}
                  onCancel={() => {
                    setEditingStudent(null);
                    setCurrentView('dashboard');
                  }}
                  isEditing={true}
                />
              </CardContent>
            </Card>
          </div>
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

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      active: currentView === 'dashboard'
    },
    {
      id: 'add',
      label: 'Add Student',
      icon: UserPlus,
      active: currentView === 'add'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Student Management
                </h1>
                <p className="text-xs text-gray-500">Manage your students with ease</p>
              </div>
            </div>

            {/* Stats Badge */}
            <div className="hidden sm:flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                <BarChart3 className="h-3 w-3 mr-1" />
                {students.length} Students
              </Badge>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  variant={item.active ? "default" : "ghost"}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    item.active 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200/50 mt-16">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 Student Management System. Built with React & Love ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

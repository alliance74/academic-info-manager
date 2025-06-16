
import React, { useState } from 'react';
import StudentCard from './StudentCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Filter, 
  Users, 
  UserPlus, 
  BookOpen,
  SortAsc,
  Grid3X3,
  List
} from 'lucide-react';

const StudentList = ({ students, onEdit, onDelete, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Get unique courses for filter
  const courses = [...new Set(students.map(student => student.course))];

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = selectedCourse === '' || student.course === selectedCourse;
      return matchesSearch && matchesCourse;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          return a.age - b.age;
        case 'course':
          return a.course.localeCompare(b.course);
        case 'date':
          return new Date(b.enrollmentDate) - new Date(a.enrollmentDate);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Students Dashboard</h2>
          <p className="text-gray-600">Manage and view all registered students</p>
        </div>
        
        <Button 
          onClick={onAddNew}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Avg Age</p>
                <p className="text-2xl font-bold">
                  {students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.age, 0) / students.length) : 0}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Course Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white/80 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="lg:w-40">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white/80 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="name">Sort by Name</option>
                <option value="age">Sort by Age</option>
                <option value="course">Sort by Course</option>
                <option value="date">Sort by Date</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-1 border border-gray-200 rounded-md p-1 bg-white/80">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCourse) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedCourse && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Course: {selectedCourse}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredStudents.length}</span> of <span className="font-semibold">{students.length}</span> students
        </p>
      </div>

      {/* Students Grid/List */}
      {filteredStudents.length === 0 ? (
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCourse 
                ? "Try adjusting your search criteria" 
                : "Get started by adding your first student"}
            </p>
            <Button onClick={onAddNew} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add First Student
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={() => onEdit(student)}
              onDelete={() => onDelete(student.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;

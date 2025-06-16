
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Mail, 
  Calendar, 
  BookOpen, 
  User, 
  Edit3, 
  Trash2,
  GraduationCap 
} from 'lucide-react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAgeColor = (age) => {
    if (age < 20) return 'bg-green-100 text-green-800 border-green-200';
    if (age < 25) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-purple-100 text-purple-800 border-purple-200';
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 ring-2 ring-blue-100">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {student.name}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <User className="h-3 w-3 mr-1" />
                Student ID: {student.id}
              </div>
            </div>
          </div>
          
          <Badge 
            variant="secondary" 
            className={`${getAgeColor(student.age)} font-medium`}
          >
            Age {student.age}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-3 text-gray-400" />
            <span className="truncate">{student.email}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="h-4 w-4 mr-3 text-gray-400" />
            <span className="font-medium text-gray-800">{student.course}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-3 text-gray-400" />
            <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Course Badge */}
        <div className="mb-4">
          <Badge variant="outline" className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200">
            <GraduationCap className="h-3 w-3 mr-1" />
            {student.course}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="flex-1 group/btn hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all"
          >
            <Edit3 className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            size="sm"
            className="flex-1 group/btn hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all"
          >
            <Trash2 className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;

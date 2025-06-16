
import React, { useState, useEffect } from 'react';
import { COURSES } from '../types/Student';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Save, 
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const StudentForm = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
    enrollmentDate: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        age: initialData.age?.toString() || '',
        course: initialData.course || '',
        enrollmentDate: initialData.enrollmentDate || ''
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 16 || formData.age > 100) {
      newErrors.age = 'Please enter a valid age between 16 and 100';
    }
    
    if (!formData.course) {
      newErrors.course = 'Course is required';
    }
    
    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = 'Enrollment date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const studentData = {
        ...formData,
        age: parseInt(formData.age)
      };
      
      await onSubmit(studentData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter student\'s full name',
      icon: User,
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter email address',
      icon: Mail,
      required: true
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Enter age',
      icon: User,
      required: true
    },
    {
      name: 'enrollmentDate',
      label: 'Enrollment Date',
      type: 'date',
      placeholder: '',
      icon: Calendar,
      required: true
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <field.icon className="h-4 w-4 text-gray-500" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`transition-all duration-200 ${
                    errors[field.name] 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
              </div>
              {errors[field.name] && (
                <Alert variant="destructive" className="mt-1">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    {errors[field.name]}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ))}
        </div>

        {/* Course Selection */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="course" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-500" />
            Course
            <span className="text-red-500">*</span>
          </Label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={`w-full h-10 px-3 rounded-md border text-sm transition-all duration-200 ${
              errors.course 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          >
            <option value="">Select a course</option>
            {COURSES.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          {errors.course && (
            <Alert variant="destructive" className="mt-1">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {errors.course}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Available Courses */}
        <Card className="bg-blue-50/50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Available Courses
            </h4>
            <div className="flex flex-wrap gap-2">
              {COURSES.map(course => (
                <Badge 
                  key={course} 
                  variant="secondary" 
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-colors"
                  onClick={() => setFormData(prev => ({ ...prev, course }))}
                >
                  {course}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {isEditing ? 'Updating...' : 'Adding...'}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isEditing ? 'Update Student' : 'Add Student'}
              </div>
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 hover:bg-gray-50 transition-colors"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;

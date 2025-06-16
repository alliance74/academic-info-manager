
import { useState } from 'react';

// Mock initial data
const initialStudents = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    age: 20,
    course: 'Computer Science',
    enrollmentDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    age: 19,
    course: 'Mathematics',
    enrollmentDate: '2024-01-20'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    age: 21,
    course: 'Physics',
    enrollmentDate: '2024-02-01'
  }
];

export const useStudents = () => {
  const [students, setStudents] = useState(initialStudents);

  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: Date.now().toString()
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, ...updatedData } : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const getStudent = (id) => {
    return students.find(student => student.id === id);
  };

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudent
  };
};

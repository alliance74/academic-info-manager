
import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8 ring-2 ring-blue-200">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      <Button
        onClick={logout}
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-red-600 hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">Logout</span>
      </Button>
    </div>
  );
};

export default UserProfile;

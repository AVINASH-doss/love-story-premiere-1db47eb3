import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MessagesBoard from '@/components/MessagesBoard';

const MessagesPage: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only couple can access messages page
    if (!isAuthenticated || userRole !== 'couple') {
      navigate('/');
    }
  }, [isAuthenticated, userRole, navigate]);

  return <MessagesBoard />;
};

export default MessagesPage;

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/providers/auth-provider';

export const useSocket = () => {
  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current && isAuthenticated && user?.id) {
      // Initialize socket connection
      socketRef.current = io(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', {
        withCredentials: true,
        transports: ['websocket', 'polling'],
      });

      // Join user-specific room
      socketRef.current.emit('join-user-room', user.id);

      // Handle connection events
      socketRef.current.on('connect', () => {
        console.log('Connected to socket server');
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isAuthenticated, user?.id]);

  const subscribeToAssignments = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('assignment-updated', callback);
    }
  };

  const subscribeToActivities = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('activity-created', callback);
    }
  };

  const subscribeToPerformance = (callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('performance-updated', callback);
    }
  };

  const emitAssignmentUpdate = (data: any) => {
    if (socketRef.current && user?.id) {
      socketRef.current.emit('assignment-update', {
        ...data,
        userId: user.id,
      });
    }
  };

  const emitNewActivity = (data: any) => {
    if (socketRef.current && user?.id) {
      socketRef.current.emit('new-activity', {
        ...data,
        userId: user.id,
      });
    }
  };

  const emitPerformanceUpdate = (data: any) => {
    if (socketRef.current && user?.id) {
      socketRef.current.emit('performance-update', {
        ...data,
        userId: user.id,
      });
    }
  };

  return {
    subscribeToAssignments,
    subscribeToActivities,
    subscribeToPerformance,
    emitAssignmentUpdate,
    emitNewActivity,
    emitPerformanceUpdate,
  };
}; 
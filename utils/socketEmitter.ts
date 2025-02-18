import { Server as SocketIOServer } from 'socket.io';

class SocketEmitter {
  private static instance: SocketEmitter;
  private io: SocketIOServer | null = null;

  private constructor() {}

  static getInstance(): SocketEmitter {
    if (!SocketEmitter.instance) {
      SocketEmitter.instance = new SocketEmitter();
    }
    return SocketEmitter.instance;
  }

  setIO(io: SocketIOServer) {
    this.io = io;
  }

  emitAssignmentUpdate(userId: string, data: any) {
    if (this.io) {
      this.io.to(`user-${userId}`).emit('assignment-updated', data);
    }
  }

  emitNewActivity(userId: string, data: any) {
    if (this.io) {
      this.io.to(`user-${userId}`).emit('activity-created', data);
    }
  }

  emitPerformanceUpdate(userId: string, data: any) {
    if (this.io) {
      this.io.to(`user-${userId}`).emit('performance-updated', data);
    }
  }
}

export const socketEmitter = SocketEmitter.getInstance(); 
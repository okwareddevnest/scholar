"use client"; // Add this line at the top

import { useEffect, useState } from 'react';
import './progress-tracking.css'; // Import CSS for styles

interface Order {
  id: number;
  title: string;
  status: string;
  estimatedCompletion: string;
  milestones: string[];
  writerComments: string[];
}

const ProgressTracking = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const response = await fetch('/api/orders'); // Assume you have an API endpoint for orders
    const data: Order[] = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount
  }, []);

  return (
    <div className="tracking-container">
      <h1>Order Progress Tracking</h1>
      {orders.map((order: Order) => (
        <div key={order.id} className="order-item">
          <h2>{order.title}</h2>
          <p>Status: {order.status}</p>
          <p>Estimated Completion: {order.estimatedCompletion}</p>
          <h3>Milestones:</h3>
          <ul>
            {order.milestones.map((milestone: string, index: number) => (
              <li key={index}>{milestone}</li>
            ))}
          </ul>
          <h3>Writer Comments:</h3>
          <ul>
            {order.writerComments.map((comment: string, index: number) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProgressTracking;
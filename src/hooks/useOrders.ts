import { useState, useCallback } from 'react';
import type { Order } from '../types';
import { saveOrder, getOrders, generateRedeemCode, generateOrderId } from '../lib/storage';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(() => getOrders());

  const addOrder = useCallback((order: Omit<Order, 'id' | 'redeemCode' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: generateOrderId(),
      redeemCode: generateRedeemCode(),
      createdAt: Date.now(),
    };
    saveOrder(newOrder);
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  }, []);

  return { orders, addOrder, updateOrderStatus };
}

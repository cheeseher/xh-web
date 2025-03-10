import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // 添加商品到购物车
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      // 检查商品是否已在购物车中
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);

      if (existingItemIndex > -1) {
        // 如果已存在，增加数量
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // 如果不存在，添加新商品
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // 从购物车移除商品
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 更新商品数量
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // 清空购物车
  const clearCart = () => {
    setItems([]);
  };

  // 计算购物车中的商品总数
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // 计算购物车中的商品总价
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 自定义Hook，用于在组件中使用购物车上下文
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
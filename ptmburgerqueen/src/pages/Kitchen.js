import React, { useEffect, useState } from 'react';
import firestore from './utils/Firebase';
import OrderCard from '../components/OrderCard';

function Kitchen() {
  const [kitchenOrder, setkitchenOrder] = useState([]);

  useEffect(() => {
    firestore
      .collection('Orders')
      .get().then((snapshot) => {
        const order = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setkitchenOrder(order)
        })
  }, [])

  return (
    <div>
    <h2>Pedidos</h2>
      <div>
        {kitchenOrder.map((item) => <OrderCard
          key={item.id} 
          table={item.table}
          customer={item.customer}
          total={item.total}
          />
        )}
      </div>
    </div>
)}

export default Kitchen
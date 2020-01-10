import React, { useEffect, useState } from 'react';
import firestore from './utils/Firebase';
import { StyleSheet, css } from 'aphrodite';
import OrderCard from '../components/OrderCard';

const styles = StyleSheet.create({
  
  kitchenPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRadius: '8px',
    margin: '2%',
    backgroundColor: '#4F4F4F',    
  },
  
  title: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  
});

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
    <div className={css(styles.kitchenPage)}>
      < p className={css(styles.title)}>PEDIDOS PENDENTES</p>
        <div className={css(styles.orderContainer)}>
          {kitchenOrder.map((i, index) => 
            <OrderCard
              key={index} 
              table={i.table}
              customer={i.customer}
              order={i.order.map(i => {
                return(
                <div>
                {i.count}
                {i.Name}
                </div>
              )})}
            />
              )}
        </div>
    </div>
)
};

export default Kitchen;
import React, { useEffect, useState } from 'react';
import firestore from './utils/Firebase';
import { StyleSheet, css } from 'aphrodite';
import OrderCard from '../components/OrderCard';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    // color: 'white',
  },

  banana: {
    backgroundColor: '#FFF9C7'
  }
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
    <div className={css(styles.banana)}>
    <p className={css(styles.title)}>Pedidos</p>
      <div>
        {kitchenOrder.map((i) => <OrderCard
          key={i.id} 
          table={i.table}
          customer={i.customer}
          order={i.order.map(i => {
            return(
            <div>
            <span>{i.Name},{i.count}</span>
            </div>
          )})}
          total={i.total}
          />
          )}
      </div>
    </div>
)
};

export default Kitchen;
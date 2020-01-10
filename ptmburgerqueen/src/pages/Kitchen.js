import React, { useEffect, useState } from 'react';
import firestore from './utils/Firebase';
import { StyleSheet, css } from 'aphrodite';
import OrderCard from '../components/OrderCard';

const styles = StyleSheet.create({
  
  kitchenPage: {
    display: 'flex',    
  },

  cardOrdersContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    height: '600px',
    borderRadius: '8px',
    margin: '0% 1% 0% 1%',
    backgroundColor: '#4F4F4F',
  },
  
  title: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  
  orderContainer: {
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
    flexWrap: 'wrap',
  }
});

function Kitchen() {
  const [kitchenOrder, setkitchenOrder] = useState([]);
  // const [status, setStatus] = useState([]);

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

  function readyOrder(){

  } 

  return (
    <div className={css(styles.kitchenPage)}>
      <div className={css(styles.cardOrdersContainer)}>
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

        <div className={css(styles.cardOrdersContainer)}>
          <p className={css(styles.title)}>PEDIDOS PRONTOS</p>

        </div>

    </div>
)
};

export default Kitchen;
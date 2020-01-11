import React, { useEffect, useState } from 'react';
import firestore from './utils/Firebase';
import { StyleSheet, css } from 'aphrodite';
import OrderCard from '../components/OrderCard';
import Button from '../components/Button';

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
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
  },
  
  orderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    flexWrap: 'wrap',
  },

  ordercard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '85%',
    margin: '2%',
    padding: '2%',
    backgroundColor: '#FFFDE0', 
    borderRadius: '5px',
    fontSize: '22px',
  },

  btnOrderReady: {
    margin: '3% 0 3% 0',
    width: '170px',
    height:'60px',
    backgroundColor:'green',
    borderRadius:'5px',
    border:'none',
    color: 'white',
    fontSize:'19px',
    fontWeight:'bold',
  },

});

function Waiter() {
  const [done, setDone] = useState([]);
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    firestore
      .collection('Orders')
      .orderBy('addTime', 'asc')
      .get().then((snapshot) => {
        const order = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
       setDone(order.filter(doc => doc.status === 'done'))
       setDelivered(order.filter(doc => doc.status === 'delivered'))
      })
  }, [])

  function orderDelivered(item){
    firestore
      .collection('Orders')
      .doc(item.id)
      .update({
        status: 'delivered',
        // time: new Date().getTime()
      })

      const newDone = done.filter((el) => el.id !== item.id);
      setDone(newDone);

      const newDelivered = [...delivered, {...item, status: 'delivered'}];
      setDelivered(newDelivered);
  } 

  return (
    <div className={css(styles.kitchenPage)}>
      <div className={css(styles.cardOrdersContainer)}>
        <p className={css(styles.title)}>PEDIDOS PRONTOS</p>
          <div className={css(styles.orderContainer)}>
            {done.map((item, index) => 
            <div className={css(styles.ordercard)}>
              <OrderCard
                key={index} 
                table={item.table}
                customer={item.customer}
                order={item.order.map(item => {
                  return(
                    <div>
                      {item.count}
                      {item.Name} {item.extra}
                    </div>
                )})}
              />
                <Button
                  className={css(styles.btnOrderReady)}
                  handleClick={(e) => {
                    orderDelivered(item)
                    e.preventDefault()
                  }}
                  title={'Pedido Entregue'}
                />
            </div>
            )}
          </div>
      </div>

      <div className={css(styles.cardOrdersContainer)}>
        <p className={css(styles.title)}>PEDIDOS ENTREGUES</p>
        <div className={css(styles.orderContainer)}>
          {delivered.map((item, index) =>
            <div className={css(styles.ordercard)}>
              <OrderCard
                key={index}
                table={item.table}
                customer={item.customer}
                orderDelivered={() => orderDelivered(item)}
                order={item.order.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.count}
                      {item.Name} {item.extra}
                    </div>
                  )
                })}
                />
                <div>Total: {item.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Waiter;
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
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  
  ordercard: {
    width: '80%',
    margin: '2%',
    padding: '2%',
    backgroundColor: '#FFFDE0',
    borderRadius: '5px',
  },

  btnOrderReady: {
    margin: '3% 0 3% 0',
    width: '120px',
    height:'30px',
    backgroundColor:'green',
    borderRadius:'5px',
    border:'none',
    color: 'white',
    fontSize:'15px',
    fontWeight:'bold',
  },

  orderContainer: {
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
    flexWrap: 'wrap',
  }
});

function Kitchen() {
  const [pending, setPending] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    firestore
      .collection('Orders')
      .orderBy('addTime', 'asc')
      .get().then((snapshot) => {
        const order = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
       setPending(order.filter(doc => doc.status === 'pending'))
       setDone(order.filter(doc => doc.status === 'done'))
      })
  }, [])

  function orderDone(item){
    firestore
      .collection('Orders')
      .doc(item.id)
      .update({
        status: 'done',
        time: new Date().getTime()
      })

      const newPending = pending.filter((el) => el.id !== item.id);
      setPending(newPending);

      const newDone = [...done, {...item, status: 'done'}];
      setDone(newDone);
  } 

  return (
    <div className={css(styles.kitchenPage)}>
      <div className={css(styles.cardOrdersContainer)}>
        < p className={css(styles.title)}>PEDIDOS PENDENTES</p>
          <div className={css(styles.orderContainer)}>
            {pending.map((i, index) => 
            <div className={css(styles.ordercard)}>
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
                <Button
                  className={css(styles.btnOrderReady)}
                  handleClick={(e) => {
                    orderDone(i)
                    e.preventDefault()
                  }}
                  title={'Pedido Pronto'}
                />
                </div>
                )}

      </div>
        </div>

        <div className={css(styles.cardOrdersContainer)}>
        <p className={css(styles.title)}>PEDIDOS PRONTOS</p>
        <div className={css(styles.orderContainer)}>
          {done.map((i, index) =>
            <div className={css(styles.ordercard)}>
              <OrderCard
                key={index}
                table={i.table}
                customer={i.customer}
                orderDone={() => orderDone(i)}
                order={i.order.map((i, index) => {
                  return (
                    <div key={index}>
                      {i.count}
                      {i.Name}
                    </div>
                  )
                })}
              />
            </div>
          )}
          </div>

    </div>
    </div>
)
};

export default Kitchen;
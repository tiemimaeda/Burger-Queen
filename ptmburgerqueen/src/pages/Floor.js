import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import firestore from './utils/Firebase';
import Button from '../components/Button';
import Input from '../components/Input';
import Menu from '../components/Menu';
import Order from '../components/Order';

function ShowMenu() {
  const [category, setCategory] = useState('Café da Manhã');
  const [customer, setCustomer] = useState('');
  const [table, setTable] = useState('');
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [breakfastItems, setBreakfastItems] = useState([]);
  const [lunchItems, setLunchItems] = useState([]);

  useEffect(() => {
    firestore
      .collection('Menu')
      .get().then((snapshot) => {
        const fullMenu = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setBreakfastItems(fullMenu.filter(doc => doc.Category === 'Café da Manhã'));
        setLunchItems(fullMenu.filter(doc => doc.Category === 'Lanches'));
      })
  }, [])

  const categoryItems = category === 'Lanches' ? lunchItems : breakfastItems;

  function createOrder(item) {
    setOrder([...order, item])
  }

  function sendOrder() {
    firestore
      .collection('Orders')
      .add({
        customer,
        table,
        order,
        total
      })
      .then(() => {
        setCustomer('')
        setTable('')
        setOrder([])
        setTotal([])
      })
  }

  return (
    <div className={css(styles.floorPage)}>
      <div className={css(styles.styleMenu)}>
        <p className={css(styles.title)}>MENU</p>
        <div className={css(styles.btnMeals)}>
          <Button
            className={css(styles.btnMenu)}
            handleClick={(e) => {
              setCategory('Café da Manhã');
              e.preventDefault()
            }}
            title={'Café da Manhã'}
          />

          <Button
            className={css(styles.btnMenu)}
            handleClick={(e) => {
              setCategory('Lanches');
              e.preventDefault()
            }}
            title={'Almoço/Jantar'}
          />
        </div>
        
        <div className={css(styles.productsList)}>
          {categoryItems.map((item) => <Menu item={item} createOrder={createOrder} />)}
        </div>
      </div>

      <div className={css(styles.styleMenu)}>
        <p className={css(styles.title)}>RESUMO DO PEDIDO</p>
        <Input class='input' label='Nome: ' type='text' value={customer}
          handleChange={e => setCustomer(e.currentTarget.value)} holder='Nome do Cliente'
        />

        <Input class='input' label='Mesa: ' type='text' value={table}
          handleChange={e => setTable(e.currentTarget.value)} holder='Número da Mesa'
        />

        <p>ITENS</p>
        {order.map((item) => <Order item={item} createOrder={createOrder} />)}
        <p>Total: {total + total}</p>
        <Button className={css(styles.btnSendOrder)}
          handleClick={(e) => {
            setOrder(sendOrder);
            e.preventDefault()
          }} title={'Enviar'}
        />
      </div>
    </div>
  );
}

export default ShowMenu;

const styles = StyleSheet.create({
  floorPage: {
    display: 'flex'
  },

  styleMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    borderRadius: '5px',
    marginLeft: '2%',
    marginRight: '2%',
    backgroundColor: '#fffcf1'
  },

  title: {
    textAlign: 'center',
  },
  
  btnMeals: {
    display: 'flex',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    marginBottom: '30px',
  },

  btnMenu: {
    width: '120px',
    height: '50px',
    borderRadius: '6px',
    backgroundColor: '#ff9f1c',
    color: 'white',
    fontWeight: 'bold',
  },

  btnProducts: {
    marginBottom: '20px',
  },
  
  productsList: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '2%',
  }

})
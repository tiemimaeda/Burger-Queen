import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import firestore from './utils/Firebase';
import Button from '../components/Button';
import Input from '../components/Input';
import Menu from '../components/Menu';
import Order from '../components/Order';

function ShowMenu(Category) {
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
    },[])

    const categoryItems = category === 'Lanches' ? lunchItems : breakfastItems;

    function createOrder(item){
      setOrder([...order, item])
    }

    function sendOrder(){
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
          <h1 className={css(styles.title)}>Menu</h1>   
          <div className={css(styles.btnMeals)}>
            <Button 
              className={css(styles.btnBreakfast)} 
              handleClick={(e) => { 
                setCategory('Café da Manhã'); 
                e.preventDefault() }}
              title={'Café da Manhã'}
            />

            <Button 
              className={css(styles.btnLunch)} 
              handleClick={(e) => { 
                setCategory('Lanches'); 
                e.preventDefault() }}
              title={'Almoço/Jantar'}
            />
          </div>
          
          {categoryItems.map((item) => <Menu item={item} createOrder={createOrder}/>)}
          <div clasName={css(styles.styleMenu)}>
            <h2 className={css(styles.title)}>Pedidos</h2>
            <Input class='input' label='Nome: ' type='text' value= {customer}
            handleChange={e => setCustomer(e.currentTarget.value)} holder='Nome do Cliente'
            />

            <Input class='input' label='Mesa: ' type='text' value= {table}
            handleChange={e => setTable(e.currentTarget.value)} holder='Número da Mesa'
            />

            {order.map((item) => <Order item={item} createOrder={createOrder}/>)}
              <p>Total: {total + total}</p>
              <Button className={css(styles.btnLunch)}
              handleClick={(e) => {
                setOrder(sendOrder);
                e.preventDefault()
              }} title={'Enviar'}
              />
          </div>
        
      </div>
    </div>
  );
}

export default ShowMenu;

const styles = StyleSheet.create({
  floorPage: {
    display: 'flex',
    flexDirection: 'initial'
  },
  styleMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
  title: {
    width: '10%',
    fontSize: '30px',
    marginTop: '15%',
    marginLeft: '25%',
  },
  btnMeals: {
    marginLeft: '10%',
    marginBottom: '5%',
  },
  btnBreakfast: {
    width: '150px',
    height: '50px',
  },
  
  btnLunch: {
    width: '150px',
    height: '50px',
  },
  
  btnProducts: {
    margin: '1%',
    marginLeft: '5%',
    width: '150px',
    height: '50px',
    backgroundColor: '#48D1CC'
  }
})
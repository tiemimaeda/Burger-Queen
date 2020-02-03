import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';
import firestore from '../utils/Firebase';
import Button from '../components/Button';
import Input from '../components/Input';
import Menu from '../components/Menu';
import Order from '../components/Order';

const styles = StyleSheet.create({
  floorPage: {
    display: 'flex',
  },

  styleMenu: {
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
  
  // Menu side
  btnMealsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '5%', 
  },

  btnMenu: {
    width: '160px',
    height: '50px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#287377',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',

      ':hover': {
        backgroundColor: '#FF9305',
        color: 'white',
      },
  },
  
  productsList: {
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-evenly',
    overflow:'auto',
  },

  // Order side
  inputsDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '5%'
  },

  inputsStyle: {
    height: '40px',
    width: '180px',
    textAlign: 'center',
    borderRadius: '5px',
    border: 'none',
    fontSize: '18px',
  },

  itemsList: {
    height: '100%',
    overflow: 'auto',
    fontSize: '20px',
  },

  total: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2%',
    fontSize: '22px',
    color: 'white',
    fontWeight: 'bold',
  },

  btnSendOrder: {
    height:'45px',
    width:'120px',
    marginTop: '2%',
    border: 'none',
    borderRadius:'8px',
    color: 'white',
    backgroundColor:'#287377',
    fontSize:'24px',
    fontWeight:'bold',
    
    ':hover': {
      backgroundColor: '#FF9305',
      color: 'white',
    },
  },
})

const option = {
  fadeAway: true,
  fadeAwayTimeout: 2000,
};

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
  }, []);
 
  const categoryItems = category === 'Lanches' ? lunchItems : breakfastItems;

  function addItem(item, extra) {
    const itemIndex = order.findIndex((el) => el.id === item.id && el.extra === extra);
    if (itemIndex === -1) 
      { if(extra){
      setOrder([...order, {...item, count: 1, extra}]);
    
      } else {
      setOrder([...order, {...item, count: 1}])
      }

    } else {
     const newOrder = [...order];
     newOrder[itemIndex].count += 1;
     setOrder (newOrder);
    }
    const extraPrice = extra ? 1: 0
    setTotal(total + (item.Price + extraPrice)) 
  };

  function removeItem (item) {
    const delItem = order.filter(elem => elem !== item);
    const extraPrice = item.extra ? 1 : 0;
 
    setOrder([...delItem]);
    setTotal(total - ((item.Price + extraPrice) * item.count))
  };

  function minusItem(item, extra) {
    const itemIndex = order.findIndex((el) => el.id === item.id && item.extra === extra);
    const itemCount = order[itemIndex];

    if (itemCount.count === 1) {
      removeItem(itemCount);

    } else {
      itemCount.count += -1;
      setOrder ([...order]);
    }
    const extraPrice = extra ? 1 : 0;
    setTotal(total - (item.Price + extraPrice))
  };

  function sendOrder() {
    if (customer && table && order.length) {
    firestore
      .collection('Orders')
      .add({
        customer,
        table,
        order,
        total,
        status: 'pending',
        sendTime: new Date().getTime() 
      })
      .then(() => {
        growl.success({text: 'Pedido enviado com sucesso!', ...option})
        setCustomer('')
        setTable('')
        setOrder([])
        setTotal(0)
      })
      
    } else if (!order.length) {
      growl.warning({text: 'Adicione um item', ...option})

    } else if (!customer){
      growl.warning({text: 'Preencha nome', ...option})
      
    } else if (!table){
    growl.warning({text: 'Preencha mesa', ...option})
    }
  };

  return (
    <div className={css(styles.floorPage)}>
      <div className={css(styles.styleMenu)}>
        <p className={css(styles.title)}>MENU</p>
        <div className={css(styles.btnMealsContainer)}>
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
          {categoryItems.map((item) => 
            <Menu 
              key={item.id} 
              item={item} 
              addItem={addItem} 
            />
          )}
        </div>
      </div>

      <div className={css(styles.styleMenu)}>
        <p className={css(styles.title)}>RESUMO DO PEDIDO</p>
        <div className={css(styles.inputsDiv)}>
          <Input 
            className={css(styles.inputsStyle)} 
            class='input' 
            type='text' 
            holder='Cliente'
            value={customer}
            handleChange={e => 
              setCustomer(e.currentTarget.value)
            } 
          />

          <Input 
            className={css(styles.inputsStyle)} 
            class='input' 
            type='text' 
            holder='Mesa'
            value={table}
            handleChange={e => 
              setTable(e.currentTarget.value)
            } 
          />
        </div>

        <div className={css(styles.itemsList)}>
          {order.map((item, i) => 
            <Order 
              key={i} 
              item={item} 
              addItem={addItem} 
              removeItem={removeItem} 
              minusItem={minusItem} 
            />
          )}
        </div>

        <div className={css(styles.total)}>
          Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          
          <Button className={css(styles.btnSendOrder)}
            handleClick={(e) => {
              sendOrder()
              e.preventDefault()
            }} 
            title={'Enviar'}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowMenu;
import React, { useState, useEffect } from 'react';
import firestore from '../firebase';
import Button from '../components/button';
import { StyleSheet, css } from 'aphrodite';

function GetMenu(Category) {
  const [item, setItem] = useState([]);

  useEffect(() => {
    firestore
      .collection('Menu')
      .where('Category', '==', Category)
      .onSnapshot((snapshot) => {
        const fullMenu = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setItem(fullMenu);
      })
    },[Category])

    return item;
}

function ShowMenu() {
  const [category, setCategory] = useState('Café da Manhã');
  const menu = GetMenu(category);

  return (
    <div className={css(styles.styleMenu)}>
      <h1 className={css(styles.title)}>Menu</h1>   
      <div className={css(styles.btn)}>
        <Button 
          className={css(styles.btnBreakfast)} 
          handleClick={(e) => { 
            setCategory('Café da Manhã'); 
            e.preventDefault() }}
          title={'Café da Manhã'} />

        <Button 
          className={css(styles.btnLunch)} 
          handleClick={(e) => { 
            setCategory('Lanches'); 
            e.preventDefault() }}
          title={'Almoço/Jantar'} />
      </div>

      {menu.map((item) =>
        <div key={item.id}>
          {item.Name}
          {'R$' + item.Price + ',00'}
        </div>
      )}
    </div>
  );
}

export default ShowMenu;

const styles = StyleSheet.create({
  styleMenu: {
    display: "flex",
    flexDirection: "column",
    width: "50%"
  },
  title: {
    width: "10%",
    fontSize: "30px",
    marginTop: "15%",
    marginLeft: "25%"
  },
  btn: {
    marginLeft: "10%",
    marginBottom: "5%"
  },
  btnBreakfast: {
    color: "red",
    width: "20%",
    marginRight: "5%"
  },

  btnLunch: {
    color: "blue",
    width: "20%"
  },
})
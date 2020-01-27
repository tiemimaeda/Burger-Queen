import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Button from '../components/Button';

const styles = StyleSheet.create({
  btnProducts: {
    height: '90px',
    width: '140px',
    marginBottom: '8%',
    backgroundColor: '#FEFFF0',
    border: 'none',
    borderRadius: '6px',
    fontSize: '19px',

    ':hover': {
      backgroundColor: '#FF9305',
      color: 'white',
    },
  },

  modalBackground: {
    position: 'absolute',
    backgroundColor: '#000000AA',
    width: '100%',
    top: 0,
    left: 0,
    height: '100%',
  },
  
  modal: {
    width: '280px',
    height:'210px',
    background: 'white',
    borderRadius: '10px',
    padding: '20px',
    textAlign:'center',
    position: 'relative',
    margin: '250px auto',
    fontSize:'23px'
  },
  
  inputModal:{
    width:'100%',
    height:'2em'
  },

  btnAdd: {
    fontSize:'23px',
    fontWeight:'bold',
    backgroundColor:'green',
    borderRadius:'5px',
    border:'none',
    color: 'white',
    width: '120px',
    height:'60px',
    marginTop:'20px'
  },

  btnPosition: {
    display: 'flex',
    justifyContent: 'space-between'
  },
})

function Menu(props) {
  const [show, setShow] = useState(false);
  const [selectedExtra, setSelectedExtra] = useState('');

  if (props.item.Type !== 'Hambúrgueres') {
    return (
      <Button
        className={css(styles.btnProducts)}
        Name={props.item.Name}
        Price={props.item.Price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        handleClick={(e) => {
          props.addItem(props.item);
          e.preventDefault();
        }}
      />
    );
  } else {
    return (
      <div>
        <Button
          className={css(styles.btnProducts)}
          Name={props.item.Name}
          Price={props.item.Price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          handleClick={(e) => {
            setShow(!show);
          }}
        />
        {
          show
            ? <div className={css(styles.modalBackground)} onClick={() => setShow(!show)} >
                <div className={css(styles.modal)} onClick={(e) => e.stopPropagation()}> 
                {props.item.Extras.map((extra, index) => {
                    return (
                      <div key={index}>
                        <label>{extra.Name}</label>
                        <input className={css(styles.inputModal)}
                          type='radio'
                          value={extra.Name} 
                          onChange={() => 
                            setSelectedExtra(extra.Name)} 
                            checked={extra.Name === selectedExtra}/>
                      </div>
                    )
                })}
                  <div className={css(styles.btnPosition)}>
                    <Button className={css(styles.btnAdd)}
                      handleClick={(e) => {
                        props.addItem(props.item, selectedExtra);
                        e.preventDefault();
                        setShow(!show);
                      }}
                      title={'Sem Adicional'}
                    />

                    <Button className={css(styles.btnAdd)}
                      handleClick={(e) => {
                        props.addItem(props.item, selectedExtra);
                        e.preventDefault();
                        setShow(!show);
                        setSelectedExtra('');
                      }}
                      title={'Adicionar'}
                    />
                  </div>
                </div>
              </div>
            : null
        }
      </div>
    );
  }
}

export default Menu;
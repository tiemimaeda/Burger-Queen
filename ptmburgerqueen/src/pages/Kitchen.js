import React, { useEffect } from 'react';
import firestore from './utils/Firebase';


function Kitchen() {

  useEffect(() => {
    firestore
      .collection('Orders')
      .get().then((snapshot) => {
        const order = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log(order)
        })
  }, [])

return (
  <h2>Pedidos</h2>
  
)}

export default Kitchen
import React from 'react';

const OrderCard = (props) => {
  return (
    <div className={props.className} id={props.id}>
      {props.table}
      {props.customer}
      {props.count} 
      {props.Name} 
      {props.total}
    </div>
  )
}

export default OrderCard;
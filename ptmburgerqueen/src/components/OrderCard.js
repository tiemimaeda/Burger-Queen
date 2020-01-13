import React from 'react';

const OrderCard = (props) => {
  return (
    <>
      {props.sendTime}
      <div>
        Mesa: {props.table}
      </div>
      Cliente: {props.customer}
      {props.order}  
      {props.total}
    </>
  )
};

export default OrderCard;
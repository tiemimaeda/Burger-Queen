import React from 'react';

const OrderCard = (props) => {
  return (
    <>
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
import React, {useEffect, useState} from 'react';
import {db} from "./firebase";
import { useStateValue } from './StateProvider';
import './Orders.css';
import Order from "./Order"; 
import CurrencyFormat from 'react-currency-format';

function Orders() {

    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user)
        {
            db
            .collection('users') // going to users collection
            .doc(user?.uid)  // getting the currently logged in user
            .collection('orders') // going in his orders
            .orderBy('created' ,'desc') // orderby the date created in a descending order
            .onSnapshot(snapshot => ( // it gives the realtime snapshot of the db upon change
                setOrders(snapshot.docs.map(doc => ({ // mapping through the orders
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }
        else
        {
            setOrders([])
        }
        
    }, [user]) // user is the dependent variable

  return (
    <div className='orders'>
        <h1>Your Orders</h1>
        <div className='orders__order'>
            {orders?.map(order => (
                <Order order={order} />
            ))}
        </div>
    </div>
  )
}

export default Orders
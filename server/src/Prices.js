import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import {GetPrice} from './Graphql/Query';
import { createPlanMutation } from './Graphql/Mutations';

const Prices = ({location}) => {
  console.log(location.state)
  const [prices, setPrices] = useState([]);
  const [email, setEmail] = useState(location.state)
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const {error, loading, data} = useQuery(GetPrice);
  const [createPlan, response] = useMutation(createPlanMutation);

  useEffect(() => {    
    
    if(data){
      setPrices(data.prices.prices_list)
      console.log(data)
    }
        // setPrices(data.prices.prices);
  }, [data])

  const createSubscription = async (priceId) => {

    try{
        await createPlan({
            variables: {
              priceId: priceId,
              email: email
            }
          })
    }catch(err){console.log(err)}
    // if(planData){
      
    // }

    // const {subscriptionId, clientSecret, message} = await fetch('/premium/createplan', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     priceId
    //   }),
    // }).then(r => r.json());
    
  } 

  // console.log("error from create plan:", response.error)
  // console.log("response 1 from create plan:", response?.data)


  //   if(typeof response?.error != 'undefined')
  //     console.log("error from create plan:", response.error)
  //     setErrorMessage(response.error);
    
  //   if(typeof response?.data != 'undefined') {
  //     console.log("response from create plan:", response.data)
  //     setSubscriptionData({
  //       subscriptionId: response.data?.createPlan.subscriptionId, 
  //       clientSecret:response.data?.createPlan.clientSecret 
  //     });
  //   }

  useEffect(() => {
    if (typeof response?.error !== 'undefined') {
      setErrorMessage(response.error);
    }

    if (typeof response?.data !== 'undefined') {
      console.log('response from create plan:', response.data);
      setSubscriptionData({
        subscriptionId: response.data?.createPlan.subscriptionId,
        clientSecret: response.data?.createPlan.clientSecret,
      });
    }
  }, [response]);
      

  if(subscriptionData) {
    return <Redirect to={{
      pathname: '/subscribe',
      state: subscriptionData
    }} />
  }

  return (
    <div>

      <h1>Select a plan</h1>
          {errorMessage ? <div className="alert alert-danger" role="alert">
            {errorMessage}
         </div> : null}
      <label style={{marginBottom: "40px"}}>
          Email
          <hr/>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </label>

      <div className="price-list">
        {prices.map((price) => {
          return (
            <div key={price.id}>

              <p>
                ${price.amount} / {price.lookup_key? price.lookup_key : "daily"}
              </p>

              <button onClick={() => createSubscription(price.id)}>
                Select
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Prices;

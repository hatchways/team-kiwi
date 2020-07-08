import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@material-ui/core';
import axios from 'axios';

const CheckoutForm = ({ success }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post('/payment/charge', { id, amount: 2588 });
        console.log(data);
        success();
      } catch {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Price: $25.88</h2>
      <CardElement />
      <Button type="submit" disabled={!stripe}>
        Pay
      </Button>
    </form>
  );
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const Payment = () => {
  const [status, setStatus] = React.useState('');

  if (status === 'success') {
    return <div>Payment completed!</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        success={() => {
          setStatus('success');
        }}
      />
    </Elements>
  );
};

export default Payment;

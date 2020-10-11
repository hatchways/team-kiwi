import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { makeStyles, Button, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: theme.spacing(4),
    '& > *': {
      width: 140,
      height: 50,
      margin: theme.spacing(3),
    },
  },
}));

const CheckoutForm = ({ success, props }) => {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post('/payment/charge', {
          id,
          request_id: props.requestInfo._id,
          amount: props.requestInfo.cost,
        });
        success();
        props.onSubmit(true);
      } catch {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h5" style={{ marginBottom: '6%' }} gutterBottom>
        Service Price: ${props.requestInfo.cost}
      </Typography>
      <CardElement />
      <div className={classes.buttons}>
        <Button variant="outlined" size="large" color="secondary" type="submit" disabled={!stripe}>
          Pay with credit card
        </Button>
      </div>
    </form>
  );
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function PaymentComponent(props) {
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
        props={props}
      />
    </Elements>
  );
}

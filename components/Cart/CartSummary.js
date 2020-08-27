import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";
function CartSummary({ products, handleCheckout,success }) {
  const [cartAmount,setCartAmount] = React.useState(0);
  const [stripeAmount,setStripeAmount] = React.useState(0);
  const [isCartEmpty, setisCartEmpty] = React.useState(true);
  //console.log(isCartEmpty);
  React.useEffect(() =>{
    const {cartTotal, stripeTotal} = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
setisCartEmpty(products.length === 0)
  },[products])
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub Total : </strong> Rs.{cartAmount}
        <StripeCheckout 
        name="React Shopping"
        amount={stripeAmount}
        image={products.lenght > 0 ? products[0].product.mediaUrl : ""}
        currency="INR"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey="pk_test_51HJX8dKluJzGmuS1l1bkcZqbjNrBVEeuO191RYkmOyHjLyd9fDCKJzKpfPXIGdSq3H7Rf3UpYkD39frvtnIjT0Qt00OhfkOXyM"
        token={handleCheckout}

        triggerEvent="onClick">
        <Button
          disabled={isCartEmpty || success}
          icon="cart"
          color="blue"
          floated="right"
          content="Checkout"
        ></Button>
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;

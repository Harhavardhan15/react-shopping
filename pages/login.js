import { Button, Icon, Segment, Form, Message } from "semantic-ui-react";
import Link from "next/link";
import React from "react";
import catchErrors from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import {handleLogin} from "../utils/auth";
function Signup() {
  const INITIAL_USER = {
    email: "",
    password: "",
  };
  const [user, setUser] = React.useState(INITIAL_USER );
  const [disabled, setDisabled] = React.useState(true);
  const [loading,setLoading] = React.useState.apply(false);
  const [error,setError] = React.useState.apply(true);
  React.useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }
  async function handleSubmit(){
    event.preventDefault();
try {
  setError('');
  setLoading(true);
 // console.log(user);

 //make a request to signup user 
 const url = `${baseUrl}/api/login`;
 const payload = { ...user };
 const response = await axios.post(url,payload);
 handleLogin(response.data);
} catch (error) {
  catchErrors(error,setError);
  console.error(error);
}finally{
  setLoading(false);
}
  }
    return (
      <div className="bg sign">
      <Message
        header="Welcome back !"
        icon="privacy"
        attached
        content="Login to account"
        color="blue"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message error header="Oops !" content={error} />
        <Segment>
        
          <Form.Input
            fluid
            icon="envelope"
            type="email"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            type="password"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"            
            value={user.password}
            onChange={handleChange}
          />
          <Button
            disabled={loading || disabled}
            icon="sign in"
            type="submit"
            color="orange"
            content="Login"
          />
        </Segment>
      </Form>
      <Message  attached="bottom" warning>
      <Icon name="help" />
        New User?{" "}
        <Link href="/signup">
          <a>Sign Up here</a>
        </Link>
        {"  "}
        instead
      </Message>
    </div>
  );
}

export default Signup;

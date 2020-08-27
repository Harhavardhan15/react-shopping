import { Button, Icon, Segment, Form, Message } from "semantic-ui-react";
import Link from "next/link";
import React from "react";
import catchErrors from "../utils/catchErrors";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { handleLogin } from "../utils/auth";

function Signup() {
  const INITIAL_USER = {
    name: "",
    email: "",
    password: "",
  };

  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState.apply(false);
  const [error, setError] = React.useState.apply(true);

  React.useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit() {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      //make a request to signup user
      const url = `${baseUrl}/api/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
      console.error(error);
     // console.log("Erro from here");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg sign">
      <Message
        header="Get Started"
        icon="settings"
        attached
        content="Create new account"
        color="blue"
      /> 
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Oops !" content={error} />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
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
            icon="signup"
            type="submit"
            color="orange"
            content="Signup"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing User?{" "}
        <Link href="/login">
          <a>Log in here</a>
        </Link>
        {"  "}
        instead
      </Message>
    </div>
  );
}

export default Signup;

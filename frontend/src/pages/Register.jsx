import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import Preloader from "../components/Preloader";

const REGISTER_USER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Register = (props) => {
  const [errors, setErrors] = useState();
  const [state, setState] = useState({});
  const {
    username = "",
    email = "",
    password = "",
    confirmPassword = "",
  } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    //on success mutation
    update(_, result) {
      props.history.push('/');
    },
    onError(err) {
      setErrors(
        err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : err
      );
    },
    variables: state,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <>
      <div className="page-title">
        <h1>Register</h1>
      </div>

      <div className="form-container">
        <Form error onSubmit={onSubmit} noValidate>
          <Form.Input
            label="Username"
            placeholder="username..."
            name="username"
            onChange={onChange}
            value={username}
            error={errors && errors.username}
            />
          <Form.Input
            label="Email"
            placeholder="email..."
            name="email"
            onChange={onChange}
            value={email}
            error={errors && errors.email}
            />
          <Form.Input
            label="Password"
            placeholder="password..."
            name="password"
            type="password"
            onChange={onChange}
            value={password}
            error={errors && errors.password}
            />
          <Form.Input
            label="Confirm password"
            placeholder="confirm password..."
            type="password"
            name="confirmPassword"
            onChange={onChange}
            value={confirmPassword}
            error={errors && errors.confirmPassword}
            />
          {loading ? <Preloader /> : <Button primary>Submit</Button>}

          {errors && (
            <Message
              error
              header="Error"
              content={
                Object.keys(errors).length > 0
                  ? Object.values(errors)
                      .map((err) => err)
                      .join(". ")
                  : errors
              }
            />
          )}
        </Form>
      </div>
    </>
  );
};

export default Register;

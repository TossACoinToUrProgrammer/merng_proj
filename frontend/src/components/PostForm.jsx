import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { useForm } from "../utils/hooks";
import Preloader from "./Preloader";

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likesCount
      commentsCount
    }
  }
`;

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(addPost, { body: "" });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      values.body = "";
    },
    variables: values,
    // context: { headers: { Authorization: 'Bearer '+localStorage.getItem('jwtToken')}}
  });

  function addPost() {
    createPost();
  }
  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post: </h2>
      <Form.Field>
        <Form.Input
          placeholder="type post's body..."
          name="body"
          onChange={onChange}
          value={values.body}
        />
      </Form.Field>
      {loading ? <Preloader /> : <Button primary>Post</Button>}
    </Form>
  );
};

export default PostForm;

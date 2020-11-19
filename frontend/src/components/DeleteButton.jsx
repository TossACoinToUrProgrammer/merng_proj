import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ post: { id }, callback }) => {

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { id: id },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {...data, getPosts: data.getPosts.filter((post) => post.id !== id) },
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  const deletePostHandler = () => {
    deletePost();
    if(callback) callback();
  };

  return (
    <>
      <Button floated="right" as="div" color="red" onClick={()=>setConfirmOpen(true)}>
        <Icon style={{ margin: 0 }} name="trash" />
       </Button>
      <Confirm open={confirmOpen} onCancel={()=>setConfirmOpen(false)} onConfirm={deletePostHandler} />
    </>
  );
};

export default DeleteButton;

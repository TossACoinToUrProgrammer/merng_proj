import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";

import { FETCH_POST_QUERY } from "../utils/graphql";
import Preloader from "./Preloader";
import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const SinglePost = (props) => {
  const id = props.match.params.postId;

  const { user } = useContext(AuthContext);

  const { loading, data: { getPost: post = {} } = {} } = useQuery(
    FETCH_POST_QUERY,
    {
      variables: { id },
    }
  );

  if (!id) return <h3>Post id is not provided</h3>;

  if (!post.id && !loading) return <h3>Post not found</h3>;

  const {
    id: postId,
    username,
    createdAt,
    body,
    likesCount,
    likes,
    commentsCount,
    comments,
  } = post;

  const deletePostCallback = () => {
      props.history.push('/');
  }

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                floated="right"
                size="small"
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton
                    user={user}
                    post={{ id: postId, likesCount, likes }}
                  />
                  <Button as="div" labelPosition="right">
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label as="a" basic color="blue" pointing="left">
                      {commentsCount}
                    </Label>
                  </Button>
                  <DeleteButton callback={deletePostCallback} post={{ id: postId }} />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
};

export default SinglePost;

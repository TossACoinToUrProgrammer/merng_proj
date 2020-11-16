import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Label, Icon, Button } from "semantic-ui-react";
import moment from "moment";

const PostCard = ({
  post: {
    body,
    username,
    createdAt,
    id,
    likesCount,
    commentsCount,
    comments,
    likes,
  },
}) => {
  const likePost = () => {
      
  }
  const commentPost = () => {

  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right">
          <Button basic color='teal' onClick={likePost}>
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likesCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button basic color='blue' onClick={commentPost}>
            <Icon name="comments" />
            Comment
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentsCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;

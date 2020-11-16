import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { Grid } from "semantic-ui-react";

import Preloader from "../components/Preloader";
import PostCard from "../components/PostCard";

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
      likesCount
      likes {
        username
      }
      commentsCount
      comments {
        username
        body
      }
    }
  }
`;

const Home = () => {
  const {
    loading,
    data: { getPosts: posts = [] } = {},
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <div className='page-title'><h1>Recent Posts</h1></div>
      </Grid.Row>

      <Grid.Row>
        {loading ? (
          <Preloader />
        ) : (
          posts.map((post) => {
            return (
              <Grid.Column key={post.id} style={{marginBottom: "20px"}}>
                <PostCard post={post} />
              </Grid.Column>
            );
          })
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;

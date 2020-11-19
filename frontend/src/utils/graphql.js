import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
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
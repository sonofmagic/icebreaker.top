import { schemaComposer } from 'graphql-compose'
import { find, filter } from 'lodash'
const AuthorTC = schemaComposer.createObjectTC({
  name: 'Author',
  fields: {
    id: {
      type: 'Int!',
      description: '主键',
    },

    firstName: 'String',
    lastName: 'String',
  },
})

const PostTC = schemaComposer.createObjectTC({
  name: 'Post',
  fields: {
    id: 'Int!',
    title: 'String',
    votes: 'Int',
    authorId: 'Int',
  },
})

const authors = [
  {
    id: 1,
    firstName: 'Tom',
    lastName: 'Coleman',
  },
  {
    id: 2,
    firstName: 'Sashko',
    lastName: 'Stubailo',
  },
  {
    id: 3,
    firstName: 'Mikhail',
    lastName: 'Novikov',
  },
]

const posts = [
  {
    id: 1,
    authorId: 1,
    title: 'Introduction to GraphQL',
    votes: 2,
  },
  {
    id: 2,
    authorId: 2,
    title: 'Welcome to Apollo',
    votes: 3,
  },
  {
    id: 3,
    authorId: 2,
    title: 'Advanced GraphQL',
    votes: 1,
  },
  {
    id: 4,
    authorId: 3,
    title: 'Launchpad is Cool',
    votes: 7,
  },
]

PostTC.addFields({
  author: {
    type: AuthorTC,
    resolve: (post) =>
      find(authors, {
        id: post.authorId,
      }),
  },
})

AuthorTC.addFields({
  posts: {
    type: [PostTC],
    resolve: (author) =>
      filter(posts, {
        authorId: author.id,
      }),
  },
  postCount: {
    type: 'Int',
    description: 'Number of Posts written by Author',
    resolve: (author) =>
      filter(posts, {
        authorId: author.id,
      }).length,
  },
})

schemaComposer.Query.addFields({
  posts: {
    type: '[Post]',
    resolve: () => posts,
  },
  author: {
    type: 'Author',
    args: {
      id: 'Int!',
    },
    resolve(_, { id }, ctx, info) {
      // console.log(ctx, info)
      return find(authors, {
        id,
      })
    },
    // resolve: (_, { id }, ctx, info) =>
    //   find(authors, {
    //     id,
    //   }),
  },
})

schemaComposer.Mutation.addFields({
  upvotePost: {
    type: 'Post',
    args: {
      postId: 'Int!',
    },
    resolve: (_, { postId }) => {
      const post = find(posts, {
        id: postId,
      })
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`)
      }
      post.votes += 1
      return post
    },
  },
})

// via config
// const ScalarTC = schemaComposer.createScalarTC({
//   name: 'UInt',
//   description: 'Unsigned integer',
//   serialize: () => {},
//   parseValue: () => {},
//   parseLiteral: () => {},
// })
// via SDL
// const ScalarTC = schemaComposer.createScalarTC('scalar UInt');

// // or
// const ScalarTC = schemaComposer.createScalarTC('UInt');
// ScalarTC.setDescription('Unsigned integer');
// ScalarTC.setSerialize(() => {});
// ScalarTC.setParseValue(() => {});
// ScalarTC.setParseLiteral(() => {});
// schemaComposer.createEnumTC

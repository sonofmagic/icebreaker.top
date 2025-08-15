import { defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
});

export const articles = defineDocs({
  dir: 'content/articles',
})


// export const articles = defineCollections({
//   type: 'doc',
//   dir: 'content/articles',
//   // schema: z.object({
//   //   // schema
//   // }),
//   // other options
// });
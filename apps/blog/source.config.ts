import { defineDocs, defineCollections } from 'fumadocs-mdx/config';
// getDefaultMDXOptions
// import { remarkImage } from 'fumadocs-core/mdx-plugins';
export const docs = defineDocs({
  dir: 'content/docs',
});

const articlesDocCollection = defineCollections({
  dir: 'content/articles',
  type: 'doc',
  // mdxOptions: {
  //   ...getDefaultMDXOptions({
  //     remarkPlugins: [
  //       [remarkImage, { useImport: false }]
  //     ]
  //   }),
  // },
})

export const articles = defineDocs({
  docs: articlesDocCollection,
})


// export const articles = defineCollections({
//   type: 'doc',
//   dir: 'content/articles',
//   // schema: z.object({
//   //   // schema
//   // }),
//   // other options
// });
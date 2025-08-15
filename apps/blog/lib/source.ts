// .source folder will be generated when you run `next dev`
import { docs, articles } from '@/.source';
import { loader } from 'fumadocs-core/source';
export const docsSource = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});


export const articlesSource = loader({
  baseUrl: '/articles',
  source: articles.toFumadocsSource(),
});
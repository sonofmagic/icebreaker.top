import { articlesSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(articlesSource, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});
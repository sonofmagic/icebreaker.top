import { docsSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(docsSource, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});
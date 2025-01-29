import { defineConfig } from 'fumadocs-core/config';

export default defineConfig({
  name: 'Code Snippets',
  root: 'content',
  baseUrl: 'http://localhost:3000',
  theme: {
    navigation: true,
    footer: true,
    toc: true,
    search: true,
    darkMode: true,
  },
});


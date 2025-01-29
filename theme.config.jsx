import { DocsThemeConfig } from 'nextra-theme-docs'

const themeConfig: DocsThemeConfig = {
  logo: <span>Code Snippets</span>,
  project: {
    link: 'https://github.com/yourusername/code-snippets'
  },
  docsRepositoryBase: 'https://github.com/yourusername/code-snippets',
  footer: {
    text: '© 2024 Code Snippets. All rights reserved.'
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Code Snippets'
    }
  },
  primaryHue: 210,
  navigation: {
    prev: true,
    next: true
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  editLink: {
    text: 'Edit this page on GitHub →'
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  }
}

export default themeConfig


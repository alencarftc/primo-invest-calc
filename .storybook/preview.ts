import type { Preview } from '@storybook/nextjs-vite'

import '../main/modules/core/src/styles/globals.css'
import '../main/modules/core/src/styles/normalize.css'
import '../main/modules/core/src/styles/theme.css'
import '../main/modules/core/src/styles/utilitary.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

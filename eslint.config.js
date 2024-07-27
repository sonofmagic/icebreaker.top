import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker(
  {
    markdown: false
  },
  {
    ignores: ['**/fixtures/**'],
  },
)

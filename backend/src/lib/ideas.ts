import _ from 'lodash'

export const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i}`,
  description: `Description of idea ${i}...`,
  text: _.times(100, (i) => `<p>Text paragraph ${i} of idea ${i}...</p>`).join(''),
}))
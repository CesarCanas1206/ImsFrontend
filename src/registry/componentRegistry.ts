import { lazy } from 'react'
import componentGroupRegistry from './componentGroupRegistry'

const components: { default?: any } = import.meta.glob([
  '../components/**/*.tsx',
  '!**.test.tsx',
])

const match = /..\/components\/([^\/]+).*\/([\w]+)\.tsx$/
const componentList = Object.fromEntries(
  Object.entries(components).map(([file, component]: any) => {
    const [category, key] = file.replace(match, '$1.$2').split('.')
    return [
      key,
      {
        category: category,
        component: lazy(component),
        settings: component,
        hidden: ['AddNew', 'PageEditButton'].includes(key),
      },
    ]
  }),
)

export const componentRegistry = {
  ...componentGroupRegistry,
  ...componentList,
}

export default componentRegistry

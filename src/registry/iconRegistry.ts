const modules: { default?: any } = import.meta.glob(
  ['./icons/**/*.ts', './icons/**/*.tsx'],
  {
    eager: true,
  },
)

const match = /.*\/([\w]+)\.ts[x]?$/
export const iconRegistry: any = Object.fromEntries(
  Object.entries(modules).map(([file, module]) => [
    file.replace(match, '$1'),
    module.default,
  ]),
)

export default iconRegistry

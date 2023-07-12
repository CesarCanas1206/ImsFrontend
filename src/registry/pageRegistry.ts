const modules: { default?: any } = import.meta.glob(
  ['../app/**/*.ts', '../app/**/*.tsx'],
  {
    eager: true,
  },
)

const pageRegistry: any = Object.values(modules).map((module) => module.default)

export default pageRegistry

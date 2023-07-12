const modules: { default?: any } = import.meta.glob('./modules/**/*.ts', {
  eager: true,
})

const match = /.*\/([\w]+)\.ts$/
const moduleRegistry = Object.entries(modules).map(
  ([file, component]: any) => ({
    reference: file.replace(match, '$1'),
    ...component.default,
  }),
)

export default moduleRegistry

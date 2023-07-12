const modules: { default?: any } = import.meta.glob('./forms/**/*.ts', {
  eager: true,
})

const formRegistry: any = Object.values(modules).map((module) => module.default)

export default formRegistry

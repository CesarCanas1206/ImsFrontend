const modules: { default?: any } = import.meta.glob('./emails/**/*.ts', {
  eager: true,
})

const emailRegistry: any = Object.values(modules).map(
  (module) => module.default,
)

export default emailRegistry

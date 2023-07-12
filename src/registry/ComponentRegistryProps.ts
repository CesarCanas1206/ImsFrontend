interface IComponentRegistry {
  [k: string]: {
    name?: string
    desc?: any
    component?: any
    components?: any
    category?: any
    settings?: any
    hidden?: boolean
    group?: boolean
    hideSettings?: boolean
  }
}

export default IComponentRegistry

import useAPI from './useAPI'
import useComponentQuery from './useComponentQuery'
import usePage from './usePage'

function usePageBuilder() {
  const { put, post, doDelete } = useAPI()
  const { pageId, reloadPage } = usePage()
  const { refetch: refetchComponents } = useComponentQuery(pageId, [], true)

  const addPage = async (data: any) => {
    await post({
      endpoint: `page`,
      type: 'JSON',
      data,
    })
  }

  const addComponents = async (add: any) => {
    const { components, settings, parent_id, order } = add

    await post({
      endpoint: `page-component`,
      type: 'JSON',
      data: {
        page_id: pageId,
        parent_id: parent_id || 0,
        order,
        components,
        props:
          typeof settings?.reduce !== 'undefined'
            ? settings?.reduce(
                (a: any, v: any) => ({ ...a, [v.name]: v.default || '' }),
                {},
              )
            : {},
      },
    })
    refetchComponents()
  }

  const addComponent = async (add: any) => {
    const { component, settings, props, parent_id, order } = add

    await post({
      endpoint: `page-component`,
      type: 'JSON',
      data: {
        page_id: pageId,
        parent_id: parent_id || '',
        order,
        component,
        props:
          typeof settings?.reduce !== 'undefined'
            ? settings?.reduce(
                (a: any, v: any) => ({ ...a, [v.name]: v.default || '' }),
                {},
              )
            : props ?? {},
      },
    })

    refetchComponents()
  }

  const saveValue = async (name: string, value: any) => {
    const saved = await put({
      endpoint: `page/${pageId}`,
      data: {
        [name]: value,
      },
    })
    await reloadPage(pageId, saved)
  }

  interface ISaveComponent {
    component?: string
    props?: any
    parent_id?: number
    order?: number
    id?: number
  }

  const saveComponent = async ({
    component,
    props,
    order,
    id,
    parent_id,
  }: ISaveComponent) => {
    await put({
      endpoint: `page-component/${id}`,
      data: {
        page_id: pageId,
        id: id,
        ...(typeof parent_id !== 'undefined' ? { parent_id } : {}),
        component,
        order,
        props,
      },
    })
    refetchComponents()
  }

  const deleteComponent = async ({ id }: ISaveComponent) => {
    await doDelete({
      endpoint: `page-component/${id}`,
    })
    refetchComponents()
  }

  const filterProps = ({ id, props, component }: ISaveComponent) => {
    if (
      typeof props?.children !== 'undefined' &&
      Array.isArray(props.children)
    ) {
      props.children = props.children.map((child: any) =>
        filterProps({ ...child.props }),
      )
    }
    return {
      id,
      component,
      props,
    }
  }

  const createAsDynamicPage = async (page: any) => {
    const newPage = await post({
      endpoint: 'page',
      type: 'JSON',
      data: {
        id: page.id,
        name: page.name,
        path: page.path,
        public: page.public,
        category: page.category,
        parent_id: page.parent_id || '',
        order: page.order,
        permission: page.permission,
        module: page.module,
        icon: page.icon,
        show: page.show || 0,
      },
    })

    if (newPage.id && page?.components?.length > 0) {
      await post({
        endpoint: `page-component`,
        type: 'JSON',
        data: {
          page_id: newPage.id,
          components: page.components.map(
            ({ component, sub, ...props }: any) => ({
              component,
              sub,
              props,
            }),
          ),
        },
      })
    }
    await reloadPage(newPage.id, null)
    window.location.reload()
  }

  return {
    addPage,
    addComponent,
    addComponents,
    saveComponent,
    deleteComponent,
    saveValue,
    filterProps,
    createAsDynamicPage,
  }
}

export default usePageBuilder

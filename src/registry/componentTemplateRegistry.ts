import IComponentRegistry from './ComponentRegistryProps'

export const componentTemplateRegistry: IComponentRegistry = {
  StandardListingPage: {
    name: 'Standard listing page',
    desc: 'Listing page with add button',
    category: 'Template',
    components: [
      {
        component: 'DataGrid',
        endpoint: 'asset',
        columns: [
          {
            name: 'Id',
            key: 'id',
          },
          {
            name: 'Name',
            key: 'name',
          },
          {
            name: 'Actions',
            key: 'action',
            sub: [
              {
                component: 'Group',
                sub: [
                  {
                    component: 'ModalButton',
                    props: {
                      icon: 'edit',
                    },
                    sub: [
                      {
                        component: 'Form',
                        props: {
                          formId: 'asset',
                          itemId: '{id}',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        sub: [
          {
            component: 'Group',
            sub: [
              {
                component: 'ModalButton',
                icon: 'plus',
                text: 'Add new',
                sub: [
                  {
                    component: 'Form',
                    formId: 'asset',
                  },
                ],
              },
            ],
          },
          {
            component: 'Space',
            h: 'sm',
          },
        ],
      },
    ],
  },
}

export default componentTemplateRegistry

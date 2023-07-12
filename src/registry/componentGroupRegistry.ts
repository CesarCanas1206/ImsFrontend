import IComponentRegistry from './ComponentRegistryProps'

export const componentGroupRegistry: IComponentRegistry = {
  CompleteButton: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'Prompt',
        title: 'Are you sure you want to complete this?',
        variant: 'success',
        text: 'Complete',
        icon: 'tick',
        sub: [
          {
            component: 'Heading',
            text: 'Completing inspection... please wait..',
            position: 'center',
          },
          {
            component: 'Action',
            action: 'update',
            endpoint: 'd/{row.id || id}',
            data: {
              responses: {
                completed: 1,
              },
            },
            sub: [
              {
                component: 'Action',
                action: 'navigate',
                to: '/checklist-test',
              },
            ],
          },
        ],
      },
    ],
  },
  StatusCompleteButton: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'Confirm',
        title: 'Are you sure you want to complete this?',
        variant: 'succes',
        text: 'Complete',
        icon: 'tick',
        sub: [
          {
            component: 'Action',
            action: 'update',
            endpoint: 'd/{form}/{id}',
            data: {
              responses: {
                status: 'completed',
              },
            },
          },
        ],
      },
    ],
  },
  CancelButton: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'Prompt',
        title: 'Why would you like to cancel this booking?',
        tooltip: 'Cancel this booking',
        variant: 'danger',
        icon: 'cancel',
        sub: [
          {
            component: 'Action',
            action: 'update',
            endpoint: 'd/{form}/{id}',
            data: {
              responses: {
                cancelled: 'true',
              },
            },
          },
        ],
      },
    ],
  },
  StatusToggle: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'Conditional',
        on: '{status}',
        value: 'Done',
        sub: [
          {
            component: 'Menu',
            text: '{status}',
            color: 'green',
            id: '{id}',
          },
        ],
      },
      {
        component: 'Conditional',
        on: '{status}',
        value: 'Todo',
        sub: [
          {
            component: 'Menu',
            text: '{status}',
            color: 'cyan',
            id: '{id}',
          },
        ],
      },
      {
        component: 'Conditional',
        on: '{status}',
        value: 'In progress',
        sub: [
          {
            component: 'Menu',
            text: '{status}',
            color: 'yellow',
            id: '{id}',
          },
        ],
      },
    ],
  },
  ChecklistInspection: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'Datagrid',
        endpoint: '',
      },
    ],
  },
  NewInspectionButton: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'ModalButton',
        variant: 'success',
        text: 'New inspection',
        sub: [
          {
            component: 'Heading',
            text: 'Creating new inspection... please wait..',
            position: 'center',
          },
          {
            component: 'Action',
            action: 'create',
            formId: '{form}',
            specificId: '{id}',
            parent_id: '{id}',
          },
        ],
      },
    ],
    settings: [
      {
        name: 'form',
        label: 'Form',
        type: 'Input',
      },
    ],
  },
  InspectionFormButton: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'Stack',
        sub: [
          {
            component: 'Conditional',
            conditions: [
              {
                on: '{each::allocation.name}',
                type: 'empty',
              },
            ],
            sub: [
              {
                component: 'NewInspectionButton',
                parent_id: '{id}',
              },
            ],
          },
          {
            component: 'Conditional',
            conditions: [
              {
                on: '{each::allocation.name}',
                type: '!empty',
              },
            ],
            sub: [
              {
                component: 'Button',
                variant: 'warning',
                text: '{date::first@allocation.created_at}',
                link: '/application/allocation/{first::allocation.id}',
              },
            ],
          },
        ],
      },
    ],
    settings: [
      {
        name: 'form',
        label: 'Form',
        type: 'Input',
      },
    ],
  },
  InspectionButton: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'Stack',
        sub: [
          {
            component: 'Conditional',
            conditions: [
              {
                on: '{fFind::parent_id=id:created_at}',
                type: 'empty',
                or: true,
              },
              {
                on: '{fFind::parent_id=id:completed}',
                type: '=',
                value: '1',
                or: true,
              },
            ],
            sub: [
              {
                component: 'NewInspectionButton',
                parent_id: '{id}',
              },
            ],
          },
          {
            component: 'Conditional',
            conditions: [
              {
                on: '{fFind::parent_id=id:created_at}',
                type: '!empty',
              },
              {
                on: '{fFind::parent_id=id:completed}',
                type: 'empty',
              },
            ],
            sub: [
              {
                component: 'Button',
                variant: 'warning',
                text: '{fFind::fDate@parent_id=id:created_at}',
                link: '/inspection/checklist/{form}/{fFind::parent_id=id:id}',
              },
            ],
          },
        ],
      },
      {
        component: 'Text',
        text: `{fDate::collections.1.created_at}`,
      },
    ],
    settings: [
      {
        name: 'form',
        label: 'Form',
        type: 'Input',
      },
    ],
  },
  OpenIssuesButton: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'ModalButton',
        text: '0',
        variant: 'info',
        sub: [
          {
            component: 'Text',
            text: 'Listing here',
          },
        ],
      },
    ],
  },
  ChecklistListing: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'DataGrid',
        endpoint: 'd/{slug}/{form}',
        columns: [
          { name: 'Facility', key: 'name' },
          {
            name: 'Last check',
            key: 'inspection',
            sub: [
              {
                component: 'InspectionButton',
                props: { form: '{form}', parent_id: '{id}' },
              },
            ],
          },
          {
            name: 'Open issues',
            key: 'issues',
            sub: [{ component: 'OpenIssuesButton' }],
          },
          {
            name: 'Actions',
            key: 'action',
            sub: [
              {
                component: 'Conditional',
                props: {
                  conditions: [
                    {
                      on: '{fFind::parent_id=id:created_at}',
                      type: '!empty',
                    },
                    {
                      on: '{fFind::parent_id=id:completed}',
                      type: 'empty',
                    },
                  ],
                },
                sub: [
                  {
                    component: 'ModalButton',
                    props: {
                      variant: 'danger',
                      icon: 'trash',
                    },
                    sub: [
                      {
                        component: 'Heading',
                        props: {
                          text: 'Deleting inspection',
                        },
                      },
                      {
                        component: 'Action',
                        props: {
                          action: 'delete',
                          endpoint: 'd/{id}',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    settings: [
      {
        name: 'slug',
        label: 'Slug',
        type: 'Input',
      },
      {
        name: 'form',
        label: 'Form',
        type: 'Input',
      },
      {
        name: 'columns',
        label: 'Columns',
        type: 'Json',
      },
    ],
  },
  SubFormTable: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'DataGrid',
        endpoint: 'd/task-notes?parent_id={id}',
        columns: [
          {
            name: 'Note',
            key: 'note',
          },
        ],
        sub: [
          {
            component: 'ModalButton',
            text: 'New note',
            sub: [
              {
                component: 'Form',
                formId: 'task-notes',
                parent_id: '{id}',
              },
            ],
          },
        ],
      },
    ],
  },
  StandardListingPageSingle: {
    desc: 'Listing page with add button',
    category: 'Group',
    group: true,
    components: [
      {
        component: 'DataGrid',
        endpoint: '{endpoint}',
        columns: [
          // {
          //   name: 'Id',
          //   key: 'id',
          // },
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
                    icon: 'edit',
                    sub: [
                      {
                        component: 'Form',
                        formId: '{form}',
                        itemId: '{id}',
                      },
                    ],
                  },
                  {
                    component: 'Confirm',
                    title: 'Are you sure you want to delete this?',
                    tooltip: 'Delete',
                    variant: 'danger',
                    icon: 'delete',
                    sub: [
                      {
                        component: 'Action',
                        action: 'delete',
                        props: { endpoint: 'd/{id}' },
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
                    formId: '{form}',
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
    settings: [
      {
        name: 'endpoint',
        label: 'Endpoint',
        type: 'Input',
      },
      {
        name: 'form',
        label: 'Form',
        type: 'Input',
      },
      {
        name: 'sorting',
        label: 'Sorting',
        type: 'Json',
        default:
          '[{"name":"Name (A-Z)","key":"name"},{"name":"Name (Z-A)","key":"name,desc"}]',
      },
    ],
  },
  CardListingPage: {
    desc: 'Card listing page with add button',
    category: 'Template',
    components: [
      {
        component: 'Grid',
        sub: [
          {
            component: 'RepeatRow',
            endpoint: 'asset',
            sub: [
              {
                component: 'Card',
                sub: [
                  {
                    component: 'Row',
                    sub: [
                      {
                        component: 'Col',
                        sub: [
                          {
                            component: 'Group',
                            sub: [
                              {
                                component: 'Heading',
                                text: '{name}',
                              },
                              {
                                component: 'ModalButton',
                                icon: 'edit',
                                sub: [
                                  {
                                    component: 'Form',
                                    formId: 'asset',
                                    itemId: '{id}',
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    component: 'Row',
                    sub: [
                      {
                        component: 'Col',
                        sub: [
                          {
                            component: 'Heading',
                            size: 'h6',
                            // text: '{field::type=d/asset-type:id:name}',
                            text: '{asset-type.name}',
                          },
                          {
                            component: 'Map',
                            address: '{address}, {suburb} {state} {postcode}',
                            height: 100,
                            width: 100,
                          },
                          { component: 'Menu', text: '{name}' },
                        ],
                      },
                    ],
                  },
                  {
                    component: 'ChecklistList',
                  },
                  {
                    component: 'Row',
                    sub: [
                      {
                        component: 'ForEach',
                        sub: [
                          {
                            component: 'Text',
                            text: '{name}',
                          },
                        ],
                      },
                      {
                        component: 'ModalButton',
                        text: 'Add pool',
                        sub: [
                          {
                            component: 'Form',
                            formId: 'asset',
                            values: {
                              parent_id: '{id}',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    group: true,
  },
  ChecklistList: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'ForEach',
        item: 'asset-checklist',
        sub: [
          {
            component: 'Text',
            text: '{form}',
          },
        ],
      },
      {
        component: 'ModalButton',
        text: 'Link checklist',
        icon: 'plus',
        compact: true,
        variant: 'success',
        sub: [
          {
            component: 'Form',
            formId: 'asset-checklist',
            values: {
              parent_id: '{id}',
            },
          },
        ],
      },
    ],
  },
  PoolList: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'ForEach',
        sub: [
          {
            component: 'Text',
            text: '{name}',
          },
        ],
      },
      {
        component: 'ModalButton',
        text: 'Add pool',
        icon: 'plus',
        compact: true,
        variant: 'success',
        sub: [
          {
            component: 'Form',
            formId: 'asset',
            values: {
              parent_id: '{id}',
            },
          },
        ],
      },
    ],
  },
  AssetName: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'Stack',
        position: 'between',
        sub: [
          {
            component: 'Text',
            text: '{name}',
          },
          {
            component: 'ModalButton',
            icon: 'map',
            text: '',
            compact: true,
            sub: [
              {
                component: 'Map',
                address: '{address}, {suburb} {state} {postcode}',
              },
            ],
          },
        ],
      },
    ],
  },
  ManagerList: {
    category: 'Group',
    group: true,
    components: [
      {
        component: 'Group',
        position: 'between',
        sub: [
          {
            component: 'Link',
            to: '/admin/user-management',
            sub: [
              {
                component: 'Conditional',
                on: '{count::asset}',
                type: '!empty',
                sub: [
                  {
                    component: 'Text',
                    text: '{count::asset} Facility managers',
                  },
                  {
                    component: 'Button',
                    text: '{count::asset} Facility managers',
                    icon: 'plus',
                  },
                ],
              },
              {
                component: 'Conditional',
                on: '{count::asset}',
                type: 'empty',
                sub: [
                  {
                    component: 'Text',
                    text: 'Add manager',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

export default componentGroupRegistry

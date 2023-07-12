const page = {
  id: 'd7e4bea6-653e-11ed-9022-0242ac120002',
  path: 'maintenance',
  name: 'Maintenance',
  icon: 'build',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/maintenance',
      form: 'maintenance',
      columns: [
        // {
        //   name: 'Ref',
        //   key: '#{maintenance_ref}',
        //   width: '70px',
        // },
        {
          name: 'Asset',
          key: '#{maintenance_ref} {e::asset.name}',
        },
        {
          name: 'Date identified',
          key: 'date::date',
          width: '130px',
          badge: true,
          title: true,
        },
        {
          name: 'Due date',
          // key: 'date::due_date',
          width: '130px',
          badge: true,
          title: true,
          sub: [
            {
              component: 'Conditional',
              on: '{due_date}',
              type: '!empty',
              sub: [{ component: 'FormatDate', date: '{due_date}' }],
            },
          ],
        },
        {
          name: 'Issue',
          key: 'issue',
        },
        {
          name: 'Urgent',
          key: 'urgent',
          width: '80px',
          badge: true,
          title: true,
        },
        {
          name: 'Status',
          width: '120px',
          sub: [
            {
              component: 'Conditional',
              on: '{completed}',
              type: 'empty',
              sub: ['Logged'],
            },
            {
              component: 'Conditional',
              on: '{completed}',
              type: '!empty',
              sub: ['Completed'],
            },
          ],
          badge: true,
          title: true,
        },
        {
          name: 'Actions',
          key: 'actions',
          sub: [
            {
              component: 'Group',
              sub: [
                {
                  component: 'Conditional',
                  on: '{completed}',
                  type: '!empty',
                  sub: [
                    {
                      component: 'ModalButtonForm',
                      icon: 'Search',
                      compact: true,
                      formId: 'maintenance',
                      itemId: '{id}',
                      readOnly: true,
                    },
                  ],
                },
                {
                  component: 'Conditional',
                  on: '{completed}',
                  type: 'empty',
                  sub: [
                    {
                      component: 'ModalButtonForm',
                      icon: 'Edit',
                      compact: true,
                      formId: 'maintenance',
                      itemId: '{id}',
                    },
                    {
                      component: 'DeleteButton',
                      compact: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      titleSub: [
        {
          component: 'ModalButtonForm',
          text: 'Log new issue',
          icon: 'plus',
          formId: 'maintenance',
          itemId: 'new',
          defaultValues: { 'ai::maintenance_ref': '' },
        },
      ],
      filters: [
        {
          key: 'status',
          label: 'Status',
          default: 'logged',
          options: [
            {
              label: 'Logged',
              value: 'logged',
              conditions: [{ on: 'completed', type: 'empty' }],
            },
            {
              label: 'Completed',
              value: 'completed',
              conditions: [{ on: 'completed', type: '!empty' }],
            },
          ],
        },
        {
          key: 'urgent',
          label: 'Urgent',
          options: [
            {
              label: 'Urgent',
              value: 'yes',
              conditions: [{ on: 'urgent', type: '!empty' }],
            },
            {
              label: 'Not urgent',
              value: 'no',
              conditions: [{ on: 'urgent', type: 'empty' }],
            },
          ],
        },
      ],
      sorting: [
        {
          name: 'Name (A-Z)',
          key: 'asset.name,asc',
        },
        {
          name: 'Name (Z-A)',
          key: 'asset.name,desc',
        },
        {
          name: 'Date (Newest-Oldest)',
          key: 'date,desc',
          default: true,
        },
        {
          name: 'Date (Oldest-Newest)',
          key: 'date,asc',
        },
      ],
    },
  ],
  permission: 'dashboard',
  module: 'maintenance',
  show: 2,
  category: 'maintenance',
  order: 10,
}

export default page

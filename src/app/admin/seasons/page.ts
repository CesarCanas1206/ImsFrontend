const page = {
  id: '709ba5b4-64a5-11ed-9022-0242ac120002',
  parent_id: '056cc895-63ec-11ed-9fe0-54cd06b88880',
  path: 'admin/seasons',
  name: 'Seasons',
  module: 'allocation',
  icon: 'sun',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/season',
      columns: [
        { name: 'Name', key: 'name' },
        {
          name: 'Status',
          sub: [
            {
              component: 'Conditional',
              on: '{status}',
              type: '=',
              value: 'Open',
              sub: [
                {
                  component: 'Badge',
                  sub: ['Open'],
                  color: 'green',
                },
              ],
            },
            {
              component: 'Conditional',
              on: '{status}',
              type: '=',
              value: 'Closed',
              sub: [
                {
                  component: 'Badge',
                  sub: ['Closed'],
                  color: 'red',
                },
              ],
            },
          ],
        },
        {
          name: 'Start date',
          key: 'date::start',
          group: true,
          title: true,
        },
        {
          name: 'End date',
          key: 'date::end',
          group: true,
          title: true,
        },
        {
          name: 'Actions',
          key: 'action',
          sub: [
            {
              component: 'Group',
              compact: true,
              sub: [
                {
                  component: 'ModalButtonForm',
                  icon: 'edit',
                  formId: 'season',
                  itemId: '{id}',
                },
                {
                  component: 'DeleteButton',
                  endpoint: '{id}',
                },
              ],
            },
          ],
        },
      ],
      titleSub: [
        {
          component: 'ModalButtonForm',
          icon: 'plus',
          text: 'Add new',
          formId: 'season',
          itemId: 'new',
        },
        { component: 'Space', h: 'sm' },
      ],
      sorting: [
        {
          name: 'Name (A-Z)',
          key: 'name,asc',
        },
        {
          name: 'Name (Z-A)',
          key: 'name,desc',
        },
        {
          name: 'Start date (Oldest - Newest)',
          key: 'start',
        },
        {
          name: 'Start date (Newest- Oldest)',
          key: 'start,desc',
        },
      ],
      filters: [
        {
          label: 'Opened',
          key: 'opened',
          options: [
            {
              label: 'Open',
              value: 'Open',
              conditions: [{ on: 'status', type: 'contains', value: 'open' }],
            },
            {
              label: 'Closed',
              value: 'Closed',
              conditions: [{ on: 'status', type: '!contains', value: 'open' }],
            },
          ],
        },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
}

export default page

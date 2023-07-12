const page = {
  id: 'f979b264-64a4-11ed-9022-0242ac120002',
  parent_id: '7c37508b-0502-4c32-b502-73c4fe70cb5a',
  path: 'admin/feature-list',
  name: 'Feature list',
  module: 'booking',
  icon: 'checklist',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/features',
      columns: [
        // { name: 'Id', key: 'id' },
        { name: 'Name', key: 'name' },
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
                      formId: 'features',
                      itemId: '{id}',
                    },
                  ],
                },
                { component: 'DeleteButton' },
              ],
            },
          ],
        },
      ],
      sub: [
        {
          component: 'ModalButton',
          icon: 'plus',
          text: 'Add new',
          sub: [
            {
              component: 'Form',
              formId: 'features',
            },
          ],
        },
        { component: 'Space', h: 'sm' },
      ],
    },
  ],
  permission: 'dashboard',
  show: 0,
  category: 'admin',
  order: 13,
}

export default page

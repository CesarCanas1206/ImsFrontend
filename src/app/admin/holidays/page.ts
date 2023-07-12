const page = {
  id: 'f979ac60-64a4-11ed-9022-0242ac120002',
  parent_id: '056cc895-63ec-11ed-9fe0-54cd06b88880',
  path: 'admin/holidays',
  name: 'Holidays',
  module: 'booking',
  icon: 'rowing',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'calendar?form_id=holiday',
      columns: [
        { name: 'Holiday', key: 'title' },
        {
          name: 'Date from',
          key: 'From: {dateTime::start}',
          badge: true,
        },
        {
          name: 'Date to',
          key: 'To: {dateTime::end}',
          badge: true,
        },
        {
          name: 'Actions',
          key: 'action',
          sub: [
            {
              component: 'Group',
              sub: [
                {
                  component: 'ModalButtonForm',
                  icon: 'edit',
                  formId: 'holiday',
                  itemId: '{id}',
                },
                {
                  component: 'DeleteButton',
                },
              ],
            },
          ],
        },
      ],
      sub: [
        {
          component: 'ModalButtonForm',
          icon: 'plus',
          text: 'Add new',
          formId: 'holiday',
          itemId: 'new',
        },
        { component: 'Space', h: 'sm' },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 14,
}

export default page

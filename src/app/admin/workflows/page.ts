const page = {
  id: '31708c06-64a5-11ed-9022-0242ac120002',
  parent_id: '7fae34b7-a723-4d2a-bff0-4fd8a53d497a',
  path: 'admin/workflow',
  name: 'Workflows',
  ims: true,
  icon: 'flow',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/workflow',
      form: 'workflow',
      columns: [
        {
          name: 'Name',
          key: 'name',
        },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 20,
}

export default page

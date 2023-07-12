const page: object = {
  id: '5781469e-64a3-11ed-9022-0242ac120002',
  path: 'admin/asset-management',
  name: 'Venues',
  icon: 'building',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'venue-list',
      columns: [
        { name: 'Asset', sub: [{ component: 'AssetCard' }], single: true },
      ],
      titleSub: [
        {
          component: 'ModalButtonForm',
          icon: 'plus',
          text: 'Add new',
          formId: 'asset',
          size: 'xl',
          sentValues: {
            previewMode: true
          }
        },
      ],
    },
  ],
  parent_id: 'e5b09470-275c-4149-84d1-49d61b8c3493',
  show: 2,
  order: 0,
  category: 'admin',
  permission: 'admin',
}

export default page

const page = {
  id: '31709070-64a5-11ed-9022-0242ac120002',
  parent_id: 'e5b09470-275c-4149-84d1-49d61b8c3493',
  path: 'admin/asset-type',
  name: 'Venue types',
  icon: 'building',
  components: [
    {
      component: 'DataGrid',
      props: {
        endpoint: 'd/asset-type?sort_by=name',
        card_grid: true,
        columns: [
          { name: 'Venue type', key: 'name', feature: true },
          {
            name: 'Sub type',
            key: 'sub-type',
            badge: true,
            title: true,
          },
          {
            name: 'Has capacity',
            key: 'has_capacity',
            badge: true,
            title: 'Capacity',
          },
          {
            name: 'Default pricing',
            key: '{e::pricing.name}',
            badge: true,
          },
          {
            name: 'Actions',
            key: 'action',
            components: [
              {
                component: 'Group',
                compact: true,
                sub: [
                  {
                    component: 'ModalButtonForm',
                    icon: 'edit',
                    formId: 'asset-type',
                    itemId: '{id}',
                    autosave: 'true',
                  },
                  {
                    component: 'DeleteButton',
                  },
                ],
              },
            ],
          },
        ],
      },
      no_results: [
        {
          component: 'AddDefault',
          endpoint: 'd/asset-type',
          presets: [
            {
              name: 'Building',
            },
            {
              name: 'Facility',
            },
            {
              name: 'Field',
            },
            {
              name: 'Reserve',
            },
            {
              name: 'Court',
            },
            {
              name: 'Pavilion',
            },
            {
              name: 'Playing field',
            },
            {
              name: 'Meeting room',
            },
            {
              name: 'Open space',
            },
            {
              name: 'Pool',
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

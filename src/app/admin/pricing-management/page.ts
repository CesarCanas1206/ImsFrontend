const page = {
  id: 'f979b41c-64a4-11ed-9022-0242ac120002',
  parent_id: '056cc895-63ec-11ed-9fe0-54cd06b88880',
  path: 'admin/pricing-management',
  name: 'Pricing',
  module: 'booking',
  icon: 'Dollar',
  components: [
    {
      component: 'DataGrid',
      props: {
        endpoint: 'd/pricing?sort_by=name',
        card_grid: true,
        columns: [
          {
            name: 'Default pricing',
            key: 'defaultpricing',
            sub: [
              {
                component: 'Heading',
                text: '{name}',
              },
              {
                component: 'PricingGrid',
                itemId: '{id}',
                readOnly: true,
                showFilters: false,
              },
            ],
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
                    size: 'xl',
                    compact: true,
                    formId: 'pricing',
                    itemId: '{id}',
                  },
                  { component: 'DeleteButton', compact: true },
                ],
              },
            ],
          },
        ],
      },
      no_results: [
        {
          component: 'AddDefault',
          endpoint: 'd/pricing',
          presets: [
            {
              name: 'Building',
            },
          ],
        },
      ],
      sub: [
        {
          component: 'Group',
          sub: [
            {
              component: 'ModalButtonForm',
              icon: 'plus',
              size: 'xl',
              text: 'Add new',
              formId: 'pricing',
            },
            { component: 'Space', h: 'sm' },
          ],
        },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 12,
}

export default page

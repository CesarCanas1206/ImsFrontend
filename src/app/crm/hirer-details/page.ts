const page = {
  id: 'c116ad38-3fb8-40f4-9e39-67f4d2c2bd24',
  path: 'crm/hirer-details/:hirer_id',
  name: 'Hirer Details',
  icon: 'users',
  components: [
    {
      component: 'HirerDetails',
    },
    {
      component: 'SimpleGrid',
      grow: 'true',
      align: 'start',
      cols: 2,
      sub: [
        {
          component: 'Card',
          sub: [
            {
              component: 'Heading',
              text: 'Keys',
            },
            {
              component: 'SimpleList',
              props: {
                endpoint: 'key-register?hirer_id={hirer_id}',
                formId: 'key-register',
                hirerId: '{hirer_id}',
                columnList: [
                  { label: 'Reference', value: 'name' },
                  { label: 'Venue', value: 'asset_id' },
                ],
              },
            },
          ],
        },
        {
          component: 'Card',
          sub: [
            {
              component: 'Heading',
              text: 'Equipment',
            },
            {
              component: 'SimpleList',
              props: {
                endpoint: 'equipment-list?hirer_id={hirer_id}',
                formId: 'equipment',
                hirerId: '{hirer_id}',
                columnList: [
                  { label: 'Name', value: 'name' },
                  { label: 'Venue', value: 'hirer_id' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      component: 'Space',
      h: 'sm',
    },
    {
      component: 'SimpleGrid',
      grow: 'true',
      align: 'start',
      cols: 2,
      sub: [
        {
          component: 'Card',
          sub: [
            {
              component: 'Heading',
              text: 'Storage',
            },
            {
              component: 'SimpleList',
              props: {
                endpoint: 'storage-list?hirer_id={hirer_id}',
                formId: 'storage',
                hirerId: '{hirer_id}',
                columnList: [
                  { label: 'Name', value: 'name' },
                  { label: 'Venue', value: 'hirer_id' },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      component: 'HirerDetailsAdditional',
    },
  ],
  // show: 2,
  order: 1,
  category: 'crm',
  module: 'crm',
  permission: 'dashboard',
}

export default page

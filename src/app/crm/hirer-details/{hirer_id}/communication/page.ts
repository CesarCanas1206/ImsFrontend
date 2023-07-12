const page = {
  id: 'c116ad38-3fb8-40f4-9e39-67f4d2c2bd24',
  path: 'crm/hirer-details/:hirer_id/communication',
  name: 'Hirer Details - Communication',
  icon: 'phone',
  components: [
    {
      component: 'BackButton',
    },
    {
      component: 'Heading',
      props: { text: 'Communication' },
    },
    // {
    //   component: 'HirerDetails',
    // },
    // {
    //   component: 'SimpleGrid',
    //   grow: 'true',
    //   align: 'start',
    //   sub: [
    //     {
    //       component: 'Card',
    //       sub: [
    //         {
    //           component: 'Heading',
    //           text: 'Keys',
    //         },
    //         {
    //           component: 'SimpleList',
    //           props: {
    //             endpoint: 'key-register?asset_id={asset_id}',
    //             formId: 'key-register',
    //             assetId: '{asset_id}',
    //             columnList: [
    //               { label: 'Name', value: 'name' },
    //               { label: 'Hirer', value: 'hirer_id' },
    //             ],
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       component: 'Card',
    //       sub: [
    //         {
    //           component: 'Heading',
    //           text: 'Equipment',
    //         },
    //         {
    //           component: 'SimpleList',
    //           props: {
    //             endpoint: 'equipment-list?asset_id={asset_id}',
    //             formId: 'equipment',
    //             assetId: '{asset_id}',
    //             columnList: [
    //               { label: 'Name', value: 'name' },
    //               { label: 'Hirer', value: 'hirer_id' },
    //             ],
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       component: 'Card',
    //       sub: [
    //         {
    //           component: 'Heading',
    //           text: 'Storage',
    //         },
    //         {
    //           component: 'SimpleList',
    //           props: {
    //             endpoint: 'storage-list?asset_id={asset_id}',
    //             formId: 'storage',
    //             assetId: '{asset_id}',
    //             columnList: [
    //               { label: 'Name', value: 'name' },
    //               { label: 'Hirer', value: 'hirer_id' },
    //             ],
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   component: 'HirerDetails2',
    // },
  ],
  // show: 2,
  order: 1,
  category: 'crm',
  module: 'crm',
  permission: 'dashboard',
}

export default page

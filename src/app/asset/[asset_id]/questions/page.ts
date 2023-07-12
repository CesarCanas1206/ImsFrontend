const page = {
  id: 'a16e2823-e2b6-4419-b49a-9628c0762405',
  path: 'asset/:asset_id/questions',
  name: 'Venue questions',
  components: [
    {
      component: 'SetTitle',
      props: {
        text: ' - Venue questions',
        asset_id: '{params.asset_id}',
      },
    },
    {
      component: 'DataGrid',
      endpoint: 'd/asset-question?asset_id={asset_id}&sort_by=question_order',
      columns: [
        {
          name: 'Question',
          key: 'label',
        },
        {
          name: 'Type',
          key: 'type',
        },
        {
          name: 'Actions',
          key: 'actions',
          sub: [
            {
              component: 'Group',
              sub: [
                {
                  component: 'ModalButtonForm',
                  icon: 'edit',
                  formId: 'asset-question',
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
          component: 'Group',
          position: 'apart',
          sub: [
            {
              component: 'BackButton',
            },
            {
              component: 'ModalButtonForm',
              icon: 'plus',
              text: 'Add question',
              size: 'xl',
              formId: 'asset-question',
              itemId: 'new',
              defaultValues: { asset_id: '{asset_id}' },
            },
          ],
        },
      ],
    },
  ],
  show: 0,
  order: 6,
  // category: 'crm',
  // module: 'crm',
  // permission: 'dashboard',
}

export default page

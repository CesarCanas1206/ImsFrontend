const page = {
  id: '317092dc-64a5-11ed-9022-0242ac120002',
  parent_id: 'f979b5d4-64a4-11ed-9022-0242ac120002',
  path: 'checklist-test',
  name: 'Checklist test',
  icon: 'checklist',
  components: [
    {
      component: 'DataGrid',
      props: {
        endpoint: 'd/daily',
        columns: [
          { name: 'Facility', key: 'name' },
          {
            name: 'Last check',
            key: 'inspection',
            sub: [{ component: 'InspectionButton' }],
            components: [{ component: 'InspectionButton' }],
          },
          {
            name: 'Open issues',
            key: 'issues',
            sub: [{ component: 'OpenIssuesButton' }],
          },
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
                        formId: 'daily',
                        itemId: '{id}',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    { component: 'Details', endpoint: 'd/daily' },
    {
      component: 'ChecklistListing',
      props: { slug: 'asset', form: 'weekly' },
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
}

export default page

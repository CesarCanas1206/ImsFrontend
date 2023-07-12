const page = {
  id: '709bad8e-64a5-11ed-9022-0242ac120002',
  parent_id: 'e5b09470-275c-4149-84d1-49d61b8c3493',
  path: 'admin/closures',
  name: 'Venue closures',
  show: 2,
  icon: 'cancel',
  components: [
    {
      component: 'DataGrid',
      props: {
        endpoint: 'calendar?form_id=closure',
        columns: [
          { name: 'Reason for closure', key: 'title', feature: true },
          { name: 'Closed venue/s', key: 'name' },
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
            name: 'All Day',
            key: 'All Day: {allday}',
            badge: true,
          },
          {
            name: 'Actions',
            key: 'action',
            components: [
              {
                component: 'Group',
                sub: [
                  {
                    component: 'ModalButtonForm',
                    compact: true,
                    icon: 'edit',
                    formId: 'closure',
                    itemId: '{id}',
                  },
                  {
                    component: 'DeleteButton',
                    compact: true,
                    endpoint: 'calendar/{id}',
                  },
                ],
              },
            ],
          },
        ],
        no_results: [
          {
            component: 'Alert',
            icon: 'Question',
            text: 'No results found',
          },
        ],
        sorting: [
          {
            name: 'Reason (A-Z)',
            key: 'reason',
          },
          {
            name: 'Reason (Z-A)',
            key: 'reason,desc',
          },
          {
            name: 'All Day (A-Z)',
            key: 'allday',
          },
          {
            name: 'All Day (Z-A)',
            key: 'allday,desc',
          },
        ],
        filters: [
          {
            label: 'All day',
            key: 'all_day',
            options: [
              {
                label: 'All day',
                value: 'yes',
                conditions: [{ on: 'allday', type: '=', value: 'Yes' }],
              },
              {
                label: 'Part day',
                value: 'no',
                conditions: [{ on: 'allday', type: 'empty' }],
              },
            ],
          },
        ],
      },
      sub: [
        {
          component: 'Group',
          sub: [
            { component: 'BackButton' },
            {
              component: 'ModalButtonForm',
              text: 'Add venue closure',
              icon: 'plus',
              formId: 'closure',
            },
          ],
        },
        { component: 'Space', h: 'sm', w: null },
      ],
    },
  ],
  permission: 'dashboard',
  module: 'booking',
  category: 'admin',
}

export default page

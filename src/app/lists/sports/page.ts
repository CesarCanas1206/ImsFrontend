const page = {
  id: '96f10425-6edd-49fd-ac5e-29c3a81e6156',
  parent_id: '7c37508b-0502-4c32-b502-73c4fe70cb5a',
  path: 'admin/sports',
  name: 'Sports',
  icon: 'Rowing',
  components: [
    {
      component: 'DataGrid',
      props: {
        endpoint: 'd/sport?sort_by=name',
        card_grid: true,
        columns: [
          { name: 'Name', key: 'name' },
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
                    formId: 'sport',
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
      titleSub: [
        {
          component: 'Group',
          sub: [
            {
              component: 'ModalButtonForm',
              icon: 'plus',
              text: 'Add new',
              formId: 'sport',
              itemId: 'new',
            },
          ],
        },
      ],
      no_results: [
        {
          component: 'AddDefault',
          endpoint: 'd/sport',
          presets: [
            {
              name: 'Cricket',
            },
            {
              name: 'Football',
            },
            {
              name: 'Tennis',
            },
            {
              name: 'Bowls',
            },
            {
              name: 'Cycling',
            },
            {
              name: 'Athletics',
            },
            {
              name: 'Bocce',
            },
            {
              name: 'Rugby Union',
            },
            {
              name: 'Netball',
            },
            {
              name: 'Lacrosse',
            },
            {
              name: 'Dog Club/Training',
            },
            {
              name: 'Hockey',
            },
            {
              name: 'Auskick',
            },
            {
              name: 'Baseball',
            },
            {
              name: 'Miscellaneous',
            },
            {
              name: 'Basketball',
            },
            {
              name: 'Croquet',
            },
            {
              name: 'Golf',
            },
            {
              name: 'Archery',
            },
            {
              name: 'Swimming',
            },
            {
              name: 'Dancing',
            },
            {
              name: 'Soccer',
            },
            {
              name: 'Table tennis',
            },
            {
              name: 'Snooker',
            },
            {
              name: 'Rugby League',
            },
            {
              name: 'Gridiron',
            },
            {
              name: 'AFL football',
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

const form = {
  id: '35c31fd0-e465-4e31-b6b4-0db9a37250d7',
  name: 'Hirer Details form',
  reference: 'hirer_details',
  description: 'Hirer details form',
  endpoint: 'hirer',
  questions: [
    {
      props: { text: 'Office bearers' },
      reference: '',
      component: 'FormHeading',
      form_props: { questionWidth: 12 },
    },
    {
      text: '',
      component: 'DataGrid',
      props: {
        endpoint: 'd/office-bearer?parent_id={form.id}',
        columns: [
          {
            name: 'Name',
            key: '{first_name} {last_name}',
            feature: true,
          },
          {
            name: 'Email',
            key: 'email',
            title: true,
          },
          {
            name: 'Roles',
            key: 'role',
            title: true,
          },
          {
            name: 'Actions',
            key: 'actions',
            sub: [
              {
                component: 'ModalButton',
                icon: 'edit',
                compact: true,
                sub: [
                  {
                    component: 'Form',
                    formId: 'office-bearer',
                    itemId: '{row.id}',
                    t: '{checking}',
                  },
                ],
              },
            ],
          },
        ],
      },
      form_props: { questionWidth: 0, answerWidth: 12 },
    },
    {
      props: { text: 'Key Register' },
      reference: '',
      component: 'FormHeading',
      form_props: { questionWidth: 12 },
    },

    {
      text: '',
      component: 'DataGrid',
      compact: true,
      form_props: { questionWidth: 0, answerWidth: 12 },
      props: {
        endpoint: 'd/key-register?parent_id={form.id}',
        columns: [
          {
            name: 'Key name/reference',
            key: 'name',
            feature: true,
          },
          { name: 'Keys', key: 'keys', title: true },
          { name: 'Key code', key: 'key_code', title: true },
          { name: 'Alarm code', key: 'alarm_code', title: true },
          {
            name: 'Actions',
            key: 'actions',
            sub: [
              {
                component: 'ModalButton',
                icon: 'edit',
                sub: [
                  {
                    component: 'Form',
                    formId: 'key-register',
                    itemId: '{row.id}',
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
          text: 'No Keys found',
        },
      ],
    },
  ],
}

export default form

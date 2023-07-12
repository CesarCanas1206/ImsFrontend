const form = {
  id: 'f5ea5532-7c2c-4851-ac4d-13fe36ccbff9',
  name: 'Client contacts',
  reference: 'client-contact',
  description: 'Client contact form',
  endpoint: 'hirer',
  questions: [
    {
      props: { text: 'Office bearers / contacts' },
      component: 'FormHeading',
      form_props: { question_width: 0, answer_width: 12 },
    },
    {
      component: 'DataGrid',
      id: 'f31ae11b-3266-4984-9927-541b27e5dd95',
      props: {
        endpoint: 'd/office-bearer?parent_id={parent_id || id}',
        filter: false,
        position: 'bottom',
        compact: true,
        columns: [
          {
            name: 'Name',
            key: '{first_name} {last_name}',
          },
          {
            name: 'Role',
            key: 'role',
            badge: true,
          },
          {
            name: 'Liaison',
            key: 'liaison',
            badge: true,
            title: true,
          },
          {
            name: 'Booking contact',
            key: 'contact',
            badge: true,
            title: true,
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
                    icon: 'Edit',
                    compact: true,
                    tooltip: 'Edit contact',
                    formId: 'office-bearer',
                    itemId: '{row.id}',
                  },
                  {
                    component: 'DeleteButton',
                    compact: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      form_props: { question_width: 0, answer_width: 12 },
    },
    {
      id: 'ca102f64-7a55-40d0-a135-f45274f47352',
      parent_id: 'f31ae11b-3266-4984-9927-541b27e5dd95',
      component: 'FormReadOnly',
      props: { show: false },
    },
    {
      parent_id: 'ca102f64-7a55-40d0-a135-f45274f47352',
      component: 'Space',
      props: { h: 'sm' },
    },
    {
      id: 'c6f6d50e-a9bc-463e-8783-dc234cad1650',
      parent_id: 'ca102f64-7a55-40d0-a135-f45274f47352',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      parent_id: 'c6f6d50e-a9bc-463e-8783-dc234cad1650',
      component: 'ModalButtonForm',
      props: {
        icon: 'plus',
        text: 'Add contact',
        formId: 'office-bearer',
        itemId: 'new',
        defaultValues: { parent_id: '{parent_id || id}' },
      },
    },
  ],
}

export default form

const form = {
  id: 'b239e601-7e6a-4f72-b1f7-a858e6fb3867',
  name: 'Trainer form',
  reference: 'trainer',
  endpoint: 'd/casual',
  questions: [
    {
      id: 'a56403c7-cf61-439a-b1ef-59a3b637544a',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      parent_id: 'a56403c7-cf61-439a-b1ef-59a3b637544a',
      text: 'Hirer name',
      reference: 'parent_id',
      component: 'Select',
      props: { endpoint: 'hirer' },
    },
    {
      component: 'FormHeading',
      props: { text: 'Applicant information' },
    },
    {
      text: 'Contact details',
      component: 'InputContact',
    },
    { text: 'ABN or ACN', reference: 'abn', component: 'Input' },
    {
      text: 'Postal address',
      component: 'InputAddress',
      props: { prefix: '' },
    },
    {
      component: 'FormHeading',
      props: { text: 'Training details' },
    },
    {
      id: '400a140e-951a-45e6-97d2-2aa926f431ca',
      component: 'DataGrid',
      props: {
        endpoint: 'usage?parent_id={id}',
        columns: [
          { name: 'Location', key: 'asset.name' },
          { name: 'Date', key: 'day', title: true, badge: true },
          {
            name: 'Time',
            key: '{time::start} - {time::end}',
            title: true,
            badge: true,
          },
          { name: 'Group size', key: 'group_size', title: true },
          { name: 'Activity', key: 'activity', title: true },
          {
            name: 'Actions',
            key: 'actions',
            sub: [
              {
                component: 'FormReadOnly',
                show: false,
                sub: [
                  {
                    component: 'Group',
                    sub: [
                      {
                        component: 'ModalButtonForm',
                        formId: 'training-details',
                        itemId: '{row.id}',
                        icon: 'Edit',
                        autosave: false,
                      },
                    ],
                  },
                  {
                    component: 'DeleteButton',
                  },
                ],
              },
            ],
          },
        ],
        position: 'bottom',
      },
    },
    {
      id: 'f3482538-1e1b-4894-b06c-53c8b6501b33',
      parent_id: '400a140e-951a-45e6-97d2-2aa926f431ca',
      component: 'FormReadOnly',
      props: { show: false },
    },
    {
      parent_id: 'f3482538-1e1b-4894-b06c-53c8b6501b33',
      component: 'Space',
      props: { h: 'sm' },
    },
    {
      id: '93dc29e9-d9ae-4245-8a1d-54e339856a88',
      parent_id: 'f3482538-1e1b-4894-b06c-53c8b6501b33',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      parent_id: '93dc29e9-d9ae-4245-8a1d-54e339856a88',
      component: 'ModalButtonForm',
      props: {
        text: 'Add training details',
        icon: 'Plus',
        formId: 'training-details',
        itemId: 'new',
        autosave: false,
        defaultValues: { parent_id: '{id}' },
      },
    },
    {
      component: 'FormHeading',
      props: { text: 'Equipment' },
    },
    {
      component: 'PlainText',
      props: {
        text: 'Please list all equipment you intend to set up and/or use in the park',
      },
    },
    {
      id: 'e32a9286-5f1f-419b-9696-8660e1ab8767',
      component: 'DataGrid',
      props: {
        endpoint: 'd/equipment?parent_id={id}',
        columns: [
          { name: 'Item', key: 'name' },
          {
            name: 'Actions',
            key: 'actions',
            sub: [
              {
                component: 'Group',
                sub: [
                  {
                    component: 'ModalButtonForm',
                    formId: 'equipment',
                    itemId: '{row.id}',
                    icon: 'Edit',
                    autosave: false,
                  },
                ],
              },
            ],
          },
        ],
        position: 'bottom',
      },
    },
    {
      id: '80a30d17-a2a7-470e-9595-5bc2235593c9',
      parent_id: 'e32a9286-5f1f-419b-9696-8660e1ab8767',
      component: 'FormReadOnly',
      props: { show: false },
    },
    {
      parent_id: '80a30d17-a2a7-470e-9595-5bc2235593c9',
      component: 'Space',
      props: { h: 'sm' },
    },
    {
      id: '8da0a944-b56c-46a2-a7d1-2e99adeae514',
      parent_id: '80a30d17-a2a7-470e-9595-5bc2235593c9',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      parent_id: '8da0a944-b56c-46a2-a7d1-2e99adeae514',
      component: 'ModalButtonForm',
      props: {
        text: 'Add equipment',
        icon: 'Plus',
        formId: 'equipment',
        itemId: 'new',
        autosave: false,
        defaultValues: { parent_id: '{id}' },
      },
    },
    {
      component: 'FormHeading',
      props: { text: 'Attachments' },
    },
    {
      text: 'Public liability insurance of over $10 million',
      reference: 'public_liability',
      component: 'FileDoc',
      props: { hasExpiry: true },
      form_props: { question_width: 6, answer_width: 6 },
    },
    {
      text: 'Risk management plan',
      reference: 'risk_management',
      component: 'FileDoc',
      form_props: { question_width: 6, answer_width: 6 },
    },
    {
      text: 'Evidence of registration with Fitness Australia or another recognised peak body or educational institution',
      reference: 'educational_institute',
      component: 'FileDoc',
      props: { hasExpiry: true },
      form_props: { question_width: 6, answer_width: 6 },
    },
    {
      component: 'FormHeading',
      props: { text: 'PRIVACY AND DATA PROTECTION ACT 2014' },
    },
    {
      component: 'PlainText',
      props: {
        text: 'The information provided as part of this form will be used by the City of Stonnington to assist in the provision, planning and development of venues and facilities for hire within the municipality. Information provided by you will only be used for the purpose for which it was collected. The information provided will not be disclosed to any outside organisation or third party. Individuals about whom ‘personal information’ is provided in the application may apply to the City of Stonnington’s Privacy Officer on telephone 8290 1333 for access to or correction of information.',
      },
    },
    {
      component: 'FormHeading',
      props: { text: 'Agreement' },
    },
    {
      component: 'Terms',
    },
    {
      id: '0bd06193-ddf3-49fc-8002-e5abb7b2c91f',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      id: '8df9c60d-ca4a-445b-bce6-dd71096ce22a',
      parent_id: '0bd06193-ddf3-49fc-8002-e5abb7b2c91f',
      component: 'Confirm',
      props: {
        icon: 'Tick',
        variant: 'success',
        text: 'Complete',
        title: 'Complete this booking?',
      },
      form_props: {
        conditions: [{ on: 'completed', type: 'empty' }],
      },
    },
    {
      parent_id: '8df9c60d-ca4a-445b-bce6-dd71096ce22a',
      component: 'Action',
      props: {
        action: 'update',
        endpoint: 'd/{id}',
        data: {
          completed: '1',
        },
      },
    },
    {
      id: '1368ee34-4e87-4c36-b7fc-46f310a2bffa',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      id: '3e16c689-e286-42a3-9584-678291bb0914',
      parent_id: '1368ee34-4e87-4c36-b7fc-46f310a2bffa',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      id: '43846623-d65d-4fa2-b6cd-8717efb36231',
      parent_id: '3e16c689-e286-42a3-9584-678291bb0914',
      component: 'Confirm',
      props: {
        icon: 'Tick',
        variant: 'success',
        text: 'Approve',
        title: 'Approve this booking?',
      },
      form_props: {
        conditions: [
          { on: 'completed', type: '!empty' },
          { on: 'approved', type: 'empty' },
        ],
      },
    },
    {
      parent_id: '43846623-d65d-4fa2-b6cd-8717efb36231',
      component: 'Action',
      props: {
        action: 'update',
        endpoint: 'd/{id}',
        data: {
          approved: '1',
        },
      },
    },
  ],
}

export default form

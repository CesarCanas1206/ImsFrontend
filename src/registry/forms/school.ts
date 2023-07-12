const form = {
  id: 'b239e601-7e6a-4f72-b1f7-a858e6fb3867',
  name: 'School form',
  reference: 'school',
  endpoint: 'd/allocation',
  // form_props: { required: true },
  questions: [
    {
      props: {
        text: '{form.season.name}: {date::form.season.start} - {date::form.season.end}',
      },
      component: 'Heading',
    },
    {
      props: { text: 'Application' },
      component: 'FormHeading',
    },
    {
      text: 'Application ID',
      reference: 'application_id',
      component: 'ReadOnly',
      props: { text: '{application_id || id}' },
    },
    {
      id: 'b7a3b975-4625-4fdd-adb9-675bc18295b6',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      parent_id: 'b7a3b975-4625-4fdd-adb9-675bc18295b6',
      text: 'Hirer name',
      reference: 'parent_id',
      component: 'Select',
      props: { endpoint: 'hirer' },
    },
    {
      component: 'FormHeading',
      props: { text: 'School information' },
    },
    { text: 'School name', reference: 'name', component: 'Input' },
    {
      text: 'School address',
      component: 'InputAddress',
      props: { prefix: '' },
    },
    {
      text: 'Postal address',
      component: 'InputAddress',
      props: { prefix: 'postal_', sameAs: true },
    },
    {
      text: 'Type of school',
      reference: 'type',
      component: 'Segmented',
      props: {
        data: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Combined', value: 'combined' },
        ],
      },
    },
    {
      component: 'FormHeading',
      props: { text: 'Sports coordinator' },
    },
    {
      text: 'Sports coordinator',
      reference: '',
      component: 'InputContact',
      props: { prefix: 'coordinator_' },
    },
    {
      component: 'FormHeading',
      props: { text: 'Principal' },
    },
    {
      text: 'Principal',
      reference: '',
      component: 'InputContact',
      props: { prefix: 'principal_' },
    },
    {
      component: 'FormHeading',
      props: { text: 'Student enrolments' },
    },
    {
      component: 'PlainText',
      props: {
        text: 'To assist Council in the planning and development of Sporting Facilities, please complete the following information:',
      },
    },

    {
      text: 'No. of students enrolled',
      reference: 'count_enrolled',
      component: 'InputNumber',
    },
    {
      text: 'No. of male students',
      reference: 'count_male',
      component: 'InputNumber',
    },
    {
      text: 'No. of female students',
      reference: 'count_female',
      component: 'InputNumber',
    },
    {
      text: 'No. of Stonnington residents',
      reference: 'count_residents',
      component: 'InputNumber',
    },
    {
      component: 'FormHeading',
      props: { text: 'Sports participation' },
    },
    {
      component: 'PlainText',
      props: {
        text: 'We are interested in knowing what sports your School will be participating including sports not necessarily requiring sportsground use, e.g. indoor court space. Please complete the table below:',
      },
    },
    {
      id: 'fd54e8fd-9252-4d6f-81f8-071078709669',
      component: 'DataGrid',
      props: {
        endpoint: 'usage?parent_id={id}',
        columns: [
          { name: 'Sport', key: 'sport.name || sport', title: true },
          { name: 'Date', key: 'day', title: true, badge: true },
          {
            name: 'Time',
            key: '{time::start} - {time::end}',
            title: true,
            badge: true,
          },
          { name: 'Activity', key: 'activity', title: true },
          { name: 'Year level', key: 'year_level', title: true },
          {
            name: 'Actions',
            key: 'actions',
            sub: [
              {
                component: 'Group',
                sub: [
                  {
                    component: 'FormReadOnly',
                    show: false,
                    sub: [
                      {
                        component: 'ModalButtonForm',
                        formId: 'school-participation',
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
      id: 'f0952111-923d-4b2a-ace5-e9b276c9d017',
      parent_id: 'fd54e8fd-9252-4d6f-81f8-071078709669',
      component: 'FormReadOnly',
      props: { show: false },
    },
    {
      parent_id: 'f0952111-923d-4b2a-ace5-e9b276c9d017',
      component: 'Space',
      props: { h: 'sm' },
    },
    {
      id: 'a66a55ac-dab7-4f90-a3c1-58292a0b8cef',
      parent_id: 'f0952111-923d-4b2a-ace5-e9b276c9d017',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      parent_id: 'a66a55ac-dab7-4f90-a3c1-58292a0b8cef',
      component: 'ModalButtonForm',
      props: {
        text: 'Add school participation',
        icon: 'Plus',
        formId: 'school-participation',
        itemId: 'new',
        autosave: false,
        defaultValues: {
          parent_id: '{id}',
          season_id: '{form.season.id || season.id}',
        },
      },
    },
    {
      component: 'FormHeading',
      props: { text: 'Development' },
    },
    {
      component: 'PlainText',
      props: {
        text: 'To assist Council in the long term development and provision of sporting facilities, please state any formalised sports development plans or long term plans to upgrade or develop new sporting or recreation facilities.',
      },
    },
    {
      component: 'Textarea',
      reference: 'development',
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
      props: { text: 'Attachments' },
    },
    {
      component: 'Form',
      props: {
        formId: 'compliance-docs',
        layout: 'card',
        parent_id: '{parent_id}',
        item_specific_id: '{parent_id}',
        specific_id: '{parent_id}',
        hideSave: true,
        autosave: true,
      },
      form_props: {
        conditions: [{ on: 'parent_id', type: '!empty' }],
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
      id: '2532042f-df2a-4a89-a5eb-dae80c2a0c7f',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      id: '8df9c60d-ca4a-445b-bce6-dd71096ce22a',
      parent_id: '2532042f-df2a-4a89-a5eb-dae80c2a0c7f',
      component: 'ApplicationComplete',
      form_props: {
        conditions: [{ on: 'completed', type: 'empty' }],
      },
    },

    {
      id: '429639d9-45a3-4148-92c8-f8349c00ea93',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      id: '324f4e9b-c15b-48c0-9ec1-2e5f6967e523',
      parent_id: '429639d9-45a3-4148-92c8-f8349c00ea93',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      parent_id: '2532042f-df2a-4a89-a5eb-dae80c2a0c7f',
      component: 'ApplicationApprove',
    },
  ],
}

export default form

const casualForm = {
  id: '44f65f64-7a32-48b6-a36a-be993b2b0033',
  name: 'Casual booking',
  reference: 'casual',
  category: 'booking',
  description: 'Casual application form',
  workflow: ['booking.request.send'],
  endpoint: 'booking',
  questions: [
    {
      text: 'Application ID',
      reference: 'application_id',
      component: 'ReadOnly',
    },
    {
      props: { text: 'Contact details' },
      component: 'FormHeading',
    },
    {
      text: 'Hirer',
      reference: 'hirer_id',
      component: 'Select',
      props: {
        endpoint: 'hirer?sort_by=name',
        readOnly: true,
      },
    },
    {
      text: 'Organisation',
      reference: 'organisation',
      component: 'Input',
      form_props: { conditions: [{ on: 'hirer_id', type: 'empty' }] },
    },
    {
      text: 'Contact',
      reference: '',
      component: 'InputContact',
      form_props: { conditions: [{ on: 'hirer_id', type: 'empty' }] },
    },
    {
      props: { text: 'Booking details' },
      component: 'FormHeading',
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
    },
    {
      component: 'DataGrid',
      id: 'ed79cae6-8220-4546-b401-f7111c618bd8',
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
      props: {
        endpoint: 'usage?parent_id={id}&withParent',
        position: 'bottom',
        compact: true,
        no_results: [
          {
            component: 'Alert',
            text: 'No bookings have been added',
          },
        ],
        sorting: [
          { name: 'Added (oldest)', key: 'created_at' },
          { name: 'Added (latest)', key: 'created_at,desc|day', default: true },
          { name: 'Venue (A-Z)', key: 'asset.parent|asset.name' },
          { name: 'Venue (Z-A)', key: 'asset.parent,desc|asset.name,desc' },
        ],
        columns: [
          { name: 'Venue', key: '{asset.parent} - {asset.name}' },
          {
            name: 'Date/Time',
            key: '{date::date}: {time::start} - {time::end}',
            badge: true,
            title: true,
          },
          { name: 'Activities', key: 'activity', title: true },
          {
            name: 'Actions',
            key: 'actions',
            sub: [
              {
                component: 'Group',
                sub: [
                  {
                    component: 'ModalButtonForm',
                    formId: 'casualusage',
                    itemId: '{row.id}',
                    icon: 'Edit',
                    tooltip: 'Edit this usage item',
                    compact: true,
                    sentValues: {
                      hirer_id: '{hirer_id}',
                    },
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
    },
    {
      id: 'd80e6650-1724-488b-a50f-f7de4fe7d2c3',
      parent_id: 'ed79cae6-8220-4546-b401-f7111c618bd8',
      component: 'FormReadOnly',
      props: { show: false },
      form_props: {
        conditions: [
          { on: 'hirer_id', type: '!empty' },
          // { on: 'row.usage', type: '!empty' },
        ],
      },
    },
    {
      parent_id: 'd80e6650-1724-488b-a50f-f7de4fe7d2c3',
      component: 'Space',
      props: { h: 'sm' },
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
    },
    {
      id: '63a8c879-40b6-41a8-bb44-72944c205946',
      parent_id: 'd80e6650-1724-488b-a50f-f7de4fe7d2c3',
      component: 'Group',
      props: { position: 'right' },
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
    },
    {
      parent_id: '63a8c879-40b6-41a8-bb44-72944c205946',
      component: 'ModalButtonForm',
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
      props: {
        icon: 'plus',
        text: 'Add booking',
        formId: 'casualusage',
        itemId: 'new',
        sentValues: {
          hirer_id: '{hirer_id}',
        },
        defaultValues: {
          parent_id: '{id || form.id}',
        },
      },
    },
    {
      props: { text: 'Additional details' },
      component: 'FormHeading',
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
    },
    {
      text: 'Activity to be conducted',
      reference: 'activity',
      component: 'Textarea',
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
    },
    {
      text: 'Do you need access to public toilets?',
      reference: 'public_toilets',
      component: 'Switch',
      description: '* subject to reserve amenities.',
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
    },
    {
      text: 'Comments',
      reference: 'comments',
      component: 'Textarea',
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
    },
    {
      text: 'Upload supporting documents',
      reference: 'document',
      component: 'FileDoc',
      form_props: {
        required: false,
        conditions: [{ on: 'hirer_id', type: '!empty' }],
      },
    },
    {
      text: 'Pricing',
      component: 'Pricing',
      form_props: {
        conditions: [{ on: 'hirer_id', type: '!empty' }],
      },
    },
    {
      props: { text: 'Terms and conditions' },
      component: 'FormHeading',
      form_props: { conditions: [{ on: 'hirer_id', type: '!empty' }] },
    },
    {
      component: 'Terms',
      form_props: {
        questionWidth: 12,
        answerWidth: 12,
        conditions: [{ on: 'hirer_id', type: '!empty' }],
      },
    },
    {
      id: 'b2f05ca4-7e79-470f-b801-592df582d86b',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      id: '3e7e97b0-f240-4102-a3a4-77d4b9cdc9af',
      parent_id: 'b2f05ca4-7e79-470f-b801-592df582d86b',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      parent_id: '3e7e97b0-f240-4102-a3a4-77d4b9cdc9af',
      component: 'BookingComplete',
      form_props: {
        conditions: [
          { on: 'hirer_id', type: '!empty' },
          { on: 'completed', type: 'empty' },
        ],
      },
    },
    {
      parent_id: '3e7e97b0-f240-4102-a3a4-77d4b9cdc9af',
      component: 'BookingApprove',
      form_props: {
        conditions: [
          { on: 'completed', type: '!empty' },
          { on: 'approved', type: 'empty' },
        ],
      },
    },
    // {
    //   id: '1d5160df-4d42-4602-afb9-20a0a11bdeb2',
    //   component: 'HasPermission',
    //   props: { permission: 'admin' },
    //   form_props: { conditions: [{ on: 'parent_id', type: '!empty' }] },
    // },
    // {
    //   parent_id: '1d5160df-4d42-4602-afb9-20a0a11bdeb2',
    //   component: 'BookingAdminButtons',
    //   form_props: { conditions: [{ on: 'parent_id', type: '!empty' }] },
    // },
    {
      id: 'eaeb72e4-0761-4feb-af3f-4933a05f17f9',
      parent_id: '324f4e9b-c15b-48c0-9ec1-2e5f6967e523',
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
      parent_id: 'eaeb72e4-0761-4feb-af3f-4933a05f17f9',
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
export default casualForm

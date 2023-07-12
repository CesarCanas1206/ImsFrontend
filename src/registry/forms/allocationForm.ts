const form = {
  id: '545fd8b3-aba3-4e22-999f-6cba42b7a285',
  name: 'Allocation application',
  reference: 'allocation',
  category: 'allocation',
  description: 'Allocation application form',
  endpoint: 'booking',
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
      props: { text: '{application_id || form.application_id || id}' },
    },
    {
      text: 'Status',
      component: 'ItemStatus',
      props: { prefix: '' },
    },
    {
      text: 'Application started',
      component: 'FormatDate',
      props: { text: '{created_at || form.created_at}' },
    },
    {
      id: '19731427-aa59-4cfc-a656-e28f57ab1960',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      parent_id: '19731427-aa59-4cfc-a656-e28f57ab1960',
      component: 'Form',
      props: {
        readOnly: true,
        formId: 'hirer',
        itemId: '{parent_id}',
        hideSave: true,
      },
      form_props: {
        // conditions: [{ on: 'parent_id', type: '!empty' }],
      },
    },
    {
      component: 'Form',
      props: {
        formId: 'client-contact',
        itemId: '{hirer_id || parent_id}',
        hideSave: true,
      },
    },
    // Venue usage start
    {
      props: { text: 'Venue usage information' },
      component: 'FormHeading',
    },
    {
      component: 'DataGrid',
      id: '8d2532e2-0a7d-4741-b685-90fb70ea4cc6',
      props: {
        endpoint: 'usage?parent_id={id || application_id}&withParent',
        position: 'bottom',
        compact: true,
        no_results: [
          {
            component: 'Alert',
            text: 'No venue usage has been added',
          },
        ],
        sorting: [
          { name: 'Added (oldest)', key: 'created_at|day' },
          { name: 'Added (latest)', key: 'created_at,desc|day', default: true },
          { name: 'Venue (A-Z)', key: 'asset.parent|asset.name|day' },
          { name: 'Venue (Z-A)', key: 'asset.parent,desc|asset.name,desc|day' },
          { name: 'Day (Mon-Sun)', key: 'day', type: 'day' },
          { name: 'Day (Sun-Mon)', key: 'day,desc', type: 'day' },
        ],
        columns: [
          {
            name: 'Venue',
            key: '{asset.parent || asset.parent.name} - {asset.name}',
          },
          { name: 'Day', key: 'day', badge: true, title: true },
          {
            name: 'Time',
            key: '{time::start} - {time::end}',
            badge: true,
            title: true,
          },
          { name: 'Activities', key: 'activity', title: true },
          { name: 'Shared', key: 'shared', badge: true, title: true },
          {
            name: 'Actions',
            key: 'actions',
            sub: [
              {
                component: 'Group',
                sub: [
                  {
                    component: 'ModalButtonForm',
                    formId: 'usage',
                    itemId: '{row.id}',
                    icon: 'Edit',
                    tooltip: 'Edit this usage item',
                    compact: true,
                    sentValues: {
                      hirer_id: '{form.parent_id}',
                    },
                  },
                  {
                    component: 'DeleteButton',
                    compact: true,
                    endpoint: 'usage/{row.id}',
                    title: 'venue usage',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      id: '0f0ad2ff-4f7e-44c0-816e-5ec543ff923c',
      parent_id: '8d2532e2-0a7d-4741-b685-90fb70ea4cc6',
      component: 'FormReadOnly',
      props: { show: false },
    },
    {
      parent_id: '0f0ad2ff-4f7e-44c0-816e-5ec543ff923c',
      component: 'Space',
      props: { h: 'sm' },
    },
    {
      id: 'ebbb2e56-f9c9-4ced-9bc7-08a8a005e8ab',
      parent_id: '0f0ad2ff-4f7e-44c0-816e-5ec543ff923c',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      parent_id: 'ebbb2e56-f9c9-4ced-9bc7-08a8a005e8ab',
      component: 'ModalButtonForm',
      props: {
        icon: 'plus',
        text: 'Add venue usage',
        formId: 'usage',
        itemId: 'new',
        sentValues: {
          hirer_id: '{parent_id || form.parent_id}',
        },
        defaultValues: {
          parent_id: '{id || form.id}',
          date: '{form.season.start || season.start}',
          end_date: '{form.season.end || season.end}',
          repeating: 'Yes',
          pattern: 'dayweekly',
        },
      },
    },
    {
      parent_id: 'ebbb2e56-f9c9-4ced-9bc7-08a8a005e8ab',
      component: 'AddMultipleUsage',
      props: {
        formId: 'usage',
        text: 'Add multiple',
        sentValues: {
          hirer_id: '{parent_id || form.parent_id}',
        },
        defaultValues: {
          parent_id: '{id || form.id}',
          season_id: '{form.season.id || season.id}',
          date: '{form.season.start || season.start}',
          end_date: '{form.season.end || season.end}',
          hirer_id: '{parent_id || form.parent_id}',
          repeating: 'Yes',
        },
      },
    },
    // {
    //   component: 'VenueUsage',
    //   props: { applicationId: '{id || application_id}' },
    //   form_props: { question_width: 0, answer_width: 12 },
    // },
    // Venue usage end
    // Booking dates start
    // {
    //   props: {
    //     text: 'Booking dates',
    //   },
    //   component: 'FormHeading',
    //   form_props: { question_width: 0, answer_width: 12 },
    // },
    {
      id: 'dfc4d8ce-0175-4461-826f-d310415b2498',
      component: 'ModalButton',
      props: { icon: 'Calendar', text: 'View booking dates' },
      form_props: { conditions: [{ on: 'completed', type: '!empty' }] },
    },
    {
      parent_id: 'dfc4d8ce-0175-4461-826f-d310415b2498',
      component: 'BookingDates',
      props: {
        applicationId: '{id || application_id}',
        start: '{form.season.start}',
        end: '{form.season.end}',
      },
      form_props: { conditions: [{ on: 'completed', type: '!empty' }] },
    },
    // Booking dates end
    // Key register start
    {
      props: { text: 'Key register' },
      component: 'FormHeading',
    },
    {
      props: {
        text: 'The admin will allocate keys to this application',
        icon: 'Question',
      },
      component: 'Alert',
    },
    {
      component: 'DataGrid',
      id: '323e2faf-c48a-4aaa-b3dc-924507276672',
      props: {
        endpoint: 'd/key-register?hirer_id={parent_id}',
        filter: false,
        position: 'bottom',
        compact: true,
        columns: [
          {
            name: 'Name',
            key: 'name',
          },
          {
            name: 'Keys',
            key: 'keys',
            badge: true,
            title: true,
          },
          {
            name: 'Key code',
            key: 'key_code',
            badge: true,
            title: true,
          },
          {
            name: 'Alarm code',
            key: 'alarm_code',
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
                    component: 'ModalButton',
                    icon: 'Edit',
                    compact: true,
                    tooltip: 'Edit contact',
                    sub: [
                      {
                        component: 'Form',
                        formId: 'key-register',
                        itemId: '{row.id}',
                      },
                    ],
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
      id: '0baff1b2-bce7-48f4-bfbe-80acaed0e5cf',
      parent_id: '323e2faf-c48a-4aaa-b3dc-924507276672',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      id: '1f3e6bcf-ec4c-45d2-9e0d-b6340be4b678',
      parent_id: '0baff1b2-bce7-48f4-bfbe-80acaed0e5cf',
      component: 'FormReadOnly',
      props: { show: false },
    },
    {
      parent_id: '1f3e6bcf-ec4c-45d2-9e0d-b6340be4b678',
      component: 'Space',
      props: { h: 'sm' },
    },
    {
      id: 'eb75478c-411e-4e37-8467-ffd73ae05a39',
      parent_id: '1f3e6bcf-ec4c-45d2-9e0d-b6340be4b678',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      parent_id: 'eb75478c-411e-4e37-8467-ffd73ae05a39',
      component: 'ModalButtonForm',
      props: {
        icon: 'plus',
        text: 'Add key',
        formId: 'key-register',
        itemId: 'new',
        parent_id: '{parent_id}',
        defaultValues: {
          hirer_id: '{parent_id}',
        },
      },
    },
    // Key register end
    // Registered teams start
    {
      props: { text: 'Registered teams' },
      component: 'FormHeading',
    },
    {
      component: 'DataGrid',
      id: '01d2aaa3-0a70-4977-a2d5-ace17e8dfcf5',
      props: {
        endpoint: 'd/team?parent_id={id}',
        filter: false,
        position: 'bottom',
        compact: true,
        columns: [
          {
            name: 'Name',
            key: 'name',
          },
          // {
          //   name: '# in team',
          //   key: 'number',
          //   title: true,
          //   badge: true,
          // },
          {
            name: 'Age group',
            key: 'ages',
            title: true,
            badge: true,
          },
          {
            name: 'Gender',
            key: 'gender',
            title: true,
            badge: true,
          },
          {
            name: 'Association',
            key: 'assocation',
          },
          {
            name: 'Competition time',
            key: 'competitionTime',
          },
          {
            name: 'Contact person',
            key: 'contact',
          },
          {
            name: 'Contact phone',
            key: 'phone',
          },
          {
            name: 'Actions',
            key: 'actions',
            sub: [
              {
                component: 'Group',
                sub: [
                  {
                    component: 'ModalButton',
                    icon: 'Edit',
                    compact: true,
                    tooltip: 'Edit contact',
                    sub: [
                      {
                        component: 'Form',
                        formId: 'team',
                        itemId: '{row.id}',
                      },
                    ],
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
      id: '6c367372-5e48-4256-af5e-0062cdb9b6b0',
      parent_id: '01d2aaa3-0a70-4977-a2d5-ace17e8dfcf5',
      component: 'FormReadOnly',
      props: { show: false },
    },
    {
      parent_id: '6c367372-5e48-4256-af5e-0062cdb9b6b0',
      component: 'Space',
      props: { h: 'sm' },
    },
    {
      id: '9ee29fa2-1a36-4c6b-aedc-aa7822f3b38f',
      parent_id: '6c367372-5e48-4256-af5e-0062cdb9b6b0',
      component: 'Group',
      props: { position: 'right' },
    },
    {
      parent_id: '9ee29fa2-1a36-4c6b-aedc-aa7822f3b38f',
      component: 'ModalButtonForm',
      props: {
        icon: 'plus',
        text: 'Add team',
        formId: 'team',
        itemId: 'new',
        parent_id: '{id}',
      },
      form_props: { subChildren: true },
    },
    // Registered teams end
    // Particpation start
    {
      props: { text: 'Participation data' },
      component: 'FormHeading',
    },
    {
      id: 'bc9e135b-9fde-46a4-9a38-81c2eddd5d98',
      component: 'FormReadOnly',
      props: { show: false },
      form_props: { subChildren: true },
    },
    {
      id: 'a75723d8-5d6c-4dfc-b25c-98d1997ed46e',
      parent_id: 'bc9e135b-9fde-46a4-9a38-81c2eddd5d98',
      props: { position: 'left' },
      component: 'Group',
      form_props: { subChildren: true },
    },
    {
      id: 'acbf6cf2-ddf1-4663-bdb8-82c3e0683c28',
      parent_id: 'a75723d8-5d6c-4dfc-b25c-98d1997ed46e',
      component: 'ModalButtonForm',
      props: {
        text: 'View/enter participation data',
        formComponent: 'Participation',
        icon: 'Database',
        defaultValues: { hirer_id: '{hirer_id}' },
        item_specific_id: '{id || application_id}',
        specific_id: '{id ||application_id}',
        parent_id: '{parent_id}',
        showClose: true,
      },
    },
    // Particpation end
    // Additional details start
    {
      props: { formId: 'additional-details', itemId: '{id}', autosave: true },
      component: 'SubForm',
    },
    // Additional details end
    // Compliance doc start
    {
      props: { text: 'Compliance documentation' },
      id: '911b485d-b45d-4161-aaa6-712002757fcc',
      component: 'FormSection',
      form_props: { subChildren: true },
    },
    {
      parent_id: '911b485d-b45d-4161-aaa6-712002757fcc',
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
    // Compliance doc end
    // Additional comments start
    {
      id: 'ab836b6e-0d1b-4f71-b97b-b9708883d4b7',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      parent_id: 'ab836b6e-0d1b-4f71-b97b-b9708883d4b7',
      props: {
        text: 'Additional comments to be included in the group approval email',
      },
      component: 'FormHeading',
    },
    {
      parent_id: 'ab836b6e-0d1b-4f71-b97b-b9708883d4b7',
      text: 'Comments',
      reference: 'comments',
      component: 'Textarea',
    },
    // Additional comments end
    {
      parent_id: 'ab836b6e-0d1b-4f71-b97b-b9708883d4b7',
      component: 'FormHeading',
      props: { text: 'Booking fees', permission: 'admin' },
      form_props: {
        conditions: [{ on: 'completed', type: '!empty' }],
      },
    },
    {
      component: 'Fees',
      props: {
        permission: 'admin',
        id: '{id}',
        usage: '{usage}',
        hirer: '{hirer}',
      },
      form_props: {
        conditions: [{ on: 'completed', type: '!empty' }],
      },
    },
    // Terms and conditions start
    {
      component: 'FormHeading',
      props: { text: 'Terms and conditions' },
    },
    {
      component: 'Terms',
    },
    // Terms and conditions end
    // Complete/Approve buttons start
    {
      component: 'ApplicationComplete',
      form_props: {
        question_width: 0,
        answer_width: 12,
        conditions: [{ on: 'completed', type: 'empty' }],
      },
    },
    {
      id: 'f76cba26-daa5-412c-a311-384449363676',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      parent_id: 'f76cba26-daa5-412c-a311-384449363676',
      component: 'ApplicationApprove',
      form_props: {
        question_width: 0,
        answer_width: 12,
        conditions: [{ on: 'approved', type: 'empty' }],
      },
    },
    // Complete/Approve buttons end
  ],
}

export default form

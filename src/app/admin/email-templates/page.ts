const page = {
  id: 'f979be6c-64a4-11ed-9022-0242ac120002',
  parent_id: '056cc895-63ec-11ed-9fe0-54cd06b88880',
  path: 'admin/email-templates',
  name: 'Email templates',
  module: 'email',
  icon: 'email',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/email-template',
      columns: [
        { name: 'Reference', key: 'reference' },
        { name: 'Name', key: 'name', feature: true },
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
                  tooltip: 'Edit email template',
                  sub: [
                    {
                      component: 'Form',
                      formId: 'email-template',
                      itemId: '{id}',
                    },
                  ],
                },
                {
                  component: 'ModalButton',
                  icon: 'search',
                  tooltip: 'Preview email template',
                  sub: [
                    {
                      component: 'EmailPreview',
                      sub: [
                        {
                          component: 'PlainText',
                          text: '{body}\n\n{signature}',
                        },
                      ],
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
      sub: [
        {
          component: 'ModalButton',
          icon: 'plus',
          text: 'Add new',
          sub: [
            {
              component: 'Form',
              formId: 'email-template',
            },
          ],
        },
        { component: 'Space', h: 'sm' },
      ],
      no_results: [
        {
          component: 'AddDefault',
          endpoint: 'd/email-template',
          presets: [
            {
              reference: 'user',
              name: 'User email',
              subject: 'Account activation',
              body: 'The following details will enable you to access the $$company_name$$ $$IMS_PRODUCT$$ program.\nClick on  to activate your user account.\nFollow the on screen instructions to create a password and activate your account.\n\nThis is an auto generated email - please do not reply to this email as the reply will not be received.',
            },
            {
              reference: 'booking-approved',
              name: 'Booking approved',
              subject: 'Booking approved!',
              body: 'Your booking #$$number$$ has been approved.\n\n$$content$$.',
            },
            {
              reference: 'allocation-approved',
              name: 'Allocation approved',
              subject: 'Allocation approved!',
              body: 'Hi $$name$$,\n\nYour seasonal allocation #$$number$$ has been approved.\n\n$$content$$.',
            },
            {
              reference: 'booking-invoice',
              name: 'Booking invoice',
              subject: 'Invoice $$number$$ for booking',
              body: 'Hi $$name$$,\n\nAn invoice has been generated for your booking at $$asset$$.\n\nThe details are below:\n$$content$$',
            },
          ],
        },
      ],
      sorting: [
        {
          name: 'Name (A-Z)',
          key: 'name,asc',
        },
        {
          name: 'Name (Z-A)',
          key: 'name,desc',
        },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 12,
}

export default page

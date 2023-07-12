const page = {
  id: '37bae01c-c7d6-4480-abed-9279b3c570fa',
  parent_id: '',
  path: 'admin/approve-bookings/deleted',
  name: 'Bookings',
  module: 'booking',
  icon: 'event',
  permission: 'admin',
  hideTitle: true,
  components: [
    {
      component: 'DataGrid',
      endpoint: 'booking?type=!allocation&onlyDeleted',
      columns: [
        {
          name: 'Booking list',
          sub: [
            {
              component: 'BookingListAdmin',
            },
          ],
        },
      ],
      filters: [
        {
          key: 'type',
          label: 'Type',
          endpoint: 'form?category=casual',
          column: 'reference',
          conditions: [{ on: 'reference', value: 'reference' }],
        },
        {
          key: 'paid',
          label: 'Paid',
          options: [
            {
              label: 'Paid',
              value: 'paid',
              conditions: [{ on: 'paid', type: '!empty' }],
            },
            {
              label: 'Not paid',
              value: 'not_paid',
              conditions: [{ on: 'paid', type: 'empty' }],
            },
          ],
        },
        {
          key: 'status',
          label: 'Status',
          default: 'deleted',
          options: [
            {
              label: 'In progress',
              value: 'in_progress',
              conditions: [
                { on: 'completed', type: 'empty' },
                { on: 'approved', type: 'empty' },
              ],
              link: '/admin/approve-bookings',
            },
            {
              label: 'Awaiting approval',
              value: 'awaiting_approval',
              conditions: [
                { on: 'completed', type: '!empty' },
                { on: 'approved', type: 'empty' },
              ],
              link: '/admin/approve-bookings',
            },
            {
              label: 'Approved',
              value: 'approved',
              conditions: [
                { on: 'approved', type: '!empty' },
                { on: 'rejected', type: 'empty' },
              ],
              link: '/admin/approve-bookings',
            },
            {
              label: 'Declined',
              value: 'declined',
              conditions: [{ on: 'declined', type: '!empty' }],
              link: '/admin/approve-bookings',
            },
            {
              label: 'Deleted',
              value: 'deleted',
              link: '/admin/approve-bookings/deleted',
            },
          ],
        },
      ],
      sorting: [
        { name: 'Submitted (Oldest-Newest)', key: 'created_at' },
        {
          name: 'Submitted (Newest-Oldest)',
          key: 'created_at,desc',
          default: true,
        },
        { name: 'Hirer (A-Z)', key: 'hirer.name' },
        { name: 'Hirer (Z-A)', key: 'hirer.name,desc' },
      ],
      no_results: [
        {
          component: 'Alert',
          icon: 'Question',
          text: 'No casual bookings added',
        },
      ],
      titleSub: [
        {
          component: 'Group',
          sub: [
            {
              component: 'Button',
              icon: 'Calendar',
              text: 'Booking calendar',
              variant: 'primary',
              link: '/calendar',
              inMenu: true,
            },
            {
              component: 'Button',
              icon: 'Cancel',
              text: 'Venue closures',
              variant: 'danger',
              link: '/admin/closures',
              inMenu: true,
            },
            {
              component: 'Button',
              icon: 'Clash',
              text: 'Clashes',
              variant: 'primary',
              link: '/clashes',
              inMenu: true,
            },
            {
              component: 'ModalButton',
              icon: 'Plus',
              text: 'Add new booking',
              tooltip: 'Add new booking',
              hideclose: true,
              sub: [
                {
                  component: 'AddNewBooking',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  show: 0,
  category: 'booking',
  order: 7,
}

export default page

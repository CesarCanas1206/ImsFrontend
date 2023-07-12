import DataGrid from 'src/components/UI/DataGrid/DataGrid'

function ClientBookingItem({ hirerId }: any) {
  return (
    <DataGrid
      endpoint={`booking?hirer_id=${hirerId}&type=!allocation`}
      no_results={[
        {
          component: 'Alert',
          icon: 'Question',
          text: 'No bookings to show, click Add new booking',
        },
      ]}
      columns={[
        { name: 'Name', key: 'hirer.name || name || slug' },
        {
          name: 'Application ID',
          key: 'application_id',
          badge: true,
          title: true,
          badgeColor: 'dark',
        },
        { name: 'Type', key: 'type', badge: true, title: true },
        { name: 'Form name', key: 'name' },
        { name: 'Status', key: 'status', sub: [{ component: 'ItemStatus' }] },
        {
          name: 'Actions',
          key: 'actions',
          sub: [
            // {
            //   component: 'Conditional',
            //   conditions: [{ on: '{row.approved}', type: 'empty' }],
            //   sub: [
            //     {
            //       component: 'ModalButtonForm',
            //       icon: 'Edit',
            //       formId: '{row.form_id}',
            //       itemId: '{row.id}',
            //       size: 'xl',
            //     },
            //   ],
            // },
            {
              component: 'Button',
              icon: 'Search',
              tooltip: 'View booking',
              link: '/application/{id}',
            },
            // {
            //   component: 'ModalButtonForm',
            //   icon: 'Search',
            //   formId: '{row.form_id}',
            //   itemId: '{row.id}',
            //   readOnly: true,
            //   size: 'xl',
            // },
            {
              component: 'Conditional',
              conditions: [{ on: '{row.approved}', type: 'empty' }],
              sub: [
                {
                  component: 'Confirm',
                  title: 'Are you sure you want to delete this booking?',
                  tooltip: 'Delete',
                  variant: 'danger',
                  icon: 'delete',
                  light: true,
                  sub: [
                    {
                      component: 'Action',
                      props: {
                        action: 'delete',
                        endpoint: 'booking/{row.id}',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]}
    />
  )
}

export default ClientBookingItem

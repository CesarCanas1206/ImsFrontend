const datasetRegistry: any = [
  {
    name: 'My bookings',
    slug: 'my-bookings',
    data: [{ endpoint: 'booking' }],
  },
  {
    name: 'Assets',
    slug: 'assets',
    data: [{ endpoint: 'asset?sort_by=name' }],
  },
  // {
  //   name: 'Approved',
  //   slug: 'approved',
  //   data: [{ endpoint: 'booking?type=!allocation&approved=!empty&fields=id' }],
  // },
  {
    name: 'Bond refunds',
    slug: 'bond-refunds',
    data: [{ endpoint: 'd/bond-refund' }],
  },
  // {
  //   name: 'Pending approvals',
  //   slug: 'pending-approvals',
  //   data: [
  //     {
  //       endpoint:
  //         'booking?type=!allocation&approved=empty&completed=!empty&rejected=empty&fields=id',
  //     },
  //   ],
  // },
  {
    name: 'Change requests',
    slug: 'change-requests',
    data: [{ endpoint: 'booking?approved=empty&fields=id' }],
  },
  {
    name: 'Inspections due',
    slug: 'inspections-due',
    data: [{ endpoint: 'booking?approved=empty&fields=id' }],
  },
  {
    name: 'Incomplete bookings',
    slug: 'incomplete-bookings',
    data: [{ endpoint: 'booking?completed=empty&fields=id' }],
  },
  {
    name: 'Overdue maintenance',
    slug: 'overdue-maintenance',
    data: [
      {
        endpoint:
          'd/maintenance?completed=empty&due_date=<' +
          new Date().toISOString().split('T')[0] +
          '&due_date=!empty',
      },
    ],
  },
  {
    name: 'Seasonal revenue',
    slug: 'seasonal-revenue',
    data: [{ endpoint: 'booking?approved=empty&fields=id' }],
  },
  {
    name: 'Casual revenue',
    slug: 'casual-revenue',
    data: [{ endpoint: 'booking?approved=empty&fields=id' }],
  },
  {
    name: 'Prime usage',
    slug: 'prime-usage',
    data: [{ endpoint: 'booking?approved=empty&fields=id' }],
  },
  {
    name: 'Hirers',
    slug: 'hirer',
    data: [{ endpoint: 'hirer?sort_by=name' }],
  },
  {
    name: 'Participation',
    slug: 'participation',
    data: [
      {
        endpoint:
          'd/participation?fields=senior_male,senior_female,senior_other',
        labels: ['Male', 'Female', 'Other'],
        type: 'sum',
      },
    ],
  },
  {
    name: 'Participation Junior',
    slug: 'participation-jnr',
    data: [
      {
        endpoint:
          'd/participation?fields=junior_male,junior_female,junior_other',
        labels: ['Male', 'Female', 'Other'],
        type: 'sum',
      },
    ],
  },
  {
    name: 'Participation Volunteers',
    slug: 'participation-volunteers',
    data: [
      {
        endpoint:
          'd/participation?fields=volunteer_male,volunteer_female,volunteer_other',
        labels: ['Male', 'Female', 'Other'],
        type: 'sum',
      },
    ],
  },
]

// o   Pending Approvals (to be shown in numerical value)
// o   Change Requests (to be shown in numerical value)
// o   Inspections Due (to be shown in numerical value)
// o   Overdue Maintenance (to be shown in numerical value)
// o   Seasonal Revenue (to be shown in numerical value)
// o   Casual Revenue (to be shown in numerical value)
// o   Prime Usage Chart - Circular or pie chart

export default datasetRegistry

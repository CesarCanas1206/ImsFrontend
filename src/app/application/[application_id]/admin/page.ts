const page = {
  id: '81b778bd-72b1-4b1d-95c8-9938aa30c318',
  parent_id: '0',
  path: 'application/:id/admin',
  name: 'Application',
  components: [
    { component: 'BackButton' },
    { component: 'Space', props: { h: 'sm' } },
    { component: 'BookingFormApplication', props: { isApproving: 'true' } },
    { component: 'Space', props: { h: 'md' } },
  ],
  permission: 'admin',
  category: 'admin',
}

export default page

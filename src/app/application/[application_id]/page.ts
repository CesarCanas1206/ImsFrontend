const page = {
  id: '8a7b6e3f-8aa3-4496-a1a0-0bc200dd494e',
  parent_id: '0',
  path: 'application/:id',
  name: 'Application',
  hidetitle: true,
  components: [
    { component: 'SetTitle' },
    { component: 'BackButton' },
    { component: 'Space', props: { h: 'sm' } },
    { component: 'BookingFormApplication' },
    { component: 'Space', props: { h: 'md' } },
  ],
  permission: 'application',
  category: 'admin',
}

export default page

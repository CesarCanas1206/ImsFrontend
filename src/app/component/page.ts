const page = {
  id: 'a48b66a9-96d3-4eb2-a9b9-94cce89eaa0f',
  path: 'component/:component',
  name: 'Component',
  components: [
    {
      component: 'SetTitle',
      text: '{params.component || component}',
    },
    {
      component: 'ComponentTester',
    },
  ],
  permission: 'admin',
}

export default page

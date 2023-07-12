const page = {
  id: 'a4a4cbce-64a5-11ed-9022-0242ac120002',
  parent_id: '0',
  path: 'application/:form_id/:id',
  name: 'Application',
  components: [
    { component: 'SetTitle', props: { form_id: '{params.form_id}' } },
    { component: 'BackButton' },
    { component: 'Space', props: { h: 'sm' } },
    { component: 'Form', props: { autosave: true, hideSave: true } },
    { component: 'Space', props: { h: 'md' } },
    {
      component: 'BackButton',
      props: { text: 'Save and exit', variant: 'success', icon: 'save' },
    },
  ],
  permission: 'application',
  category: 'admin',
}

export default page

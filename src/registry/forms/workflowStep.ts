const form = {
  id: '5ce5085a-141a-40cd-9a9b-c431cf1d14f5',
  name: 'Workflow step',
  reference: 'workflow-step',

  endpoint: 'd/workflow-step',
  questions: [
    { text: 'Component', reference: 'component', component: 'Input' },
    { text: 'Properties', reference: 'props', component: 'Json' },
    { text: 'Name', reference: 'name', component: 'Input' },
  ],
}

export default form

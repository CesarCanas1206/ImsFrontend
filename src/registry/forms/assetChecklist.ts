const form = {
  id: '505958cb-043d-4ff3-a16b-7b7c52b51b10',
  name: 'Asset checklists',
  reference: 'asset-checklist',

  endpoint: 'd/asset-checklist',
  questions: [
    {
      text: 'Form',
      reference: 'form-id',
      component: 'Select',
      props: { endpoint: 'form' },
    },
  ],
}

export default form

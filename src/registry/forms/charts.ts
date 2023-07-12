const form = {
  id: '1f04683c-aa03-4328-97ca-a5e13acf1af8',
  name: 'Charts',
  reference: 'charts',

  endpoint: 'd/charts',
  questions: [
    { text: 'Chart type', reference: 'type', component: 'Input' },
    { text: 'Hidden', reference: 'hide', component: 'Switch' },
    { text: 'Heading', reference: 'name', component: 'Input' },
    {
      text: 'Dataset',
      reference: 'dataset',
      component: 'DatasetSelector',
    },
  ],
}

export default form

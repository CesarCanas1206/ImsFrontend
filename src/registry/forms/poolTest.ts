const form = {
  id: '4068603d-9fb0-41e9-8236-27b21a2424f6',
  name: 'Pool test',
  reference: 'pool-test',

  description: 'Pool test',
  endpoint: 'd/pool-test',
  questions: [
    { text: 'Test', reference: 'test', component: 'Date' },
    { text: 'Free chlorine', reference: 'free-chlorine', component: 'Input' },
    {
      text: 'Total chlorine',
      reference: 'total-chlorine',
      component: 'Input',
    },
    {
      text: 'Combined chlorine',
      reference: 'combined-chlorine',
      component: 'Input',
    },
    { text: 'pH', reference: 'ph', component: 'Input' },
    { text: 'TDS', reference: 'tds', component: 'Input' },
    { text: 'Bromine', reference: 'bromine', component: 'Input' },
    {
      text: 'Water temperature',
      reference: 'water-temperature',
      component: 'Input',
    },
    {
      text: 'Approx patron nos',
      reference: 'patron-count',
      component: 'Input',
    },
    { text: 'Staff initials', reference: 'initials', component: 'Input' },
  ],
}

export default form

const form = {
  id: 'fbe55c1a-dd63-46a2-ae56-82f3ef7f991b',
  name: 'Checklist',
  reference: 'checklist',
  category: 'checklist2',
  description: 'Checklist form',
  endpoint: 'd/inspection',
  questions: [
    {
      text: 'Are all lights in working order?',
      reference: 'lights',
      component: 'Compliance',
      form_props: { questionWidth: 12, answerWidth: 12 },
    },
    {
      text: 'Is the room clean and tidy?',
      reference: 'clean',
      component: 'Compliance',
      form_props: { questionWidth: 12, answerWidth: 12 },
    },
    {
      text: 'Is the room free of hazards?',
      reference: 'hazards',
      component: 'Compliance',
      form_props: { questionWidth: 12, answerWidth: 12 },
    },
    {
      text: 'Is the aircon/heater working?',
      reference: 'heating',
      component: 'Compliance',
      form_props: { questionWidth: 12, answerWidth: 12 },
    },
    {
      text: 'Are the blinds working/in good condition?',
      reference: 'blinds',
      component: 'Compliance',
      form_props: { questionWidth: 12, answerWidth: 12 },
    },
    {
      text: 'Are the handrails to the stage in good order?',
      reference: 'handrails',
      component: 'Compliance',
      form_props: { questionWidth: 12, answerWidth: 12 },
    },
    { text: 'Inspection date', reference: 'date', component: 'Input' },
  ],
}

export default form

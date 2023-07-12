const form = {
  id: '0770382f-8ebd-4347-b13f-afaa03167290',
  name: 'Asset',
  reference: 'asset',
  description: 'Asset form',
  endpoint: 'asset',
  questions: [
    { text: 'Name', reference: 'name', component: 'Input' },
    {
      text: 'Type',
      reference: 'asset-type-id',
      component: 'Select',
      props: { endpoint: 'd/asset-type?sort_by=name' },
    },
    { text: 'Address', component: 'InputAddress' },
    { text: 'Capacity', reference: 'capacity', component: 'Input' },
    { text: 'Description', reference: 'description', component: 'Textarea' },
    { text: 'Feature photo', reference: 'photo', component: 'File' },
    { text: 'Gallery photos', reference: 'gallery', component: 'File', props: { multiple: true }, },
    // { text: 'Pricing', reference: 'pricing', component: 'Pricing' },
    { text: 'Equipments', reference: 'equipments', component: 'EquipmentInput', form_props: { conditions: [{ on: 'previewMode', type: '=', value: true }] } },
    { text: 'Equipments', reference: 'equipments', component: 'EquipmentSwitch', form_props: { conditions: [{ on: 'previewMode', type: '!=', value: true }] } },
    { component: 'Space', h: 'sm', },
    {
      text: 'Show on booking page',
      reference: 'visible',
      component: 'Switch',
    },
    {
      text: 'Can this be booked',
      reference: 'bookable',
      component: 'Switch',
    },
    {
      text: 'Can this be inspected',
      reference: 'inspectable',
      component: 'Switch',
    },
    {
      text: 'Default pricing',
      reference: 'pricing_id',
      component: 'MultiSelect',
      props: { endpoint: 'd/pricing?sort_by=name' },
    },

    // {
    //   text: 'Price/hour',
    //   reference: 'price',
    //   component: 'InputPrice',
    //   form_props: { conditions: [{ on: 'bookable', type: '!empty' }] },
    // },
    {
      id: 'b815cec2-7ccb-48b7-a39c-e0f9744a58ce',
      component: 'FormSection',
      props: { text: 'Bookable hours' },
      form_props: { sub_children: true },
    },
    {
      parent_id: 'b815cec2-7ccb-48b7-a39c-e0f9744a58ce',
      reference: 'week_times',
      component: 'WeekTimes',
      form_props: {
        questionWidth: 0,
        answerWidth: 12,
      },
    },

    // {
    //   text: 'Features',
    //   reference: 'features',
    //   component: 'Checkboxes',
    //   props: { endpoint: 'd/features' },
    // },
    // {
    //   text: 'Predefined pricing',
    //   reference: 'pricing_id',
    //   component: 'Checkboxes',
    //   props: { endpoint: 'd/pricing' },
    // },
  ],
}

export default form

const form = {
  id: '73a59c2c-82b9-49b1-9425-b0272f2e2552',
  name: 'Usage',
  reference: 'usage',
  description: 'Venue usage',
  endpoint: 'usage',
  questions: [
    {
      text: 'Venue',
      reference: 'asset_id',
      component: 'AssetSelector',
      props: { bookable: true },
      form_props: { required: true },
    },
    {
      text: 'Start/End',
      component: 'TimeRange',
    },
    {
      text: 'Repeating',
      component: 'RepeatEvent',
      props: { locked: true },
    },
    {
      text: 'Activities',
      reference: 'activity',
      component: 'Input',
      props: {
        suggestions: ['Training', 'Match', 'Meeting'],
        placeholder: 'E.g. Training, Match, Meeting',
      },
      form_props: { required: true },
    },
    {
      text: 'Shared',
      reference: 'shared',
      component: 'Checkbox',
      form_props: {
        help: 'Whether this booking area can be shared with other users',
      },
    },
    {
      id: '34e86e21-9046-4afd-92e3-e8c229d55d9c',
      component: 'HasPermission',
      props: { permission: 'admin' },
    },
    {
      parent_id: '34e86e21-9046-4afd-92e3-e8c229d55d9c',
      text: 'Allow clash',
      reference: 'allow_clash',
      component: 'Checkbox',
    },
  ],
}

export default form

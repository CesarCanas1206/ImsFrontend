const form = {
  id: 'fbad76a6-8661-499b-81d4-939f721c7ec8',
  reference: 'team',
  endpoint: 'd/team',
  name: 'Team',
  questions: [
    {
      text: 'Team',
      reference: 'name',
      component: 'Input',
      props: { placeholder: 'e.g. Boys U10' },
    },
    // {
    //   text: '# in team',
    //   reference: 'number',
    //   component: 'Input',
    // },
    {
      text: 'Age group',
      reference: 'ages',
      component: 'CustomSelector',
      props: { placeholder: 'e.g. 10-12' },
    },
    {
      text: 'Gender',
      reference: 'gender',
      component: 'Segmented',
      props: {
        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
          { label: 'Mixed', value: 'Mixed' },
        ],
      },
    },
    {
      text: 'Association',
      reference: 'association',
      component: 'CustomSelector',
    },
    {
      text: 'Competition time',
      reference: 'competitionTime',
      component: 'Input',
      props: { placeholder: 'e.g. 2hrs' },
    },
    {
      text: 'Contact person',
      reference: 'contact',
      component: 'Input',
    },
    {
      text: 'Contact phone',
      reference: 'phone',
      component: 'Input',
    },
  ],
}

export default form

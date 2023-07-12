const form = {
  id: '14ec9789-3c7f-453f-86eb-815738a47c06',
  name: 'Participation data',
  reference: 'participation',

  endpoint: 'd/participation',
  questions: [
    {
      text: 'Junior (under 18) participants',
      component: 'InputGenderCount',
      props: { prefix: 'junior_', withHeading: true },
    },
    {
      text: 'Senior (over 18) participants',
      component: 'InputGenderCount',
      props: { prefix: 'senior_' },
    },
    {
      text: 'Volunteers',
      component: 'InputGenderCount',
      props: { prefix: 'volunteer_' },
    },
    {
      text: 'Committee members',
      component: 'InputGenderCount',
      props: { prefix: 'committee_' },
    },
    {
      text: 'Players with a disability',
      component: 'InputGenderCount',
      props: { prefix: 'disability_' },
    },
    {
      text: 'Indigenous players',
      component: 'InputGenderCount',
      props: { prefix: 'atsi_' },
    },
    {
      text: 'Total number of club members',
      reference: 'count_total',
      component: 'Total',
      props: {
        fields:
          'junior_male,junior_female,junior_other,senior_male,senior_female,senior_other,volunteer_male,volunteer_female,volunteer_other,committee_male,committee_female,committee_other',
      },
    },
  ],
}

export default form

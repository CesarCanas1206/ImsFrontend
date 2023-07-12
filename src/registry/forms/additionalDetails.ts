const form = {
  id: '84e4462a-7820-4c75-a539-b2f03e9f6d5f',
  name: 'Additional details',
  reference: 'additional-details',
  description: 'Additional details form',
  endpoint: 'd/allocation',
  questions: [
    {
      props: { text: 'Additional details' },
      component: 'FormHeading',
      form_props: { question_width: 0, answer_width: 12 },
    },
    {
      text: 'Does your club arrange for a coffee cart to attend match days?',
      reference: 'coffee_cart',
      component: 'YesNo',
    },
    {
      text: 'Rubbish collection. Please select one of the following options',
      reference: 'rubbish_collection',
      component: 'Radios',
      form_props: { required: true },
      props: {
        options: [
          {
            label:
              'The club will pick up and remove rubbish after any club activity around our allocated reserves',
            value:
              'The club will pick up and remove rubbish after any club activity around our allocated reserves',
          },
          {
            label:
              "The club requests Council continue to pick up and remove rubbish after any club activity around our allocated Reserve. Therefore and additional rubbish collection charge will be added to the club's seasonal tenancy fees",
            value:
              "The club requests Council continue to pick up and remove rubbish after any club activity around our allocated Reserve. Therefore and additional rubbish collection charge will be added to the club's seasonal tenancy fees",
          },
        ],
      },
    },
    {
      text: 'Is your club a member of Good Sports?',
      reference: 'good_sports',
      component: 'YesNo',
    },
    {
      text: 'Good Sports club level?',
      reference: 'good_sports_level',
      component: 'Segmented',
      props: {
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
        ],
      },
      form_props: { conditions: [{ on: 'good_sports', value: 'Yes' }] },
    },
    {
      text: 'Healthy Promotions Initiatives?',
      reference: 'healthy_promotions',
      component: 'YesNo',
    },
    {
      text: 'Healthy Promotions Initiatives details',
      reference: 'healthy_promotions_details',
      component: 'Textarea',
      form_props: { conditions: [{ on: 'healthy_promotions', value: 'Yes' }] },
    },
    {
      text: 'Inclusive programs?',
      reference: 'inclusive',
      component: 'YesNo',
    },
    {
      text: 'Inclusive programs details',
      reference: 'inclusive_details',
      component: 'Textarea',
      form_props: { conditions: [{ on: 'inclusive', value: 'Yes' }] },
    },
    {
      text: 'Club pathway programs?',
      reference: 'club_pathway',
      component: 'YesNo',
    },
    {
      text: 'Club pathway programs details',
      reference: 'club_pathway_details',
      component: 'Textarea',
      form_props: { conditions: [{ on: 'club_pathway', value: 'Yes' }] },
    },
  ],
}

export default form

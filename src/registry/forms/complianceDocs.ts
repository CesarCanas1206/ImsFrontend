const form = {
  id: '619745e3-6482-11ed-9fe0-54cd06b88880',
  name: 'Compliance docs',
  reference: 'compliance-docs',
  category: 'application',

  endpoint: 'd/compliance-docs',
  questions: [
    {
      text: 'Certificate of Public Liability Insurance',
      reference: 'public-liability',
      component: 'FileDoc',
      props: { hasExpiry: true },
      form_props: { question_width: 6, answer_width: 6 },
    },
    {
      text: 'Latest Annual Report (including financial statement)',
      reference: 'annual-report',
      component: 'FileDoc',
      form_props: { question_width: 6, answer_width: 6 },
    },
    {
      text: 'Most recent AGM minutes',
      reference: 'agm-minutes',
      component: 'FileDoc',
      form_props: { question_width: 6, answer_width: 6 },
    },
    {
      text: 'Current Business Plan',
      reference: 'business-plan',
      component: 'FileDoc',
      form_props: { question_width: 6, answer_width: 6 },
    },
  ],
}

export default form

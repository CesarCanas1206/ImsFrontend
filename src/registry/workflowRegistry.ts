const workflowRegistry = [
  {
    id: '02456ec0-d7ca-423b-999d-1c4328dbd1b0',
    name: 'Check if email is unique',
    reference: 'validate.email',
    workflow: [
      {
        event: 'form.validate',
        action: 'validateEmail',
      },
    ],
  },
  {
    id: '6f261e36-12e7-442f-b6fb-db01076bb7d5',
    name: 'Check if usage is unique',
    reference: 'validate.usage',
    workflow: [
      {
        event: 'form.validate',
        action: 'validateUsage',
      },
    ],
  },
  {
    id: '0ec63420-cad0-45c1-98ea-f58c9daacf21',
    name: 'Refresh page after config has changed',
    reference: 'refresh.config',
    workflow: [
      {
        event: 'form.save',
        action: 'refreshPage',
        props: {},
      },
    ],
  },
  {
    id: '4ada6d9f-1511-4796-bb67-c24b14ff7265',
    name: 'Booking request',
    reference: 'booking.request.send',
    workflow: [
      // {
      //   event: 'form.save',
      //   action: 'refreshPage',
      //   props: {},
      // },
    ],
  },
  {
    id: '3294e6b8-bf73-4756-be53-6b47e84b3685',
    name: 'Create events for each date',
    reference: 'create.events',
    workflow: [
      {
        event: 'form.save',
        action: 'createEvents',
        props: {},
      },
    ],
  },
]

export default workflowRegistry

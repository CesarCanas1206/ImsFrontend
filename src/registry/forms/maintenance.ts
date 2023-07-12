const form = {
  id: 'f3b67286-653f-11ed-9022-0242ac120002',
  name: 'Maintenance',
  reference: 'maintenance',
  description: 'Maintenance form',
  endpoint: 'd/maintenance',
  questions: [
    {
      reference: 'maintenance_ref',
      text: 'Reference',
      component: 'ReadOnly',
      form_props: { conditions: [{ on: 'id', type: '!empty' }] },
    },
    {
      reference: 'asset_id',
      text: 'Venue',
      component: 'AssetSelector',
    },
    {
      reference: 'date',
      text: 'Date identified',
      component: 'Date',
    },
    {
      reference: 'issue',
      text: 'Describe the issue',
      component: 'Textarea',
    },
    {
      reference: 'urgent',
      text: 'Urgent issue',
      component: 'YesNo',
    },
    {
      reference: 'responsibility_by',
      text: 'Responsibility',
      component: 'Select',
      props: { data: [{ label: 'Everyone', value: 'everyone' }] },
      form_props: { conditions: [{ on: 'urgent', value: 'Yes' }] },
    },
    {
      reference: 'due_date',
      text: 'Due date',
      component: 'Date',
    },
    {
      reference: 'notes',
      text: 'Completion note',
      component: 'Textarea',
    },
    {
      reference: 'completion_date',
      text: 'Completion date',
      component: 'Date',
    },
    {
      reference: 'completed',
      text: 'Completed',
      component: 'Checkbox',
    },
    {
      reference: 'photos',
      text: 'Photos',
      component: 'Camera',
      props: { multiple: true },
      form_props: { question_width: 12 },
    },
  ],
}

export default form

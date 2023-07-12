const form = {
  id: 'c19e5f06-3b6f-403e-a2b4-5f13a062f004',
  name: 'Config',
  reference: 'config',
  endpoint: 'settings',
  workflow: ['refresh.config'],
  questions: [
    {
      text: 'Name',
      reference: 'name',
      component: 'Input',
      form_props: {
        required: true,
      },
    },
    {
      text: 'Value',
      reference: 'value',
      component: 'Input',
      form_props: {
        conditions: [
          { on: 'code', type: '!=', value: 'modules' },
          { on: 'code', type: '!=', value: 'theme' },
          { on: 'code', type: '!=', value: 'logo' },
        ],
      },
    },
    {
      text: 'Modules',
      reference: 'value',
      component: 'ModuleSelect',
      form_props: {
        conditions: [{ on: 'code', value: 'modules' }],
        question_width: 12,
        answer_width: 12,
      },
    },
    {
      text: 'Logo',
      reference: 'value',
      component: 'File',
      form_props: {
        conditions: [{ on: 'code', type: 'contains', value: 'logo' }],
      },
    },
    {
      text: 'Theme',
      reference: 'value',
      component: 'ColorInput',
      form_props: {
        conditions: [
          { on: 'code', value: 'theme', or: true },
          { on: 'code', value: 'colorScheme', or: true },
        ],
      },
    },
    {
      text: 'Code',
      reference: 'code',
      component: 'Input',
    },
    {
      text: 'Category',
      reference: 'category',
      component: 'Input',
    },
    {
      text: 'Type',
      reference: 'type',
      component: 'Input',
    },
    {
      text: 'Public',
      reference: 'public',
      component: 'Checkbox',
      props: { yesNo: false },
    },
  ],
}

export default form

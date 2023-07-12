export const formSettings: any = [
  {
    name: 'formId',
    label: 'Form',
    type: 'Select',
    endpoint: 'form',
    format: (row: any) => ({ name: row.name, value: row.id }),
    options: [
      {
        name: 'Dynamic',
        value: '',
      },
    ],
  },
  {
    name: 'itemId',
    label: 'Item id',
    type: 'Input',
  },
  {
    name: 'specific_id',
    label: 'Specific id',
    type: 'Input',
  },
  {
    name: 'parent_id',
    label: 'Parent id',
    type: 'Input',
  },
  {
    name: 'query',
    label: 'Query',
    type: 'Input',
  },
  {
    name: 'autosave',
    label: 'Autosave',
    type: 'Radios',
    options: [
      {
        name: 'No',
        value: 'false',
      },
      {
        name: 'Yes',
        value: 'true',
      },
    ],
  },
  {
    name: 'hideSave',
    label: 'Hide save button',
    type: 'Radios',
    options: [
      {
        name: 'No',
        value: 'false',
      },
      {
        name: 'Yes',
        value: 'true',
      },
    ],
  },
  {
    name: 'showClose',
    label: 'Show close button',
    type: 'Radios',
    options: [
      {
        name: 'No',
        value: 'false',
      },
      {
        name: 'Yes',
        value: 'true',
      },
    ],
  },
  {
    name: 'saveButton',
    label: 'Save button',
    type: 'Json',
  },
]

export default formSettings

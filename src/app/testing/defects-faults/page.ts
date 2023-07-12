const page = {
  id: '31708d50-64a5-11ed-9022-0242ac120002',
  parent_id: 'f979b5d4-64a4-11ed-9022-0242ac120002',
  path: 'defects-faults',
  name: 'Defect / faults',
  icon: 'defect',
  components: [
    {
      component: 'ModalButton',
      text: 'Add new defect / fault',
      icon: 'add',
      size: 'lg',
      sub: [
        {
          component: 'Form',
          formId: '6efab2b7-7c10-49d9-8809-ffcb0f8c6fbd',
          autosave: 'false',
          saveButton: [
            {
              component: 'Button',
              text: 'Complete',
              icon: 'tick',
            },
            {
              component: 'Text',
              text: 'You should complete this!',
            },
          ],
        },
      ],
    },
    { component: 'Space', h: 'sm' },
    {
      component: 'DataGrid',
      endpoint: 'd/defect-fault',
      columns: [
        { name: 'Ref', key: 'id' },
        {
          name: 'Image',
          sub: [
            {
              component: 'Image',
              src: '{photos}',
              gallery: 'true',
            },
          ],
        },
        { name: 'Date identified', key: 'fDate::date-identified' },
        { name: 'Location', key: 'location' },
        { name: 'Defect number', key: 'defect-number' },
        { name: 'Defect location', key: 'defect-location' },
        { name: 'Responsibility', key: 'responsibility' },
        { name: 'Defect', key: 'defect' },
        { name: 'Due date', key: 'fDate::due-date' },
        { name: 'Risk assessment', key: 'risk' },
        { name: 'Consequence identifier', key: 'consequence' },
        { name: 'Status', key: 'status' },
        {
          name: 'Actions',
          key: 'action',
          sub: [
            {
              component: 'Group',
              sub: [
                {
                  component: 'ModalButton',
                  icon: 'edit',
                  sub: [
                    {
                      component: 'Form',
                      formId: 'defect-fault',
                      itemId: '{id}',
                    },
                  ],
                },
                { component: 'DeleteButton' },
              ],
            },
          ],
        },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
}

export default page

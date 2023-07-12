const page = {
  id: '709ba15e-64a5-11ed-9022-0242ac120002',
  parent_id: 'f979b5d4-64a4-11ed-9022-0242ac120002',
  path: 'tasks',
  name: 'Tasks',
  icon: 'checklist',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/task',
      columns: [
        {
          name: 'Name',
          key: 'name',
          sub: [
            {
              component: 'Stack',
              sub: [{ component: 'Text', text: '{name}' }],
            },
          ],
        },
        {
          name: 'Description',
          key: 'description',
          sub: [{ component: 'PlainText', text: '{description}' }],
        },
        {
          name: 'Status',
          key: 'status',
          sub: [{ component: 'StatusToggle' }],
        },
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
                      formId: 'task',
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
    { component: 'Group', position: 'right' },
    { component: 'ModalButton', icon: 'add', text: 'Add new' },
    { component: 'Form', formId: '43' },
    { component: 'Space', h: 'sm' },
    { component: 'Badge', text: '{status}', color: 'cyan' },
    { component: 'Text', text: '{name} {actual} of {estimate}' },
    {
      component: 'ModalButton',
      icon: 'edit',
    },
    { component: 'Text', text: 'Edit the task :)' },
    { component: 'Form', formId: '45', itemId: '{id}' },
    {
      component: 'Group',
      position: null,
      spacing: null,
      grow: null,
      className: null,
    },
    {
      component: 'PlainText',
      text: '{description}\\n{user_id}\\n{user.name}',
      position: 'left',
    },
    {
      component: 'Stack',
    },
    { component: 'Toggle' },
    { component: 'StatusToggle' },
    { component: 'Toggle' },
    {
      component: 'Button',
      variant: 'primary',
      text: 'New button',
    },
    {
      component: 'PlainText',
      text: 'New plain text element',
    },
    { component: 'Action', action: 'delete', endpoint: 'd/{id}' },
    {
      component: 'PlainText',
      text: 'New plain text element',
    },
    {
      component: 'Switch',
      label: 'Switch label2',
      description: 'Switch description2',
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
}

export default page

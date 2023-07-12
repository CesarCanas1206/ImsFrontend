const page = {
  id: '31708774-64a5-11ed-9022-0242ac120002',
  parent_id: '7c37508b-0502-4c32-b502-73c4fe70cb5a',
  path: 'admin/activity-types',
  name: 'Activity types',
  module: 'activity',
  icon: 'stadium',
  components: [
    {
      component: 'DataGrid',
      endpoint: 'd/activity-type',
      columns: [
        { name: 'Name', key: 'name' },
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
                      formId: 'activity-type',
                      itemId: '{id}',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      no_results: [
        {
          component: 'AddDefault',
          endpoint: 'd/activity-type',
          presets: [
            {
              name: 'Public events - community/cultural festivals',
            },
            {
              name: 'Community or Seniors Program',
            },
            {
              name: 'Outdoor activities other than sport',
            },
            {
              name: 'Religious Services',
            },
            {
              name: 'Tennis / Netball Coaching / Casual Hire',
            },
            {
              name: 'Education & Training',
            },
            {
              name: 'Seasonal Sport - Seniors',
            },
            {
              name: 'Booking on a non-sporting reserve',
            },
            {
              name: 'Personal Training / Boot Camps',
            },
            {
              name: 'Indoor Team Sports',
            },
            {
              name: 'Health, Safety & Wellbeing Programs',
            },
            {
              name: 'Dog Obedience Programs',
            },
            {
              name: 'Meetings/Conferences',
            },
            {
              name: 'Sporting reserves',
            },
            {
              name: 'Sport and Exercise Outdoor',
            },
            {
              name: 'Martial Arts/Fitness Programs',
            },
            {
              name: 'Seasonal Sport - Juniors',
            },
            {
              name: 'BBQ area Celebration/Party/Family Event',
            },
            {
              name: 'Arts & Crafts',
            },
            {
              name: 'Weddings',
            },
            {
              name: 'Performance Art/Dance/Musical Programs',
            },
          ],
        },
      ],
      sub: [
        {
          component: 'ModalButton',
          icon: 'plus',
          text: 'Add new',
          sub: [
            {
              component: 'Form',
              formId: 'activity-type',
            },
          ],
        },
        { component: 'Space', h: 'sm' },
      ],
    },
  ],
  permission: 'dashboard',
  show: 2,
  category: 'admin',
  order: 12,
}

export default page

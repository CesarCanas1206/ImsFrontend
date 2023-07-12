const page = {
  id: '475e19a1-58cc-4275-9086-1e5d2312f56e',
  path: 'admin/tools',
  name: 'Tools',
  components: [
    {
      component: 'SimpleGrid',
      sub: [
        {
          component: 'Button',
          text: 'Icon list',
          link: '/component/IconList',
        },
        {
          component: 'Button',
          text: 'Postman',
          link: '/postman',
        },
        {
          component: 'Button',
          text: 'AI',
          link: '/ai',
        },
        {
          component: 'Button',
          text: 'Data mapping',
          link: '/component/MapData',
        },
      ],
    },
  ],
  permission: 'admin',
  show: 0,
}

export default page

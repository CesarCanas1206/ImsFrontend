const form = {
  id: '55396630-8579-4781-9fe2-1df5b87fac67',
  name: 'Key register',
  reference: 'key-register',
  description: 'The key register form',
  endpoint: 'd/key-register',
  questions: [
    {
      text: 'Name/reference for key',
      reference: 'name',
      component: 'Input',
      props: { placeholder: 'E.g. Main key, Office key, Back shed key' },
    },
    {
      text: 'Venue',
      reference: 'asset_id',
      component: 'AssetSelector',
      props: { readOnly: false },
    },
    { text: 'Key code', reference: 'key_code', component: 'Input' },
    { text: 'Alarm code', reference: 'alarm_code', component: 'Input' },
    // { text: 'Contact address', reference: 'address', component: 'Input' },
    // { text: 'Phone (work)', reference: 'phone_work', component: 'Input' },
    // { text: 'Phone (home)', reference: 'phone', component: 'Input' },
    // { text: 'Mobile', reference: 'mobile', component: 'Input' },
    // { text: 'Email', reference: 'email', component: 'Input' },
    // { text: 'Hirer', reference: 'hirer_id', component: 'Input' },
    // {
    // text: 'Application id',
    // reference: 'application_id',
    // component: 'Input',
    // props: { default: '{application_id}' },
    // },
  ],
}

export default form

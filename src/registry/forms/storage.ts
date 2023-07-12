const form = {
  id: '77127ff0-ad3f-4614-a3c0-11be4fa566f8',
  reference: 'storage',
  endpoint: 'd/storage',
  name: 'Storage',
  questions: [
    {
      component: 'Input',
      text: 'Name',
      reference: 'name',
    },
    {
      text: 'Venue',
      reference: 'asset_id',
      component: 'AssetSelector',
      props: { readOnly: false },
    },
    {
      component: 'Input',
      text: 'Type',
      reference: 'storage_type',
    },
    {
      component: 'Input',
      text: 'Size',
      reference: 'size',
    },
    {
      component: 'Input',
      text: 'Capacity',
      reference: 'capacity',
    },
    {
      component: 'Camera',
      text: 'Photo',
      reference: 'photo',
    },
  ],
}

export default form

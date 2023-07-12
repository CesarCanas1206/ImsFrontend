const form = {
  id: 'b9bc92c9-0799-4d30-845f-adbdacc69f99',
  reference: 'equipment',
  endpoint: 'd/equipment',
  name: 'Equipment',
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
      text: 'Category',
      reference: 'category',
    },
    {
      component: 'Input',
      text: 'Brand',
      reference: 'brand',
    },
    {
      component: 'Input',
      text: 'Make',
      reference: 'make',
    },
    {
      component: 'Input',
      text: 'Model',
      reference: 'model',
    },
    {
      component: 'Input',
      text: 'Size',
      reference: 'size',
    },
    {
      component: 'Input',
      text: 'Quantity',
      reference: 'quantiity',
    },
  ],
}

export default form

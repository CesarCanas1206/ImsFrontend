import DataGrid from 'src/components/UI/DataGrid/DataGrid'

function Clashes() {
  return (
    <DataGrid
      endpoint="clashes"
      columns={[{ name: 'Item', sub: [{ component: 'ClashItem' }] }]}
    />
  )
}

export default Clashes

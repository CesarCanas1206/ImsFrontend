import { Drawer } from '@mantine/core'
import { useState, useEffect } from 'react'
import { componentRegistry } from '../../registry/componentRegistry'
import { componentTemplateRegistry } from '../../registry/componentTemplateRegistry'
import ComponentMenuItem from './ComponentMenuItem'

interface IComponentMenu {
  order?: number
  component?: string
  parent_id?: number
  hidden?: boolean
  setShowMenu?: any
  filter?: any
  showMenu?: boolean
}

function ComponentMenu({
  hidden,
  parent_id,
  order,
  setShowMenu,
  showMenu,
}: IComponentMenu) {
  const [list, setList] = useState({})
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const registryCategory: any = {}
    Object.entries({ ...componentTemplateRegistry, ...componentRegistry })
      .sort(([a]: any, [b]: any) => a.localeCompare(b))
      .forEach(([key, item]: any) => {
        const category = item.category || 'Component'
        registryCategory[category] = [
          ...(registryCategory[category] || []),
          { ...item, key },
        ]
      })

    setList(registryCategory)
  }, [])

  return (
    <Drawer
      position="right"
      size={window.outerWidth < 600 ? 'full' : 'lg'}
      zIndex={1060}
      styles={{
        drawer: { overflow: 'auto' },
      }}
      opened={showMenu ?? false}
      onClose={() => setShowMenu(false)}
      title={<h4 style={{ paddingLeft: 10 }}>Add component</h4>}
    >
      <div
        key="top"
        style={{
          position: 'sticky',
          display: 'flex',
          top: 0,
          paddingTop: 10,
          paddingBottom: 5,
          zIndex: 1,
          backgroundColor: 'white',
        }}
      >
        <input
          type="search"
          placeholder="Filter.."
          className="form-control"
          style={{ marginLeft: 20, marginRight: 20 }}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>
      <div key="list">
        {Object.entries(list).map(([key, items]: any) => {
          const filtered = items.filter(
            (item: any) =>
              typeof filter === 'undefined' ||
              filter === '' ||
              (item.name || item.key.replace(/([a-z])([A-Z])/g, '$1 $2'))
                ?.toLowerCase()
                ?.includes(filter),
          )

          if (!filtered.length) {
            return <></>
          }

          return (
            <div className="list-group" key={key} style={{ paddingLeft: 10 }}>
              <div className="list-group-item">
                <h5>{key}</h5>
              </div>
              {filtered.map((item: any) => (
                <ComponentMenuItem
                  hidden={item.hidden}
                  key={item.key}
                  parent_id={parent_id}
                  order={order}
                  props={item}
                  group={item.group}
                  component={item.key}
                  components={item.components}
                  name={
                    item.name || item.key.replace(/([a-z])([A-Z])/g, '$1 $2')
                  }
                  desc={item.desc}
                />
              ))}
            </div>
          )
        })}
      </div>
    </Drawer>
  )
}

export default ComponentMenu

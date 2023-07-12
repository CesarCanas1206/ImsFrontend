import Button from '../Form/Button/Button'
import usePageBuilder from '../../hooks/usePageBuilder'
import componentStyle from './componentMenu.module.css'

interface IComponentMenuItem {
  name?: string
  desc?: string
  order?: number
  props?: any
  component?: string
  components?: any
  parent_id?: number
  hidden?: boolean
  group?: boolean
}

function ComponentMenuItem({
  name,
  desc,
  order,
  props,
  component,
  components,
  parent_id,
  hidden,
  group,
}: IComponentMenuItem) {
  const { addComponent, addComponents } = usePageBuilder()
  return (
    <>
      {!hidden && (
        <div
          className={componentStyle.menuItem}
          style={{ padding: '0.1rem 5px' }}
        >
          <div>
            {name}
            {desc && <div style={{ fontSize: '70%' }}>{desc}</div>}
          </div>
          <div>
            {typeof components !== 'undefined' && (
              <Button
                className="btn-primary p-1 h-100"
                key="multiple"
                variant="success"
                compact
                onClick={() =>
                  addComponents({ ...props, order, components, parent_id })
                }
                icon="sub"
                tooltip="Add as multiple components"
              />
            )}
            {(typeof components === 'undefined' || group) && (
              <Button
                className="btn-primary p-1 h-100"
                key="single"
                variant="success"
                compact
                onClick={() =>
                  addComponent({ ...props, order, component, parent_id })
                }
                icon="plus"
                tooltip="Add as individual component"
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ComponentMenuItem

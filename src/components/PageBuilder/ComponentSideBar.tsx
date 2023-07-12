import React, { useState } from 'react'
import ComponentMenu from './ComponentMenu'
import Sortable from '../UI/Sortable/Sortable'
import Group from '../UI/Group/Group'
import ComponentSideBarItem from './ComponentSideBarItem'
import Button from '../Form/Button/Button'
import Space from '../UI/Space/Space'
import usePageBuilder from '../../hooks/usePageBuilder'

export interface IComponentSideBar {
  pageComponents: object[]
}

function ComponentSideBar({ pageComponents: items }: IComponentSideBar) {
  const [showMenu, setShowMenu] = useState(false)
  const [moveFrom, setMoveFrom] = useState(false)

  const { saveComponent } = usePageBuilder()

  const doMove = () => {
    saveComponent({
      id: moveFrom,
      parent_id: '',
    })
    setMoveFrom(false)
  }

  function onDragEnd(result: any) {
    // if (!result.destination) {
    //   return
    // }
    // const newItems = [...items]
    // const [removed] = newItems.splice(result.source.index, 1)
    // newItems.splice(result.destination.index, 0, removed)
    // setItems(newItems)
  }

  return (
    <div
      style={{
        marginTop: 5,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexShrink: 0,
      }}
    >
      {moveFrom !== false && (
        <>
          Select the parent for this component to move to or{' '}
          <Button
            icon="cancel"
            variant="secondary"
            text="Cancel"
            compact={true}
            onClick={() => setMoveFrom(false)}
          />{' '}
          <Button
            variant="secondary"
            text="Top"
            compact={true}
            onClick={doMove}
          />
        </>
      )}

      <ComponentMenu showMenu={showMenu} setShowMenu={setShowMenu} />

      {items.map((item: any, index: number) => {
        if (item.component === 'PageEditButton') {
          return <React.Fragment key={item.id}></React.Fragment>
        }
        return (
          <Sortable id={`main${item.id}`} onDragEnd={onDragEnd} key={item.id}>
            <ComponentSideBarItem
              componentItems={items}
              setMoveFrom={setMoveFrom}
              moveFrom={moveFrom}
              index={index}
              key={item.id}
              item={item}
            />
          </Sortable>
        )
      })}
      <Space h={'sm'} />
      <Group position="center">
        <Button
          icon="plus"
          text="Add component"
          variant="success"
          onClick={() => setShowMenu(!showMenu)}
        />
      </Group>
    </div>
  )
}

export default ComponentSideBar

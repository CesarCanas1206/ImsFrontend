import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Icon from '../Icon/Icon'

const lists = [
  { name: 'First', order: 1 },
  { name: 'Second', order: 2 },
  { name: 'Third', order: 3 },
  { name: 'Fourth', order: 4 },
  { name: 'Fifth', order: 5 },
  { name: 'Sixth', order: 6 },
  { name: 'test5', order: 7 },
  { name: 'tes6t', order: 8 },
  { name: 'test7', order: 9 },
  { name: 'test8', order: 10 },
  { name: 'test9', order: 11 },
  { name: 'test9', order: 12 },
  { name: 'Last', order: 13 },
]

function ListItems({ items, noSub }: any) {
  return (
    <>
      {items.map((item: any, index: number) => (
        <Draggable key={index} index={index} draggableId={index.toString()}>
          {(provided: any) => (
            <>
              <div
                className="list-group-item"
                ref={provided.innerRef}
                mt="xs"
                {...provided.draggableProps}
              >
                <div className="d-flex gap-2">
                  <div {...provided.dragHandleProps}>
                    <Icon type="drag" />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.order}</div>
                </div>
                {!noSub && <SubList />}
              </div>
            </>
          )}
        </Draggable>
      ))}
    </>
  )
}

function SubList() {
  const [items, setItems] = useState(lists.slice(0, 3))

  const reOrder = (from: number, to: number) => {
    let tmpArray = [...items]
    tmpArray.splice(to, 0, tmpArray.splice(from, 1)[0])
    setItems(tmpArray)
  }

  return (
    <div className="list-group ms-3">
      <DragDropContext
        onDragEnd={({ destination, source }: any) =>
          reOrder(source.index, destination.index)
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ListItems items={items} noSub={true} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

interface ISortableItem {
  children?: React.ReactNode
  inside?: React.ReactNode
  index: number
  id: string
  className?: string
  style?: object
}

export const SortableItem = ({
  children,
  className,
  style,
  inside,
  index,
  id,
}: ISortableItem) => {
  return (
    <Draggable index={index} draggableId={`item-${id}`}>
      {(provided: any, snapshot, any) => (
        <>
          <div
            className={className}
            style={style}
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {children}
          </div>
          {inside}
        </>
      )}
    </Draggable>
  )
}

interface ISortable {
  id?: number | string
  children?: React.ReactNode
  onDragEnd?: any
}

export function Sortable({ id, children, onDragEnd }: ISortable) {
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`${id}-dnd-list`} direction="vertical">
          {(provided: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default Sortable

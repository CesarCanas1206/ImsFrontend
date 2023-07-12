// Write a reactjs typescript component called 'ListItems' which has an input for an array of items.
// The list is an array of items that can have a parent and child items, so a nested list
// To re-order items, use DragDropContext, drag and drop from react-beautiful-dnd and @types/react-beautiful-dnd
// The only thing you need to understand is that a Droppable container is created using Droppable component, and you must provide droppableId which could be any unique string, and a callback function: (droppableProvided) => (..ref={droppableProvided.innerRef} {…droppableProvided.droppableProps})
// Same as Droppable component, we also need to provide a draggableId which is any unique string, and a callback function: (draggableProvided) => (..ref={draggableProvided.innerRef} {…draggableProvided.draggableProps} {...draggableProvided.draghandleProps).
// Example of items [{id: '123456', parentId: '', title: 'Item 1'}, {id: '5678', parentId: '123456', title: 'Child 1'}, {id: '3456', parentId: '123456', title: 'Child 2'}]

import React, { useState, useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface ListItemProps {
  items: {
    id: string
    parentId: string
    title: string
  }[]
}

const ListItems = ({ items }: ListItemProps) => {
  //  const [list, setList] = useState(items);
  const [list, setList] = useState([
    { id: '1', parentId: '', title: 'Item 1' },
    { id: '2', parentId: '1', title: 'Item 2' },
  ])

  const dragRef = useRef()

  const onDragEnd = (result: any) => {
    const { source, destination } = result

    // Dropped outside of list
    if (!destination) {
      return
    }

    // re-order list
    // reorder array
    let newItems = [...items]
    let item = newItems.splice(source.index, 1)[0]
    newItems.splice(destination.index, 0, item)
    //const listReordered = reorder(list, source.index, destination.index)
    setList(newItems)
  }

  const renderList = (list: any) => {
    return list.map((item: any, idx: number) => {
      const childItems = list.filter((f: any) => (f.parentId = item.id))
      return (
        // <>
        //   {item.id}
        //   {':'}
        //   {item.parentId}
        //   {':'}
        //   {item.title}
        //   {'::::'}
        // </>

        <Draggable key={item.id} draggableId={item.id} index={idx}>
          {(draggableProvided, snapshot) => (
            <div
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}
            >
              {item.title}
              {childItems && (
                <Droppable key={idx} droppableId={idx}>
                  {(droppableProvided) => (
                    <div
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {renderList(childItems)}
                    </div>
                  )}
                </Droppable>
              )}
            </div>
          )}
        </Draggable>
      )
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} ref={dragRef}>
      <Droppable droppableId="list">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {renderList(list)}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListItems

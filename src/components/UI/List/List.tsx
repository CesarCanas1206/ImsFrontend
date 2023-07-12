import React, { useState } from 'react'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Icon from '../Icon/Icon'
import Sortable, { SortableItem } from '../Sortable/Sortable'

const lists = [
  {
    name: 'First 1',
    order: 1,
    sub: [
      {
        name: 'Sub 1',
        order: 1,
      },
      {
        name: 'Sub 2',
        order: 2,
      },
      {
        name: 'Sub 3',
        order: 3,
      },
    ],
  },
  { name: 'Second', order: 2 },
  { name: 'Third', order: 3 },
  { name: 'Fourth', order: 4 },
  { name: 'Fifth', order: 5 },
  { name: 'Sixth', order: 6 },
  { name: 'test5', order: 7 },
  { name: 'tes6t', order: 8 },
  {
    name: 'test7',
    order: 9,
    sub: [
      {
        name: 'Sub 1',
        order: 1,
      },
      {
        name: 'Sub 2',
        order: 2,
      },
      {
        name: 'Sub 3',
        order: 3,
      },
    ],
  },
  { name: 'test8', order: 10 },
  { name: 'test9', order: 11 },
  {
    name: 'test9',
    order: 12,
    sub: [
      {
        name: 'Sub 1',
        order: 1,
      },
      {
        name: 'Sub 2',
        order: 2,
      },
      {
        name: 'Sub 3',
        order: 3,
      },
    ],
  },
  { name: 'Last', order: 13 },
]

function ListItems({ items, noSub, reOrder }: any) {
  return (
    <>
      {items.map((item: any, index: number) => (
        <SortableItem
          key={index}
          index={index}
          id={index.toString()}
          className="list-group-item list-group-item-action d-flex gap-3 direction-row my-1"
        >
          <div>{item.name}</div>
          <div>{item.order}</div>
          <div className="flex-shrink-0 bg-primary">
            {
              typeof item.sub !== 'undefined' && // (
                // <Sortable
                //   id={`sub${index}`}
                //   onDragEnd={({ destination, source }: any) =>
                //     reOrder(source.index, destination.index, index)
                //   }
                // >
                item.sub.map((sub: any, idx2: number) => (
                  <SortableItem
                    key={(index + 1) * 100 + idx2}
                    index={(index + 1) * 100 + idx2}
                    id={`${(index + 1) * 100 + idx2}-${idx2}`}
                    className={`list-group-item list-group-item-action d-flex gap-3 direction-row my-1 ms-${
                      index + 1
                    }`}
                  >
                    {sub.name}
                  </SortableItem>
                ))
              // </Sortable>
              // )
            }
          </div>
        </SortableItem>
      ))}
    </>
  )
}
function ListItems2({ item }: any) {
  return (
    <div style={{ border: '1px solid red' }} className="my-1 p-1">
      <div style={{ display: 'inline-block' }}>{item.id}</div>
      <div style={{ display: 'inline-block' }}>{item.name}</div>
    </div>
  )
}

function DragAndDropList(): any {
  return <></>
  // return (
  //   <>
  //     <DragDropContext
  //       onDragEnd={
  //         ({ destination, source }: any) => console.log('reorder') // reOrder(source.index, destination.index)
  //       }
  //     >
  //       <Droppable droppableId="droppable">
  //         {(provided, snapshot) => (
  //           <div {...provided.droppableProps} ref={provided.innerRef}>
  //             <ListItems items={lists} />
  //             {/* {lists.map((item, index) => (
  //               <Draggable draggableId={item.id} index={index} key={index}>
  //                 {(provided: any, snapshot: any) => (
  //                   <div
  //                     ref={provided.innerRef}
  //                     {...provided.draggableProps}
  //                     {...provided.dragHandleProps}
  //                   >
  //                     <ListItems item={item} />
  //                   </div>
  //                 )}
  //               </Draggable>
  //             ))} */}
  //             {provided.placeholder}
  //           </div>
  //         )}
  //       </Droppable>
  //     </DragDropContext>
  //   </>
  // )
}
function SubList() {
  const [items, setItems] = useState(lists.slice(0, 3))

  const reOrder = (from: any, to: any) => {
    console.log('test')
    let tmpArray = [...items]
    tmpArray.splice(to, 0, tmpArray.splice(from, 1)[0])
    setItems(tmpArray)
  }

  return (
    <div className="list-group ms-3">
      {/* <DragDropContext
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
      </DragDropContext> */}
    </div>
  )
}

export function List() {
  const [items, setItems] = useState(lists)

  const reOrder = (from: any, to?: any, parentIndex?: any) => {
    console.log(items[from].order)
    console.log(items[to].order)
    let order = 1
    let tmpArray: any = [...items]
    if (typeof parentIndex !== 'undefined') {
      tmpArray[parentIndex]?.sub?.splice(
        to,
        0,
        tmpArray[parentIndex]?.sub?.splice(from, 1)[0],
      )
      tmpArray[parentIndex].sub = tmpArray[parentIndex]?.sub?.map(
        (item: any) => {
          return {
            ...item,
            order: order++,
          }
        },
      )
    } else {
      tmpArray.splice(to, 0, tmpArray.splice(from, 1)[0])
      tmpArray = tmpArray.map((item: any) => {
        return {
          ...item,
          order: order++,
        }
      })
    }
    setItems(tmpArray)
  }

  return (
    <>
      {/* {DragAndDropList()} */}
      {/* <Sortable
        id="mainList"
        onDragEnd={
          ({ destination, source }: any) => console.log(source.index) //reOrder(source.index, destination.index)
        }
      >
        <ListItems reOrder={reOrder} items={items} />
      </Sortable> */}
    </>
  )
}

export default List

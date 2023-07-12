import React from 'react'
import ComponentSettings from '../DynamicComponent/ComponentSettings'
import Sortable, { SortableItem } from '../UI/Sortable/Sortable'
import componentStyle from './componentMenu.module.css'

function ComponentSideBarItem({
  item,
  index,
  modalSettings,
  setMoveFrom,
  moveFrom,
}: any) {
  return (
    <>
      <SortableItem
        id={index.toString()}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 5,
        }}
        className={componentStyle.sideBarItem}
        index={index}
        key={index}
        inside={
          item.sub?.length !== 0 && (
            <div
              style={{ width: '100%', flex: 0, paddingLeft: 10 }}
              // onMouseEnter={() =>
              //   (document.querySelector(`#${item.id}`).style.outline =
              //     '1px solid red')
              // }
              // onMouseLeave={() =>
              //   (document.querySelector(`#${item.id}`).style.outline = 'none')
              // }
            >
              <Sortable
                id={item.id}
                onDragEnd={({ destination, source }: any) =>
                  console.log(source.index, destination.index, index)
                }
              >
                <div className="ms-4">
                  {item.sub?.map((item2: any, idx2: number) => (
                    <ComponentSideBarItem
                      modalSettings={modalSettings}
                      setMoveFrom={setMoveFrom}
                      moveFrom={moveFrom}
                      key={item2.id || idx2}
                      index={idx2}
                      item={item2}
                    />
                  ))}
                </div>
              </Sortable>
            </div>
          )
        }
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 3,
            width: '100%',
          }}
        >
          {/* <div>
            <Icon type="drag" />
          </div> */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <small>{item.component.replace(/([a-z])([A-Z])/g, '$1 $2')}</small>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
              <ComponentSettings
                modalSettings={modalSettings}
                setMoveFrom={setMoveFrom}
                moveFrom={moveFrom}
                name={item.component.replace(/([a-z])([A-Z])/g, '$1 $2')}
                {...item}
              />
            </div>
          </div>
        </div>
      </SortableItem>
    </>
  )
}

export default ComponentSideBarItem

import Icon from '../UI/Icon/Icon'
import Sortable, { SortableItem } from '../UI/Sortable/Sortable'
import JsonComponentSettings from './JsonComponentSettings'

function JsonComponentItem({
  compProperties,
  item,
  index,
  modalSettings,
  updateProperty,
}: any) {
  return (
    <>
      <SortableItem
        id={index.toString()}
        className={`d-flex mb-2 align-items-center p-1`}
        index={index}
        key={index}
        inside={
          item.sub?.length !== 0 && (
            <div className="w-100 flex-shrink-0">
              <Sortable
                id={item.id}
                onDragEnd={({ destination, source }: any) =>
                  console.log(source.index, destination.index, index)
                }
              >
                <div className="ms-4">
                  {item.sub?.map((item2: any, idx2: number) => (
                    <JsonComponentItem
                      compProperties={{
                        ...compProperties,
                        index: [...compProperties.index, idx2],
                      }}
                      modalSettings={modalSettings}
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
          className="d-flex mb-2 align-items-center p-1 w-100"
          style={{
            border: '1px solid #000',
            borderRadius: '4px',
          }}
        >
          <div>
            <Icon type="drag" />
          </div>
          <div className="d-flex w-100">
            <small>{item.component}</small>
            <div className="ms-auto">
              <JsonComponentSettings
                modalSettings={modalSettings}
                updateProperty={updateProperty}
                {...item}
                compProperties={compProperties}
              />
            </div>
          </div>
        </div>
      </SortableItem>
    </>
  )
}

export default JsonComponentItem

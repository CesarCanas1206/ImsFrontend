import Button from '../../Form/Button/Button'
import useAPI from '../../../hooks/useAPI'

function AddDefault({ text, presets, endpoint }: any) {
  const { post } = useAPI()
  const addHandler = async () => {
    if (!Array.isArray(presets)) {
      return
    }
    await Promise.all(
      presets.map((data: any) =>
        post({
          endpoint,
          data: {
            ...data,
          },
        }),
      ),
    )
    window.location.reload()
  }

  return (
    <div
      style={{
        padding: 10,
        margin: '10px 0',
        borderTop: '1px solid rgba(220, 212, 212, .8)',
        borderBottom: '1px solid rgba(220, 212, 212, .8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {presets && (
        <>
          No results were found, press "Add new" or
          <Button
            onClick={addHandler}
            text="Set up presets"
            tooltip="Load a list of preset values for this area"
          />
        </>
      )}
      {!presets && (text || <>No results were found, press "Add new"</>)}
    </div>
  )
}

export default AddDefault

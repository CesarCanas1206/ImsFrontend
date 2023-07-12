import ModalButton from '../../UI/ModalButton/ModalButton'
import Stack from '../../UI/Stack/Stack'
import Button from '../Button/Button'

function InputSuggestions({ suggestions, onClick }: any) {
  return (
    <>
      <ModalButton
        icon="Question"
        tooltip="Suggestions for this answer"
        variant="secondary"
        size="xs"
        compact
        style={{ marginRight: 15, paddingLeft: 5, paddingRight: 5, height: 30 }}
      >
        {({ onClose }: any) => (
          <Stack>
            {suggestions?.map((item: any) => (
              <Button
                fullWidth
                text={item}
                key={item}
                onClick={() => {
                  onClick({ target: { value: item }, value: item })
                  onClose()
                }}
              />
            ))}
          </Stack>
        )}
      </ModalButton>
    </>
  )
}

export default InputSuggestions

import DynamicComponent from '../../DynamicComponent/DynamicComponent'

export function Upload(props: any) {
  const clickHandler = () => {
    console.log('Clicked!!!')
  }

  return (
    <>
      <DynamicComponent
        component="Button"
        props={{
          text: 'Take photo',
          icon: 'upload',
          onClick: clickHandler,
        }}
      />
    </>
  )
}

export default Upload

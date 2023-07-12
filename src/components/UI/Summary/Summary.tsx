import Callout from '../Callout/Callout'

export function Summary(props: any) {
  return (
    <>
      <Callout>Hello</Callout>
      <Callout>Hello</Callout>
      <Callout variant="success">Hello</Callout>
      <Callout variant="danger">
        The thing that has the number is not good enough
        <br />
        Probably needs to be fixed
      </Callout>
    </>
  )
}

export default Summary

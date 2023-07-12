import React, { useEffect } from 'react'
// import { FormControl, InputGroup, Row, Col } from 'react-bootstrap'
import useAPI from '../../../hooks/useAPI'

const FilterOn = (props: any) => {
  const filterList = props.filter
  const { get, post } = useAPI()

  //Get initial data
  const [state, setState] = React.useState<any>([
    {
      contact: '',
      hirer: '',
    },
  ])

  const [timer, setTimer] = React.useState<any>(null)

  const getValue = (item: any, index: number) => {
    if (state.length !== 0) {
      return 'hirer'
    }
  }

  const changeHandler = async (event: Event) => {
    const value = (event.target as HTMLInputElement).value
    const name = (event.target as HTMLInputElement).name
    setState({
      ...state,
      [name]: value,
    })

    //Set timeout then it won't send request everytime
    clearTimeout(timer)
    const newTimer = setTimeout(async () => {
      const data = await post({
        endpoint: props.endpoint,
        getData: true,
        type: 'JSON',
        data: {
          ...state,
        },
      })
    }, 1000)
    setTimer(newTimer)
  }

  console.log(state[0].contact)

  useEffect(() => {
    const filterData = filterList.map((item: any, index: any) => item.name)
    setState([...filterData])
  }, [])

  return <>Nothing here</>

  // return (
  //   <>
  //     <Row>
  //       {filterList.map((item: any, index: any) => (
  //         <Col sm={4} md={4} className="mt-2" key={index}>
  //           <InputGroup className="mb-3">
  //             <InputGroup.Text id="inputGroup-sizing-default">
  //               {Object.keys(item.name)}
  //             </InputGroup.Text>
  //             <FormControl
  //               aria-label="Default"
  //               aria-describedby="inputGroup-sizing-default"
  //               name={item.htmlName}
  //               value={
  //                 index === 0 ? state[item.htmlName] : state[item.htmlName]
  //               }
  //               onChange={changeHandler as any}
  //             />
  //           </InputGroup>
  //         </Col>
  //       ))}
  //     </Row>
  //   </>
  // )
}
export default FilterOn

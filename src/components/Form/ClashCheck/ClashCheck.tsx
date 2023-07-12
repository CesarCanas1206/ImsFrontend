import React, { useContext, useState } from 'react'
import useAPI from '../../../hooks/useAPI'
import FormContext from '../../../context/FormContext'

function ClashCheck() {
  const { values } = useContext(FormContext)
  const { get } = useAPI()

  const [clashes, setClashes] = useState('')

  const checkHandler = async () => {
    const params: any = [
      `id=${values.id}`,
      `asset_id=${values.asset_id}`,
      `start=${values.start}`,
      `end=${values.end}`,
    ]

    const results = await get({
      endpoint: `check/clash?${params.join('&')}`,
    })

    setClashes(results.clashes)
  }

  return (
    <div>
      <button onClick={checkHandler}>Check clashes</button>
      {clashes !== '' && <div>Number of clashes {clashes.length}</div>}
    </div>
  )
}

export default ClashCheck

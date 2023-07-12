import React, { useEffect, useState } from 'react'
import { Button } from '../../Form/Button/Button'
import Input from '../../Form/Input/Input'
import ModuleSelect from '../../Form/ModuleSelect/ModuleSelect'
import Group from '../../UI/Group/Group'
import Icon from '../../UI/Icon/Icon'
import Loader from '../../UI/Loader/Loader'
import Stack from '../../UI/Stack/Stack'
import useAPI from '../../../hooks/useAPI'

function CreateSite() {
  const { get } = useAPI()
  const key = 'e86532f0-09a2-4229-8497-8432f9f02869'
  const [site, setSite] = useState('')
  const [name, setName] = useState('')
  const [modules, setModules] = useState('["booking", "crm", "inspection"]')
  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState(false)

  const clickHandler = async () => {
    if (site === '') {
      return
    }
    setCreating(true)

    const formattedModules = JSON.parse(modules).join(',')
    await get({
      endpoint: `createSite?v=${key}&site=${site}&name=${name}&modules=${formattedModules}`,
    })
    setCreating(false)
    setCreated(true)
  }

  useEffect(() => {
    const update = setTimeout(() => {
      if (site === '') {
        setSite(name.toLowerCase().replace(' ', '-').replace("'", ''))
      }
    }, 1000)
    return () => {
      clearTimeout(update)
    }
  }, [name])

  return (
    <div style={{ margin: '0 auto', maxWidth: 500 }}>
      {created && (
        <Group>
          <Icon type="tick" />
          Created new site! <a href={`/${site}`}>Go to site</a>
        </Group>
      )}
      {creating && (
        <Group>
          <Loader />
          Creating new site...
        </Group>
      )}
      {!creating && !created && (
        <Stack>
          <Input
            placeholder="Enter new client name"
            value={name}
            onChange={({ value }: { value: string }) => setName(value)}
          />
          <Input
            placeholder="Enter new site address"
            value={site}
            onChange={({ value }: { value: string }) =>
              setSite(value.toLowerCase().replace(' ', ''))
            }
          />

          <ModuleSelect
            onChange={({ value }: any) => setModules(value)}
            value={modules}
          />
          <Button text="Create site" icon="plus" onClick={clickHandler} />
        </Stack>
      )}
    </div>
  )
}

export default CreateSite

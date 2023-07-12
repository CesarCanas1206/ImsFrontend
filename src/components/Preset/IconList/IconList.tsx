import { CopyButton } from '@mantine/core'
import React from 'react'
import Button from '../../Form/Button/Button'
import Group from '../../UI/Group/Group'
import Icon from '../../UI/Icon/Icon'
import iconRegistry from '../../../registry/iconRegistry'

function IconList() {
  return (
    <div>
      <h1>Icon list</h1>
      {(Object.keys(iconRegistry) as Array<keyof typeof iconRegistry>).map(
        (icon: any) => (
          <Group key={icon} mb={'sm'}>
            <CopyButton value={icon}>
              {({ copied, copy }: { copied: boolean; copy(): void }) => (
                <Button
                  onClick={copy}
                  text={copied ? 'Copied ' + icon : 'Copy'}
                />
              )}
            </CopyButton>
            <Icon type={icon} />
            <span>{icon}</span>
          </Group>
        ),
      )}
    </div>
  )
}

export default IconList

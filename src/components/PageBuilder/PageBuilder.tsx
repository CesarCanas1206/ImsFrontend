import React, { useContext } from 'react'
import ComponentSideBar from './ComponentSideBar'
import { Drawer } from '@mantine/core'
import AppContext from '../../context/AppContext'

export interface IPageBuilder {
  pageComponents: object[]
}

function PageBuilder({ pageComponents }: IPageBuilder) {
  const { setEditMode } = useContext(AppContext)
  return (
    <Drawer
      size={window.outerWidth < 600 ? 'full' : 'lg'}
      // withOverlay={false}
      overlayOpacity={0.1}
      opened={true}
      position="right"
      onClose={() => setEditMode(false)}
      title={<h4 style={{ paddingLeft: 10 }}>Components</h4>}
      styles={{
        drawer: { overflow: 'auto', paddingBottom: '5px' },
      }}
      lockScroll={true}
    >
      <ComponentSideBar pageComponents={pageComponents} />
    </Drawer>
  )
}

export default PageBuilder

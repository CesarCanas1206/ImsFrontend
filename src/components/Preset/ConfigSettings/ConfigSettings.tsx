import { useQuery } from 'react-query'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import Button from 'src/components/Form/Button/Button'
import { get, post } from 'src/hooks/useAPI'
import { siteName } from 'src/utilities/localStorage'

const knownSettings: any = {
  logo: {
    code: 'logo',
    name: 'Logo',
    value:
      '{"name":"168489763043.png","value":"https://apps.imscomply.com.au/ims-api/storage/bookings/168489763043.png","fileType":"image/png"}',
    public: '1',
  },
  name: { code: 'name', name: 'Client name', value: siteName, public: '1' },
  modules: { code: 'modules', name: 'Modules', value: '[]', public: '1' },
  live_email: { code: 'live_email', name: 'Live email', value: '0' },
  test_email: {
    code: 'test_email',
    name: 'Test email',
    value: 'todds@imscomply.com.au',
  },
}

function ConfigSettings() {
  const configQuery = useQuery({
    queryKey: ['settings'],
    queryFn: async () => await get({ endpoint: 'settings' }),
  })

  const missing = Object.keys(knownSettings).filter(
    (key) => !configQuery.data?.find((item: any) => item.code === key),
  )

  const addMissing = async () => {
    await Promise.all(
      missing.map(async (key) =>
        post({ endpoint: `settings`, data: knownSettings[key] }),
      ),
    )
    configQuery.refetch()
  }

  return (
    <>
      <DynamicComponent
        component="DataGrid"
        queryOverride={configQuery}
        {...{
          columns: [
            { name: 'Name', key: 'name' },
            { name: 'Code', key: 'code' },
            {
              name: 'Value',
              key: 'value',
            },
            {
              name: 'Actions',
              key: 'action',
              sub: [
                {
                  component: 'Group',
                  sub: [
                    {
                      component: 'ModalButtonForm',
                      icon: 'edit',
                      formId: 'config',
                      itemId: '{id}',
                    },
                    {
                      component: 'Confirm',
                      title: 'Are you sure you want to delete this?',
                      tooltip: 'Delete',
                      variant: 'danger',
                      icon: 'delete',
                      sub: [
                        {
                          component: 'Action',
                          props: {
                            action: 'delete',
                            endpoint: 'settings/{id}',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          sub: [
            {
              component: 'Group',
              sub: [
                {
                  component: 'ModalButtonForm',
                  icon: 'plus',
                  text: 'Add config setting',
                  formId: 'config',
                  itemId: 'new',
                },
              ],
            },
            {
              component: 'Space',
              h: 'sm',
            },
          ],
          sorting: [
            { name: 'Name (A-Z)', key: 'name' },
            { name: 'Name (Z-A)', key: 'name,desc' },
          ],
        }}
      />
      {missing.length > 0 && (
        <Button
          mt={10}
          onClick={addMissing}
          text={`Add missing settings (${missing.join(', ')})`}
        />
      )}
    </>
  )
}

export default ConfigSettings

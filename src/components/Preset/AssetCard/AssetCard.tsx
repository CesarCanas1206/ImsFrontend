import Button from '../../Form/Button/Button'
import Form from '../../Form/Form/Form'
import Avatar from '../../UI/Avatar/Avatar'
import Card from '../../UI/Card/Card'
import Group from '../../UI/Group/Group'
import Icon from '../../UI/Icon/Icon'
import Map from '../../UI/Map/Map'
import ModalButton from '../../UI/ModalButton/ModalButton'
import Stack from '../../UI/Stack/Stack'
import { NavLink } from 'react-router-dom'
import Badge from '../../UI/Badge/Badge'
import SimpleGrid from '../../UI/SimpleGrid/SimpleGrid'
import Heading from '../../UI/Heading/Heading'
import ActionMenu from '../../UI/ActionMenu/ActionMenu'
import ModalButtonForm from '../../UI/ModalButtonForm/ModalButtonForm'
import { isEmpty } from 'src/utilities/strings'
import { sortAlphabeticallyByName } from 'src/utilities/objects'
import Confirm from 'src/components/Function/Confirm/Confirm'
import { doDelete } from 'src/hooks/useAPI'
import DataGridContext from '../../../context/DataGridContext'
import { useContext } from 'react'

function SubAsset({
  id,
  parent_id,
  assets,
  name,
  sub,
  onSave,
  deleteAsset,
  ...props
}: any) {
  const actions = [
    {
      text: 'Edit asset',
      icon: 'edit',
      color: 'blue',
      modal: true,
      sub: [
        {
          component: 'Form',
          formId: 'asset',
          itemId: id,
          parent_id: parent_id,
          onSave: onSave,
          showClose: true,
        },
      ],
    },
    {
      text: 'View asset details',
      icon: 'search',
      link: `/asset/${id}`,
    },
    {
      text: 'Assigned hirers',
      icon: 'users',
      modal: true,
      hide: !props.bookable,
      sub: [
        {
          component: 'AssetLinkHirer',
          id: id,
        },
      ],
    },
    {
      text: 'Assigned checklists',
      icon: 'list',
      modal: true,
      hide: !props.inspectable,
      sub: [
        {
          component: 'AssetLinkForm',
          id: id,
        },
      ],
    },
    {
      text: 'Delete asset',
      confirm: true,
      icon: 'trash',
      color: 'red',
      sub: [
        {
          component: 'Confirm',
          title: 'Are you sure you want to delete this asset?',
          variant: 'danger',
          compact: true,
          icon: 'delete',
          opened: true,
          light: true,
          onYes: () => deleteAsset(id),
        },
      ],
    },
    {
      text: 'Add new',
      icon: 'plus',
      color: 'green',
      modal: true,
      sub: [
        {
          component: 'Form',
          formId: 'asset',
          parent_id: id,
          onSave: onSave,
          showClose: true,
        },
      ],
    },
  ]

  return (
    <>
      <Group
        position="apart"
        align="flex-start"
        style={{ paddingLeft: sub ? 15 : 0 }}
        key={id}
      >
        <Stack>
          <Heading style={{ marginBottom: 0, marginTop: 5 }} size="h6">
            {name}
          </Heading>
          <Group>
            <Badge color="blue">
              {!isEmpty(props.bookable) ? 'Bookable' : 'Not bookable'}
            </Badge>
            <Badge color="blue">
              {!isEmpty(props.inspectable) ? 'Inspectable' : 'Not inspectable'}
            </Badge>
          </Group>
        </Stack>
        <Group>
          <ActionMenu tooltip="Actions" actions={actions}></ActionMenu>
        </Group>
      </Group>
      {typeof assets !== 'undefined' &&
        assets
          ?.sort(sortAlphabeticallyByName)
          ?.map((a2: any) => (
            <SubAsset key={a2.id} {...a2} parent_id={id} sub deleteAsset={deleteAsset} />
          ))}
    </>
  )
}

function AssetCard({ row, asset: sentAsset, onSave, ...props }: any) {
  const {
    id,
    name,
    photo,
    address,
    suburb,
    state,
    assets,
    bookable,
    inspectable,
  } = row ?? sentAsset
  const { reloadTable } = useContext(DataGridContext)

  const deleteAsset = async (id: any) => {
    await doDelete({
      endpoint: 'asset/' + id,
    })
    reloadTable()
  }

  const actions = [
    {
      text: 'Assigned hirers',
      icon: 'users',
      modal: true,
      hide: isEmpty(bookable),
      sub: [
        {
          component: 'AssetLinkHirer',
          id: id,
        },
      ],
    },
    {
      text: 'Assigned checklists',
      icon: 'list',
      modal: true,
      hide: isEmpty(inspectable),
      sub: [
        {
          component: 'AssetLinkForm',
          id: id,
        },
      ],
    },
  ]

  return (
    <SimpleGrid cols={3} breakpoints={[{ minWidth: 'sm', cols: 1 }]}>
      <Card
        style={{
          alignSelf: 'stretch',
          maxWidth: '100%',
          border: 'none',
          boxShadow: 'none',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        }}
      >
        <Group spacing={16} align="start">
          <div>
            {photo && photo.value !== '' && (
              <Avatar size={29} src={photo.value ?? photo} />
            )}
          </div>
          <Stack spacing="15">
            <Heading style={{ marginBottom: 0, marginTop: 0 }}>
              <NavLink to={`/asset/${id}`} style={{ display: 'flex', gap: 10 }}>
                {name}
              </NavLink>
              {/* </Group> */}
            </Heading>{' '}
            {typeof address !== 'undefined' && address !== '' && (
              <h6>
                <Group>
                  <ModalButton
                    size="auto"
                    text={
                      <>
                        <Icon type="Map" fontSize="11" /> {address}
                      </>
                    }
                    style={{ display: 'flex', alignItems: 'center' }}
                    text_link
                    compact
                  >
                    <Map
                      address={[address, suburb, state].join(' ')}
                      style={{ width: '100%' }}
                    />
                  </ModalButton>
                </Group>
              </h6>
            )}
            <Group style={{ marginTop: '5px' }}>
              <Badge>{props['asset-type']?.name}</Badge>
              <Badge color="blue">
                {!isEmpty(bookable) ? 'Bookable' : 'Not bookable'}
              </Badge>
              <Badge color="blue">
                {!isEmpty(inspectable) ? 'Inspectable' : 'Not inspectable'}
              </Badge>
            </Group>
          </Stack>
        </Group>
      </Card>
      <div>
        <Heading style={{ marginTop: 0, color: 'var(--c-link, #19407e)' }}>
          Venue assets
        </Heading>
        <Stack align="stretch">
          {assets?.sort(sortAlphabeticallyByName)?.map((a: any) => (
            <Card key={a.id}>
              <SubAsset
                key={a.id}
                parent_id={id}
                {...a}
                onSave={onSave}
                deleteAsset={deleteAsset}
              />
            </Card>
          ))}
          <ModalButton
            icon="plus"
            text="Add new"
            variant="success"
            size="xl"
            compact
            style={{ width: 'fit-content' }}
            text_link
          >
            <Form formId="asset" parent_id={id} onSave={onSave} />
          </ModalButton>
        </Stack>
      </div>
      <Group align="flex-start" position="right">
        <ModalButtonForm
          icon="edit"
          size="xl"
          compact
          formId="asset"
          itemId={id}
          onSave={onSave}
          tooltip="Edit venue"
          sentValues={{previewMode: true}}
        />
        <Button
          icon="search"
          variant="info"
          compact
          light
          link={`/asset/${id}`}
          tooltip="View venue details"
        />
        <Confirm
          onYes={() => deleteAsset(id)}
          title={`Are you sure you want to delete this venue?`}
          variant="danger"
          icon="Trash"
          light
          compact
          tooltip="Delete venue"
        />
        {actions.filter((f: any) => !f.hide).length && (
          <ActionMenu tooltip="Actions" actions={actions}></ActionMenu>
        )}
      </Group>
    </SimpleGrid>
  )
}

export default AssetCard

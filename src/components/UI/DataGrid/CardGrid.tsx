import React, { useContext } from 'react'
import DataGridContext from '../../../context/DataGridContext'
import SearchFilter from './SearchFilter'
import Pagination from './Pagination'
import LoaderContent from '../LoaderContent/LoaderContent'
import Card from '../Card/Card'
import Stack from '../Stack/Stack'
import Group from '../Group/Group'
import Heading from '../Heading/Heading'
import { Badge } from '../Badge/Badge'
import SimpleGrid from '../SimpleGrid/SimpleGrid'
import FormReadOnly from '../../Form/FormReadOnly/FormReadOnly'
import Alert from '../Alert/Alert'
import PageTitle from '../PageTitle/PageTitle'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import { isEmpty } from '../../../utilities/strings'
import Link from '../Link/Link'

const CreateDynamicItem = React.lazy(
  () => import('../../DynamicPage/CreateDynamicItem'),
)

const Icon = React.lazy(() => import('../../UI/Icon/Icon'))

const Pages = () => <Pagination />

export function CardGrid({
  extra,
  compact,
  titleSub,
  position,
  children,
}: any) {
  const { columns, filteredData, perPage, page, pending, totalCount } =
    useContext(DataGridContext)

  const actionColumn = columns.find((col: any) =>
    col?.reference?.includes('action'),
  )

  const singleColumn = columns.find((col: any) => col.single === true)

  let featureColumn = columns.find((col: any) => Boolean(col.feature) === true)

  featureColumn = !isEmpty(featureColumn)
    ? featureColumn
    : !singleColumn
    ? columns[0]
    : null

  const groupColumns = columns.filter(
    (col: any) => Boolean(col.group) === true && Boolean(col.list) !== true,
  )
  const groupListColumns = columns.filter(
    (col: any) => Boolean(col.group) === true && Boolean(col.list) === true,
  )
  const badgeColumns = columns.filter((col: any) => Boolean(col.badge) === true)

  const formattedColumns = columns.filter(
    (col: any) =>
      !col.reference?.includes('action') &&
      Boolean(col.feature) !== true &&
      Boolean(col.group) !== true &&
      Boolean(col.badge) !== true &&
      (typeof featureColumn === 'undefined' ||
        featureColumn?.reference !== col.reference),
  )

  const simpleGridCols =
    ((featureColumn ? 1 : 0) || badgeColumns.length || formattedColumns.length
      ? 1
      : 0) +
    (groupColumns.length || groupListColumns.length ? 1 : 0) +
    (actionColumn ? 1 : 0)

  return (
    <>
      {typeof titleSub !== 'undefined' && (
        <PageTitle>
          {totalCount > 1 && <SearchFilter hideSearch />}
          <DynamicComponent component="Fragment" sub={titleSub} />
        </PageTitle>
      )}
      <Group align="start" position={'apart'} mb={10}>
        {position !== 'bottom' && children}
        {totalCount > 1 && (
          <SearchFilter onlySearch={typeof titleSub !== 'undefined'} />
        )}
      </Group>
      {!pending && <Pages />}
      {typeof extra !== 'undefined' && extra}
      <>
        {pending && <LoaderContent justContent cards noButton />}
        {!pending && (
          <Stack spacing={compact && '0'}>
            {totalCount > 0 && filteredData?.length === 0 && (
              <Alert>No results found.</Alert>
            )}
            {typeof filteredData !== 'undefined' &&
              typeof filteredData.map !== 'undefined' &&
              filteredData
                ?.slice((page - 1) * perPage, page * perPage)
                ?.map((item: any, index: number) => {
                  return (
                    <Card
                      p={compact && 'xs'}
                      radius={compact && '0'}
                      key={item.id || item.name || index}
                    >
                      {singleColumn && <>{singleColumn.selector(item)}</>}
                      <SimpleGrid
                        cols={simpleGridCols}
                        breakpoints={[{ minWidth: 'sm', cols: 1 }]}
                      >
                        {(featureColumn ||
                          badgeColumns?.length > 0 ||
                          formattedColumns) && (
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
                            <Stack spacing="xs">
                              <Heading
                                size="h4"
                                style={{ marginTop: 0, marginBottom: 2 }}
                              >
                                {featureColumn?.link && (
                                  <Link to={featureColumn?.linkTo(item)}>
                                    {featureColumn?.selector(item)}
                                  </Link>
                                )}
                                {typeof featureColumn?.link === 'undefined' &&
                                  featureColumn?.selector(item)}
                              </Heading>
                              {badgeColumns?.length > 0 &&
                                badgeColumns.filter(
                                  (col: any) => !isEmpty(col?.selector(item)),
                                )?.length > 0 && (
                                  <Group key={index}>
                                    {badgeColumns?.map(
                                      (col: any, colIdx: number) => {
                                        if (
                                          typeof col?.title === 'undefined' &&
                                          isEmpty(col?.selector(item))
                                        ) {
                                          return
                                        }
                                        return (
                                          <Badge
                                            key={colIdx}
                                            color={col?.badgeColor}
                                          >
                                            {typeof col?.icon === 'string' && (
                                              <Icon
                                                fontSize="inherit"
                                                type={col.icon}
                                              />
                                            )}
                                            {col?.title &&
                                              col?.title !== false && (
                                                <>{col.name}: </>
                                              )}
                                            {!isEmpty(col?.selector(item))
                                              ? col?.selector(item)
                                              : col?.defaultValue}{' '}
                                          </Badge>
                                        )
                                      },
                                    )}
                                  </Group>
                                )}
                              {formattedColumns
                                ?.filter((col: any) => col?.selector(item))
                                ?.map((col: any, idx: number) => (
                                  <div
                                    key={col?.name}
                                    className="d-flex gap-2 text-break"
                                    style={{ whiteSpace: 'break-spaces' }}
                                  >
                                    {typeof col?.icon === 'string' && (
                                      <Icon
                                        fontSize="inherit"
                                        type={col.icon}
                                      />
                                    )}
                                    {col?.title &&
                                      col?.title !== false &&
                                      col?.name && (
                                        <small className="text-muted">
                                          <>{col?.name}: </>
                                        </small>
                                      )}
                                    {col.selector(item)}
                                  </div>
                                ))}
                            </Stack>
                          </Card>
                        )}
                        {(groupColumns?.length > 0 ||
                          groupListColumns?.length > 0) && (
                          <Card
                            style={{
                              alignSelf: 'stretch',
                              minWidth: '100%',
                              border: 'none',
                              boxShadow: 'none',
                              padding: 0,
                            }}
                          >
                            <Stack spacing="xs">
                              {groupColumns?.map((col: any, index: number) => (
                                <Group spacing={'xs'} key={index}>
                                  {typeof col?.icon === 'string' && (
                                    <Icon fontSize="inherit" type={col.icon} />
                                  )}
                                  {col?.title &&
                                    col?.title !== false &&
                                    col?.name && (
                                      <small className="text-muted">
                                        <>{col?.name}: </>
                                      </small>
                                    )}
                                  {col?.selector(item)}
                                </Group>
                              ))}
                              {groupListColumns?.length > 0 && (
                                <Group>
                                  {groupListColumns
                                    ?.map((col: any) => col?.selector(item))
                                    .join(', ')}
                                </Group>
                              )}
                            </Stack>
                          </Card>
                        )}
                        {actionColumn && (
                          <FormReadOnly show={false}>
                            <Card
                              p={compact && 'xs'}
                              radius={compact && '0'}
                              style={{
                                alignSelf: 'stretch',
                                maxWidth: '100%',
                                border: 'none',
                                boxShadow: 'none',
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingRight: 0,
                              }}
                            >
                              <Group position="right">
                                {!item.registry && actionColumn?.selector(item)}
                                {typeof item.registry !== 'undefined' && (
                                  <CreateDynamicItem
                                    type={item.registry}
                                    item={item}
                                  />
                                )}
                              </Group>
                            </Card>
                          </FormReadOnly>
                        )}
                      </SimpleGrid>
                    </Card>
                  )
                })}
          </Stack>
        )}
      </>
      {!pending && <Pages />}
      {position === 'bottom' && children}
    </>
  )
}

export default CardGrid

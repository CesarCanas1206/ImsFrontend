import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAPI from '../../../hooks/useAPI'
import Button from '../../Form/Button/Button'
import Checkbox from '../../Form/Checkbox/Checkbox'
import DateUI from '../../Form/Date/Date'
import { Form } from '../../Form/Form/Form'
import FormHeading from '../../Form/Form/formHeading/FormHeading'
import Input from '../../Form/Input/Input'
import Radios from '../../Form/Radios/Radios'
import Textarea from '../../Form/Textarea/Textarea'
import YesNo from '../../Form/YesNo/YesNo'
import FormatDate from '../../Function/FormatDate/FormatDate'
import Card from '../../UI/Card/Card'
import Col from '../../UI/Col/Col'
import Group from '../../UI/Group/Group'
import Icon from '../../UI/Icon/Icon'
import Badge from '../../UI/Badge/Badge'
import ModalButton from '../../UI/ModalButton/ModalButton'
import Row from '../../UI/Row/Row'
import Tooltip from '../../UI/Tooltip/Tooltip'
import Time from '../../Form/Time/Time'
import LoadingOverlay from '../../UI/LoadingOverlay/LoadingOverlay'
import DataGrid from '../../UI/DataGrid/DataGrid'
import Stack from '../../UI/Stack/Stack'
import AssetSelector from '../../Form/AssetSelector/AssetSelector'
import Terms from '../../Form/Terms/Terms'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'

function MembershipInfo({
  membershipInfo,
  saveMembershipHandler,
  readOnly,
}: any) {
  return (
    <>
      <Row idx={1}>
        <Col span={4}>Total male members</Col>
        <Col span={8}>
          <Input
            value={membershipInfo['count_male']}
            onChange={(e: any) =>
              saveMembershipHandler({ name: 'count_male', value: e.value })
            }
            readOnly={readOnly}
          />
        </Col>
      </Row>
      <Row idx={2}>
        <Col span={4}>Total female members</Col>
        <Col span={8}>
          <Input
            value={membershipInfo['count_female']}
            onChange={(e: any) =>
              saveMembershipHandler({ name: 'count_female', value: e.value })
            }
            readOnly={readOnly}
          />
        </Col>
      </Row>
      <Row idx={3}>
        <Col span={4}>Senior (55+) members</Col>
        <Col span={8}>
          <Input
            value={membershipInfo['count_senior']}
            onChange={(e: any) =>
              saveMembershipHandler({ name: 'count_senior', value: e.value })
            }
            readOnly={readOnly}
          />
        </Col>
      </Row>
      <Row idx={4}>
        <Col span={4}>Total volunteers</Col>
        <Col span={8}>
          <Input
            value={membershipInfo['count_volunteers']}
            onChange={(e: any) =>
              saveMembershipHandler({
                name: 'count_volunteers',
                value: e.value,
              })
            }
            readOnly={readOnly}
          />
        </Col>
      </Row>
      <Row idx={5}>
        <Col span={4}>Junior members</Col>
        <Col span={8}>
          <Input
            value={membershipInfo['count_junior']}
            onChange={(e: any) =>
              saveMembershipHandler({ name: 'count_junior', value: e.value })
            }
            readOnly={readOnly}
          />
        </Col>
      </Row>
      <Row idx={6}>
        <Col span={4}>Total group members</Col>
        <Col span={8}>
          <Input
            readOnly
            value={
              Number(membershipInfo['count_male'] ?? 0) +
              Number(membershipInfo['count_female'] ?? 0)
            }
          />
        </Col>
      </Row>
    </>
  )
}
function KeyRegister({
  keyRegisters,
  reloadKeyRegister,
  applicationId,
  readOnly,
}: any) {
  return (
    <>
      {keyRegisters.map((item: any) => (
        <>
          <Card key={item.id} style={{ marginBottom: 8 }}>
            {!readOnly && (
              <Group position="right" style={{ float: 'right' }}>
                <ModalButton icon="edit" compact>
                  <Form
                    formId="key-register"
                    itemId={item.id}
                    onSave={reloadKeyRegister}
                  />
                </ModalButton>
                <ModalButton icon="delete" variant="danger" compact>
                  <Form
                    formId="key-register"
                    itemId={item.id}
                    onSave={reloadKeyRegister}
                  />
                </ModalButton>
              </Group>
            )}
            {item.name}
            {typeof item.address !== 'undefined' && item.address !== '' && (
              <div>
                <Icon type="building" /> {item.address}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              {typeof item.phone_work !== 'undefined' &&
                item.phone_work !== '' && (
                  <span>
                    <Icon type="phone" /> {item.phone_work}
                  </span>
                )}
              {typeof item.mobile !== 'undefined' && item.mobile !== '' && (
                <span>
                  <Icon type="mobile" /> {item.mobile}
                </span>
              )}
            </div>
            <div>
              <Icon type="key" />
              {item.keys}
              {item.key_code}
            </div>
          </Card>
        </>
      ))}
      {!readOnly && (
        <Group position="right">
          <ModalButton text="Add key" icon="plus">
            <Form
              formId="key-register"
              specific_id={applicationId}
              parent_id={applicationId}
              onSave={reloadKeyRegister}
            />
          </ModalButton>
        </Group>
      )}
    </>
  )
}

function VenueUsage({
  saveUsageHandler,
  addUsageHandler,
  deleteVenueUsageHandler,
  usage,
  assets,
  readOnly,
}: any) {
  return (
    <>
      {usage.map((item: any) => {
        return (
          <Card key={item.id} style={{ marginBottom: 10 }}>
            <>
              <Group position="apart" style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <strong>Venue:</strong>
                  <AssetSelector
                    value={item.asset_id}
                    bookable={true}
                    data={assets}
                    onChange={(e: any) =>
                      saveUsageHandler({
                        id: item.id,
                        name: 'asset_id',
                        value: e.value,
                      })
                    }
                    style={{ minWidth: '400px' }}
                    readOnly={readOnly}
                  ></AssetSelector>
                </div>
                {!readOnly && (
                  <Button
                    variant="danger"
                    icon="delete"
                    onClick={() => deleteVenueUsageHandler(item.id)}
                    compact
                  />
                )}
              </Group>
            </>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 10,
              }}
            >
              {days.map((day: any) => {
                if (readOnly && !item[day]) {
                  return <></>
                }
                return (
                  <Card key={day}>
                    <Stack>
                      <Group position="apart" style={{ marginBottom: '5px' }}>
                        <Group>
                          <strong>{day}: </strong>
                          {readOnly &&
                            (item[day]
                              ? item[day].shared
                                ? 'Shared'
                                : 'Not shared'
                              : '')}
                          {!readOnly && (
                            <Checkbox
                              label={
                                <>
                                  Shared
                                  <Tooltip label="Whether this booking area can be shared with other users">
                                    <span>
                                      <Icon type="question" />
                                    </span>
                                  </Tooltip>
                                </>
                              }
                              value={item[day]?.shared}
                              onChange={(e: any) =>
                                saveUsageHandler({
                                  id: item.id,
                                  name: day,
                                  value: {
                                    ...(item[day] || {}),
                                    shared: e.value,
                                  },
                                })
                              }
                              readOnly={readOnly}
                            />
                          )}
                        </Group>
                        {!readOnly && (
                          <Button
                            icon="cancel"
                            variant="secondary"
                            tooltip="Clear values"
                            compact
                            onClick={(e: any) =>
                              saveUsageHandler({
                                id: item.id,
                                name: day,
                                value: {},
                              })
                            }
                          />
                        )}
                      </Group>
                      <Group>
                        <strong>Times: </strong>
                        <TimeRange
                          from={item[day]?.from}
                          to={item[day]?.to}
                          onChange={(e: any) =>
                            saveUsageHandler({
                              id: item.id,
                              name: day,
                              value: {
                                ...(item[day] || {}),
                                [e.name]: e.value,
                              },
                            })
                          }
                          readOnly={readOnly}
                        />
                      </Group>
                      <Group>
                        <strong>Activities: </strong>
                        <Input
                          value={item[day]?.activity}
                          placeholder="Activities"
                          onChange={(e: any) =>
                            saveUsageHandler({
                              id: item.id,
                              name: day,
                              value: {
                                ...(item[day] || {}),
                                activity: e.value,
                              },
                            })
                          }
                          style={{ width: '100%' }}
                          readOnly={readOnly}
                        />
                      </Group>
                    </Stack>
                  </Card>
                )
              })}
            </div>
          </Card>
        )
      })}
      <Group position="right">
        <Button onClick={addUsageHandler} text="Add venue usage" icon="plus" />
      </Group>
    </>
  )
}

function BookingDates({
  usage = [],
  startDate = '2022-06-01',
  endDate = '2022-06-30',
}: any) {
  const getDaysArray = function (s: any, e: any) {
    for (
      var a = [], d = new Date(s);
      d <= new Date(e);
      d.setDate(d.getDate() + 1)
    ) {
      a.push(new Date(d))
    }
    return a
  }

  const t = getDaysArray(new Date(startDate), new Date(endDate))
  const [dateList] = useState(
    t.map((v: any) => ({
      date: v.toISOString().slice(0, 10),
      day: v.toLocaleDateString('en-au', { weekday: 'long' }),
    })),
  )

  return (
    <>
      {usage.map((item: any) => {
        return (
          <React.Fragment key={item.id}>
            <FormHeading>{item?.asset?.name}</FormHeading>
            {dateList.map(({ date, day }: any) => {
              const dayDetails = item[day] ?? {}
              if (
                typeof dayDetails.from === 'undefined' ||
                dayDetails.from === ''
              ) {
                return null
              }
              return (
                <Card key={date} style={{ marginBottom: 10 }}>
                  <div>
                    <Icon type="calendar" style={{ marginRight: 10 }} />
                    <FormatDate text={date} /> <small>({day})</small>
                  </div>
                  <div style={{ display: 'flex', gap: 20 }}>
                    <div>
                      <Icon type="clock" /> {dayDetails?.from} -{' '}
                      {dayDetails?.to}
                    </div>
                    <div>{dayDetails?.activity}</div>
                    <div>{dayDetails?.shared ? 'Shared' : 'Not shared'}</div>
                  </div>
                </Card>
              )
            })}
          </React.Fragment>
        )
      })}
    </>
  )
}

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

function TimeRange({ from, to, onChange, readOnly }: any) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 5,
        alignItems: 'center',
      }}
    >
      <Time
        value={from}
        onChange={(e: any) => onChange({ name: 'from', value: e.value })}
        readOnly={readOnly}
      />
      {' - '}
      <Time
        value={to}
        onChange={(e: any) => onChange({ name: 'to', value: e.value })}
        readOnly={readOnly}
      />
    </div>
  )
}

let savingTimeouts: any = {}
function AllocationApplication({ application_id, readOnly }: any) {
  const params = useParams<any>()
  const applicationId = application_id ?? params.application_id //'6923648f-802f-4674-b7c7-89e392320956'
  return <Form itemId={applicationId} formId="allocation" />
}
function AllocationApplication2({ application_id, readOnly }: any) {
  const { get, post, put, doDelete } = useAPI()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<any>({})
  const [data, setData] = useState<any>({})
  const [season, setSeason] = useState<any>({})
  const [membershipInfo, setMembershipInfo] = useState<any>({})
  const [_documents, setDocuments] = useState<any>({})
  const [officeBearers, setOfficeBearers] = useState<any>([])
  const [keyRegisters, setKeyRegisters] = useState<any>([])
  const [_hirers, setHirers] = useState<any>([])
  const [assets, setAssets] = useState<any>([])
  const [usage, setUsage] = useState([])
  const params = useParams<any>()
  const applicationId = application_id ?? params.application_id //'6923648f-802f-4674-b7c7-89e392320956'
  let navigate = useNavigate()

  const reloadKeyRegister = async () => {
    setKeyRegisters(
      await get({
        endpoint: `d/key-register?specific_id=${applicationId}`,
      }),
    )
  }

  const reloadOfficeBearers = async () => {
    setOfficeBearers(
      await get({
        endpoint: `d/office-bearer?parent_id=${applicationId}`,
      }),
    )
  }

  const reloadUsage = async () => {
    setUsage(
      await get({
        endpoint: `d/venue-usage?specific_id=${applicationId}`,
      }),
    )
  }

  const saveHandler = async ({ name, value }: any) => {
    if (name === '') {
      return
    }

    setData({
      ...data,
      [name]: value,
    })

    const saveData = {
      [name]: value,
    }

    clearTimeout(savingTimeouts[name])

    savingTimeouts[name] = setTimeout(() => {
      put({
        endpoint: `${form.endpoint}/${applicationId}`,
        data: saveData,
      })
    }, 2000)
  }

  const saveMembershipHandler = async ({ name, value }: any) => {
    if (name === '') {
      return
    }
    const saveData = {
      [name]: value,
    }

    setMembershipInfo((prev: any) => ({
      ...membershipInfo,
      [name]: value,
    }))

    clearTimeout(savingTimeouts[name])

    savingTimeouts[name] = setTimeout(async () => {
      let membershipId = membershipInfo.id
      if (!membershipInfo.id || membershipInfo.id === '') {
        const created = await post({
          endpoint: 'd/membership-info',
          data: {
            parent_id: applicationId,
            specific_id: applicationId,
            slug: 'membership-info',
          },
        })
        membershipId = created.id
        setMembershipInfo((prev: any) => ({
          ...membershipInfo,
          id: membershipId,
        }))
      }
      put({
        endpoint: 'd/membership-info/' + membershipId,
        data: saveData,
      })
    }, 2000)
  }

  const saveUsageHandler = async ({ id, name, value }: any) => {
    if (name === '') {
      return
    }

    setUsage((prev: any) =>
      prev.map((item: any) => {
        return item.id === id ? { ...item, [name]: value } : item
      }),
    )

    clearTimeout(savingTimeouts[name])

    const saveData = {
      [name]: value,
    }

    savingTimeouts[name] = setTimeout(() => {
      put({
        endpoint: 'd/venue-usage/' + id,
        data: saveData,
      })
    }, 2000)
  }

  const addUsageHandler = async () => {
    await post({
      endpoint: 'd/venue-usage',
      data: {
        parent_id: applicationId,
        specific_id: applicationId,
        slug: 'venue-usage',
      },
    })
    reloadUsage()
  }

  const deleteVenueUsageHandler = async (id: any) => {
    await doDelete({
      endpoint: `d/${id}`,
    })
    reloadUsage()
  }

  const completeHandler = async () => {
    await put({
      endpoint: `${form.endpoint}/${applicationId}`,
      data: {
        completed: '1',
      },
    })
    navigate(-1)
  }

  useEffect(() => {
    const run = async () => {
      const application = await get({
        endpoint: `d/allocation/${applicationId}`,
      })
      setData(application)
      Promise.all([
        // get({
        //   endpoint: `d/allocation/${applicationId}`,
        // }),
        get({
          endpoint: `d/membership-info?specific_id=${applicationId}`,
        }),
        // get({
        //   endpoint: `d/office-bearer?specific_id=${application.parent_id}`,
        // }),
        // get({
        //   endpoint: `d/key-register?specific_id=${applicationId}`,
        // }),
        // get({
        //   endpoint: 'f/allocation',
        // }),
        get({
          endpoint: 'hirer',
        }),
        get({
          endpoint: 'asset',
        }),
        get({
          endpoint: `d/venue-usage?specific_id=${applicationId}`,
        }),
        // get({
        //   endpoint: `d/compliance-docs?specific_id=${applicationId}`,
        // }),
        // get({
        //   endpoint: `f/compliance-docs`,
        // }),
      ]).then(async (results) => {
        // setData(results[0])
        setMembershipInfo(results[0][0] ?? {})
        // setOfficeBearers(results[2])
        // setKeyRegisters(results[3])
        // setForm(results[4])
        // setForm({
        //   endpoint: 'd/allocation',
        // })
        setHirers(results[1])
        setAssets(results[2])
        setUsage(results[3])
        // setDocuments(results[8][0] ?? {})

        const seasonId = results[0]?.season_id
        if (seasonId) {
          setSeason(await get({ endpoint: 'd/season/' + seasonId }))
        }

        setLoading(false)
      })
    }
    run()
  }, [])

  const topLevel = [
    {
      question: 'Application',
      rows: [
        <Row idx={1}>
          <Col span={4} key={'a1'}>
            Application ID
          </Col>
          <Col span={8} key={'b1'}>
            {data.application_id}
          </Col>
        </Row>,
      ],
    },
    {
      question: 'Club details',
      rows: [
        <Row idx={1}>
          <Col span={4} key={'a'}>
            Name of Club
          </Col>
          <Col span={8} key={'b'}>
            <Input
              value={data.name}
              onChange={(e: any) =>
                saveHandler({ name: 'name', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        <Row idx={2}>
          <Col span={4} key={'a'}>
            Address
          </Col>
          <Col span={8} key={'b'}>
            <Input
              value={data.address}
              onChange={(e: any) =>
                saveHandler({ name: 'address', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        <Row idx={3}>
          <Col span={4}>Suburb</Col>
          <Col span={8}>
            <Input
              value={data.suburb}
              onChange={(e: any) =>
                saveHandler({ name: 'suburb', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        <Row idx={4}>
          <Col span={4}>Postcode</Col>
          <Col span={8}>
            <Input
              value={data.postcode}
              onChange={(e: any) =>
                saveHandler({ name: 'postcode', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        <Row idx={5}>
          <Col span={4}>Date of next AGM</Col>
          <Col span={8}>
            <DateUI
              value={data['agm-date']}
              onChange={(e: any) =>
                saveHandler({ name: 'agm-date', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        <Row idx={6}>
          <Col span={4}>Incorporation number</Col>
          <Col span={8}>
            <Input
              value={data['incorp-number']}
              onChange={(e: any) =>
                saveHandler({ name: 'incorp-number', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        <Row idx={7}>
          <Col span={4}>ABN/ACN</Col>
          <Col span={8}>
            <Input
              value={data.abn}
              onChange={(e: any) =>
                saveHandler({ name: 'abn', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
      ],
    },
    {
      question: 'Office bearers / contacts',
      rows: [
        <DynamicComponent
          component="DataGrid"
          filter={false}
          compact
          columns={[
            {
              name: 'Name',
              key: '{first_name} {last_name}',
            },
            {
              name: 'Role',
              key: 'role',
              badge: true,
            },
            {
              name: 'Actions',
              key: 'actions',
              sub: [
                {
                  component: 'Group',
                  sub: [
                    {
                      component: 'ModalButton',
                      icon: 'Edit',
                      compact: true,
                      tooltip: 'Edit contact',
                      sub: [
                        {
                          component: 'Form',
                          formId: 'office-bearer',
                          itemId: '{row.id}',
                        },
                      ],
                    },
                    {
                      component: 'DeleteButton',
                      compact: true,
                    },
                  ],
                },
              ],
            },
          ]}
          sub={
            !readOnly && [
              {
                component: 'Group',
                position: 'right',
                sub: [
                  {
                    component: 'ModalButton',
                    icon: 'Plus',
                    compact: undefined,
                    position: 'left',
                    text: 'Add contact',
                    tooltip: 'Add contact',
                    sub: [
                      {
                        component: 'Form',
                        formId: 'office-bearer',
                        itemId: 'new',
                        parent_id: data.parent_id,
                      },
                    ],
                  },
                ],
              },
            ]
          }
          position="bottom"
          endpoint={`d/office-bearer?parent_id=${data.parent_id}`}
        />,
      ],
    },
    {
      question: 'Group membership information',
      rows: (
        <MembershipInfo
          membershipInfo={membershipInfo}
          saveMembershipHandler={saveMembershipHandler}
          readOnly={readOnly}
        />
      ),
    },
    {
      question: 'Key register',
      rows: [
        <DynamicComponent
          component="DataGrid"
          filter={false}
          compact
          columns={[
            {
              name: 'Name',
              key: 'name',
            },
            {
              name: 'Phone',
              key: 'phone',
              badge: true,
            },
            {
              name: 'Mobile',
              key: 'mobile',
              badge: true,
            },
            {
              name: 'Actions',
              key: 'actions',
              sub: [
                {
                  component: 'Group',
                  sub: [
                    {
                      component: 'ModalButton',
                      icon: 'Edit',
                      compact: true,
                      tooltip: 'Edit contact',
                      sub: [
                        {
                          component: 'Form',
                          formId: 'key-register',
                          itemId: '{row.id}',
                        },
                      ],
                    },
                    {
                      component: 'DeleteButton',
                      compact: true,
                    },
                  ],
                },
              ],
            },
          ]}
          sub={
            !readOnly && [
              {
                component: 'Group',
                position: 'right',
                sub: [
                  {
                    component: 'ModalButton',
                    icon: 'Plus',
                    compact: undefined,
                    position: 'left',
                    text: 'Add key',
                    tooltip: 'Add key',
                    sub: [
                      {
                        component: 'Form',
                        formId: 'key-register',
                        itemId: 'new',
                        parent_id: data.parent_id,
                      },
                    ],
                  },
                ],
              },
            ]
          }
          position="bottom"
          endpoint={`d/key-register?parent_id=${data.parent_id}`}
        />,
        // <KeyRegister
        //   keyRegisters={keyRegisters}
        //   reloadKeyRegister={reloadKeyRegister}
        //   applicationId={applicationId}
        //   readOnly={readOnly}
        // />,
      ],
    },
    {
      question: 'Registered teams',
      rows: [
        <>
          <DataGrid
            endpoint={`d/team?parent_id=${data.parent_id}`}
            card_grid
            filter={false}
            columns={[
              {
                name: 'Team name',
                key: 'name',
              },
              {
                name: '# Teams',
                key: 'number',
              },
            ]}
            position="bottom"
          >
            <Group position="right">
              <ModalButton text="Add team" icon="plus">
                <Form
                  formId="team"
                  specific_id={applicationId}
                  parent_id={data.parent_id}
                />
              </ModalButton>
            </Group>
          </DataGrid>
        </>,
      ],
    },
    {
      question: 'Venue usage information',
      rows: (
        <VenueUsage
          saveUsageHandler={saveUsageHandler}
          addUsageHandler={addUsageHandler}
          deleteVenueUsageHandler={deleteVenueUsageHandler}
          usage={usage}
          assets={assets}
          readOnly={readOnly}
        />
      ),
    },
    {
      question: 'Compliance documentation',
      rows: (
        <Form
          layout="card"
          formId="compliance-docs"
          autosave
          hideSave
          parent_id={data.hirer_id}
          item_specific_id={data.hirer_id}
          specific_id={data.hirer_id}
        />
      ),
    },
    {
      question: 'Additional comments (to be included in the approval email)',
      rows: [
        <Row idx={1}>
          <Col span={12}>
            <Textarea
              value={data.comments}
              onChange={(e: any) =>
                saveHandler({ name: 'comments', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
      ],
    },
    // usage.length !== 0
    //   ? {
    //       question: 'Booking dates',
    //       rows: [
    //         <ModalButton icon="calendar" text="View booking dates">
    //           <BookingDates usage={usage} />
    //         </ModalButton>,
    //       ],
    //     }
    //   : {},
    {
      question: 'Additional details',
      rows: [
        <Row idx={1}>
          <Col span={4}>
            Does your club arrange for a coffee cart to attend match days?
          </Col>
          <Col span={8}>
            <YesNo
              value={data['coffee_cart']}
              onChange={(e: any) =>
                saveHandler({ name: 'coffee_cart', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        <Row idx={2}>
          <Col span={4}>
            Rubbish collection. Please select one of the following options:
          </Col>
          <Col span={8}>
            <Radios
              value={data['rubbish_collection']}
              onChange={(e: any) =>
                saveHandler({ name: 'rubbish_collection', value: e.value })
              }
              data={[
                'The club will pick up and remove rubbish after any club activity around our allocated reserve/s',
                "The club requests Council continue to pick up and remove rubbish after any club activity around our allocated Reserve. Therefore and additional rubbish collection charge will be added to the club's seasonal tenancy fees",
              ].map((label: string) => ({ label, value: label }))}
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        <Row idx={3}>
          <Col span={4}>Is your club a member of Good Sports?</Col>
          <Col span={8}>
            <YesNo
              value={data['good_sports']}
              onChange={(e: any) =>
                saveHandler({ name: 'good_sports', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        data.good_sports === 'Yes' && (
          <Row idx={4}>
            <Col span={4}>Good Sports club level?</Col>
            <Col span={8}>
              <Radios
                value={data['good_sports_level']}
                data={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                ]}
                onChange={(e: any) =>
                  saveHandler({ name: 'good_sports_level', value: e.value })
                }
                readOnly={readOnly}
              />
            </Col>
          </Row>
        ),
        <Row idx={5}>
          <Col span={4}>Healthy Promotions Initiatives?</Col>
          <Col span={8}>
            <YesNo
              value={data['healthy_promotions']}
              onChange={(e: any) =>
                saveHandler({ name: 'healthy_promotions', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        data.healthy_promotions === 'Yes' && (
          <Row idx={6}>
            <Col span={4}>Healthy Promotions Initiatives?</Col>
            <Col span={8}>
              <Textarea
                value={data['healthy_promotions_details']}
                onChange={(e: any) =>
                  saveHandler({
                    name: 'healthy_promotions_details',
                    value: e.value,
                  })
                }
                readOnly={readOnly}
              />
            </Col>
          </Row>
        ),
        <Row idx={7}>
          <Col span={4}>Inclusive programs?</Col>
          <Col span={8}>
            <YesNo
              value={data['inclusive']}
              onChange={(e: any) =>
                saveHandler({ name: 'inclusive', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        data.inclusive === 'Yes' && (
          <Row idx={8}>
            <Col span={4}>Inclusive programs details</Col>
            <Col span={8}>
              <Textarea
                value={data['inclusive_details']}
                onChange={(e: any) =>
                  saveHandler({
                    name: 'inclusive_details',
                    value: e.value,
                  })
                }
                readOnly={readOnly}
              />
            </Col>
          </Row>
        ),
        <Row idx={9}>
          <Col span={4}>Club pathway programs?</Col>
          <Col span={8}>
            <YesNo
              value={data['club_pathway']}
              onChange={(e: any) =>
                saveHandler({ name: 'club_pathway', value: e.value })
              }
              readOnly={readOnly}
            />
          </Col>
        </Row>,
        data.club_pathway === 'Yes' && (
          <Row idx={10}>
            <Col span={4}>Club pathway program details</Col>
            <Col span={8}>
              <Textarea
                value={data['club_pathway_details']}
                onChange={(e: any) =>
                  saveHandler({
                    name: 'club_pathway_details',
                    value: e.value,
                  })
                }
                readOnly={readOnly}
              />
            </Col>
          </Row>
        ),
      ],
    },
    {
      question: 'Terms and conditions',
      rows: <Terms />,
    },
  ]

  return (
    <>
      <div style={{ position: 'relative' }}>
        {season && (
          <h4 style={{ textAlign: 'center' }}>
            {season?.name}: <FormatDate date={season?.start_date} /> -{' '}
            <FormatDate date={season?.end_date} />
          </h4>
        )}
        <LoadingOverlay visible={loading} />
        <Form itemId={applicationId} formId="allocation" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* {topLevel
            .filter((top: any) => typeof top.question !== 'undefined')
            .map((top: any) => (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <FormHeading>{top.question}</FormHeading>
                {top.rows}
              </div>
            ))} */}
          {!readOnly && (
            <Group>
              {typeof data.completed !== 'undefined' ||
                (data.completed !== '1' && (
                  <Button
                    variant="success"
                    text="Complete"
                    onClick={completeHandler}
                  />
                ))}
            </Group>
          )}
        </div>
      </div>
    </>
  )
}

export default AllocationApplication

import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import Heading from '../../UI/Heading/Heading'
import InspectionIssues, { IssueCounts } from './InspectionIssues'
import InspectionLoadingSkeleton from './InspectionLoadingSkeleton'
import Stack from '../../UI/Stack/Stack'
import Group from '../../UI/Group/Group'
import Button from 'src/components/Form/Button/Button'
import ButtonGroup from 'src/components/Form/ButtonGroup/ButtonGroup'
import dayjs from 'dayjs'
import useRegistryQuery from 'src/hooks/useRegistryQuery'
import Text from 'src/components/UI/Text/Text'
import Confirm from 'src/components/Function/Confirm/Confirm'
import Action from 'src/components/Function/Action/Action'
import { useMediaQuery } from '@mantine/hooks'
import ModalButton from 'src/components/UI/ModalButton/ModalButton'
import useAssets from '../../../hooks/useAssets'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import Tooltip from 'src/components/UI/Tooltip/Tooltip'
import Toggle from 'src/components/Form/Toggle/Toggle'
import Card from 'src/components/UI/Card/Card'
import { complianceRating } from './complianceRating'
import ModalButtonForm from 'src/components/UI/ModalButtonForm/ModalButtonForm'
import FormatDate from 'src/components/Function/FormatDate/FormatDate'
import Alert from 'src/components/UI/Alert/Alert'
import { Skeleton } from '@mantine/core'
import DataGrid from 'src/components/UI/DataGrid/DataGrid'
import LoaderContent from 'src/components/UI/LoaderContent/LoaderContent'

function InspectionList() {
  const { get } = useAPI()

  const inspectionlist = useQuery(['inpections'], async () => {
    const results = await get({
      endpoint: 'asset-inspection?sort_by=label',
    })
    return results
  })

  if (inspectionlist.isLoading) {
    return <LoaderContent />
  }

  return (
    <DataGrid
      key={inspectionlist.data.length}
      queryOverride={inspectionlist}
      columns={[
        {
          name: 'Inspection',
          element: (row: any) => <Inspections asset={row} />,
        },
      ]}
      sorting={[
        { name: 'Venue (A-Z)', key: 'label', default: true },
        { name: 'Venue (Z-A)', key: 'label,desc' },
      ]}
      no_results={[
        {
          component: 'Alert',
          icon: 'Question',
          text: 'No inspections have been assigned',
        },
      ]}
      titleSub={[]}
    />
  )
}

export default InspectionList

function Inspections({ asset }: any) {
  const { get, put } = useAPI()
  const isMobile = useMediaQuery('(max-width: 677px)')
  const [complete, setComplete] = useState<any>([])
  const [incomplete, setIncomplete] = useState<any>([])
  const [view, setView] = useState('inspections')

  const { data: forms, isLoading } = useRegistryQuery({
    endpoint: 'form',
    category: 'checklist',
  })

  const {
    data: inspections,
    isLoading: inspLoading,
    refetch: refetchInspections,
  } = useQuery({
    queryKey: ['inspections', asset.id],
    queryFn: async () =>
      await get({
        endpoint: `d/inspection?specific_id=${asset.id}&withAuthor`,
      }),
  })

  const {
    data: nonCompliantItems,
    isLoading: ncLoading,
    refetch,
  } = useQuery({
    queryKey: ['compliance-details'],
    queryFn: async () =>
      await get({
        endpoint: `d/compliance-details?type=NC&sort_by=parent_id&withAuthor&withHirer`,
      }),
  })

  const deleteInspectionHandler = () => {
    refetchInspections()
  }

  const completeInspectionHandler = async (form: any, inspectionId: any) => {
    const inspection = await get({
      endpoint: `d/inspection/${inspectionId}`,
    })

    let unansweredQuestions: any = {}
    form.questions
      .filter(
        (question: any) =>
          typeof question.reference !== 'undefined' &&
          typeof inspection[question.reference] === 'undefined',
      )
      .map((question: any) => {
        unansweredQuestions = {
          ...unansweredQuestions,
          [question.reference]: 'N/O',
        }
        return
      })

    await put({ endpoint: `d/${inspectionId}`, data: unansweredQuestions })
    refetchInspections()
  }

  useEffect(() => {
    setIncomplete(
      inspections?.filter((insp: any) => (insp?.completed ?? 'No') === 'No'),
    )
    setComplete(
      inspections
        ?.filter((insp: any) => (insp?.completed ?? 'No') === 'Yes')
        .map((item: any) => {
          return { ...item, sortDate: new Date(item.completed_at) }
        })
        .sort((a: any, b: any) => b.sortDate - a.sortDate),
    )
  }, [nonCompliantItems, inspections])

  if (isLoading || ncLoading) {
    return <InspectionLoadingSkeleton />
  }

  return (
    <>
      <Group position="apart">
        <Heading>{asset.label}</Heading>
        <Toggle
          value={view}
          onChange={({ value }: any) => setView(value)}
          options={[
            {
              label: 'Inspections',
              value: 'inspections',
            },
            {
              label: 'History',
              value: 'history',
            },
          ]}
          required
        />
      </Group>
      {view === 'history' && (
        <Stack>
          {inspections?.length === 0 && (
            <Alert>No inspections have been completed</Alert>
          )}
          {asset['asset_forms']?.map((assetForm: any) => {
            const form = forms?.find((f: any) => f.id === assetForm.form_id)
            const formComplete =
              complete?.filter((f: any) => f.form_id === form?.reference) ?? []
            const details = formComplete?.map((insp: any) => {
              return (
                <Card key={insp.id}>
                  <Group style={{ fontSize: 14 }} position="apart">
                    <div>
                      <strong>Date: </strong>
                      <FormatDate date={insp.inspection_date} />
                      {insp.inspection_date !== insp.completed_at && (
                        <span>
                          <br />
                          <strong>Completed: </strong>
                          <FormatDate date={insp.completed_at} />
                        </span>
                      )}
                    </div>
                    <div>
                      <strong>Inspector: </strong>
                      {insp?.created_name}
                    </div>
                    <Group position="right">
                      <Tooltip withinPortal withArrow label="Compliance rating">
                        <span>{`${complianceRating([insp ?? []])}%`}</span>
                      </Tooltip>
                      <ModalButtonForm
                        tooltip="View inspection details"
                        formId={insp.form_id}
                        itemId={insp.id}
                        icon="Search"
                        readOnly
                        compactX
                      />
                    </Group>
                  </Group>
                </Card>
              )
            })
            return (
              <Card
                shadow="xs"
                radius="md"
                p="sm"
                key={assetForm.id}
                style={{ alignSelf: 'start' }}
              >
                <Stack>
                  <Heading size="h6">{form.name}</Heading>
                  {details}
                </Stack>
              </Card>
            )
          })}
        </Stack>
      )}
      {view !== 'history' && (
        <Group>
          {asset['asset_forms']?.map((assetForm: any) => {
            const form = forms?.find((f: any) => f.id === assetForm.form_id)
            const multi = form?.allow_multiple === 1
            const formIncomplete =
              incomplete?.filter((f: any) => f.form_id === form?.reference) ??
              []
            const formComplete =
              complete?.filter((f: any) => f.form_id === form?.reference) ?? []
            const issues = IssueCounts(nonCompliantItems, [
              ...formIncomplete,
              ...formComplete,
            ])
            const openIssues = issues[0]
            const completedIssues = issues[1]
            const openIssueCounts = `${openIssues?.length ?? 0} | ${
              completedIssues?.length ?? 0
            }`

            return (
              <Card
                shadow="xs"
                radius="md"
                p="sm"
                key={assetForm.id}
                style={{ alignSelf: 'start' }}
              >
                <Group position="apart" style={{ margin: 0, marginBottom: 2 }}>
                  <Heading size="h6">{form?.name}</Heading>
                  <ModalButton
                    size="55%"
                    text={inspLoading ? <Skeleton /> : openIssueCounts}
                    tooltip="View open and completed Issues"
                    disabled={
                      !(openIssues?.length ?? 0) &&
                      !(completedIssues?.length ?? 0)
                    }
                  >
                    <>
                      <Heading position="center">{`${asset.label} - issues`}</Heading>
                      <InspectionIssues
                        formId={form?.id}
                        open={openIssues}
                        completed={completedIssues}
                        onSaveHandler={refetch}
                      />
                    </>
                  </ModalButton>
                </Group>

                <div className="d-flex gap-2 text-break">
                  <Stack>
                    {formIncomplete?.map((inc: any) => {
                      const incompleteDate = ` ${dayjs(inc.created_at).format(
                        'D MMM YYYY h:mma',
                      )}`
                      return (
                        <ButtonGroup key={inc.id}>
                          <Button
                            variant="warning"
                            link={`/inspection/${inc.form_id}/${inc.id}`}
                            text={incompleteDate}
                            tooltip="Continue inspection"
                            style={{ minWidth: '175px' }}
                          />
                          <Confirm
                            icon="tick"
                            variant="primary"
                            title="Click OK to mark this inspection as completed.
                          If there are unanswered questions, all unanswered questions will be marked as not observed"
                            compactX={!isMobile}
                            tooltip="Mark inspection as complete"
                          >
                            <Action
                              action="update"
                              data={{
                                completed: 'Yes',
                                completed_at: dayjs(new Date()).format(
                                  'YYYY-MM-DD H:mm:ss',
                                ),
                                completed_by: 'me',
                              }}
                              endpoint={'d/' + inc.id}
                              after={() =>
                                completeInspectionHandler(form, inc.id)
                              }
                            />
                          </Confirm>
                          <Confirm
                            icon="delete"
                            variant="danger"
                            title="Are you sure you want to delete this incomplete inspection?"
                            compactX={!isMobile}
                            tooltip="Delete incomplete inspection"
                          >
                            <Action
                              action="delete"
                              endpoint={'d/' + inc.id}
                              after={deleteInspectionHandler}
                            />
                          </Confirm>
                        </ButtonGroup>
                      )
                    })}
                    {(!formIncomplete?.length || multi) && (
                      <DynamicComponent
                        component="NewFormButton"
                        type="inspection"
                        endpoint="d/inspection"
                        formId={form?.reference}
                        specific_id={asset.id}
                        parent_id={asset.id}
                        text={`Start new inspection`}
                        icon="Checklist"
                        variant="success"
                        style={{ minWidth: 250 }}
                        data={{
                          inspection_date: '{date::today}',
                        }}
                      />
                    )}
                    <Text size="xs">
                      {formComplete?.length > 0 ? (
                        <Group position="apart">
                          <div>
                            {`Last:
                          ${dayjs(formComplete[0]?.completed_at).format(
                            'D MMM YYYY h:mma',
                          )}
                          `}
                          </div>
                          <Tooltip
                            withinPortal
                            withArrow
                            label="Compliance rating (last completed inspection)"
                          >
                            <span>
                              {formComplete &&
                                `${complianceRating([formComplete[0] ?? []])}%`}
                            </span>
                          </Tooltip>
                        </Group>
                      ) : (
                        `No previous inspections`
                      )}
                    </Text>
                  </Stack>
                </div>
              </Card>
            )
          })}
        </Group>
      )}
    </>
  )
}

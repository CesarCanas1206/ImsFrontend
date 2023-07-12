import { useState, useEffect } from 'react'
import { Card, Grid } from '@mantine/core'
import Group from '../../UI/Group/Group'
import Form from 'src/components/Form/Form/Form'
import Text from 'src/components/UI/Text/Text'
import Confirm from 'src/components/Function/Confirm/Confirm'
import Action from 'src/components/Function/Action/Action'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import Heading from 'src/components/UI/Heading/Heading'
import FormHeading from 'src/components/Form/Form/formHeading/FormHeading'
import FormatDate from 'src/components/Function/FormatDate/FormatDate'
import useForm from '../../../hooks/useForm'
import Toggle from 'src/components/Form/Toggle/Toggle'
import Alert from 'src/components/UI/Alert/Alert'
import Stack from 'src/components/UI/Stack/Stack'
import dayjs from 'dayjs'
import Skeleton from 'src/components/UI/Skeleton/Skeleton'

export function IssueCounts(compliance: any[], inspections: any[]) {
  const open = compliance?.filter(
    (comp: any) => comp.type === 'NC' && (comp?.completed ?? 'No') === 'No',
  )
  const completed = compliance?.filter(
    (comp: any) => comp.type === 'NC' && (comp?.completed ?? 'No') === 'Yes',
  )

  const openIssues = open?.filter((o: any) => {
    return (
      inspections?.filter((i: any) => {
        return i.id === o.parent_id
      }).length === 1
    )
  })

  const completedIssues = completed?.filter((c: any) => {
    return (
      inspections?.filter((i: any) => {
        return i.id === c.parent_id
      }).length === 1
    )
  })

  return [openIssues, completedIssues]
}

interface IInspectionOpenIssues {
  formId?: any
  open?: any[]
  completed?: any[]
  onSaveHandler?: any
}

function ItemGridView(section: any, question: any, item: any, itemDetail: any) {
  return (
    <Card
      shadow="xs"
      style={{
        width: '100%',
        marginBottom: 5,
      }}
      radius="md"
      key={item.item_id}
    >
      <Grid>
        <Grid.Col md={6} lg={10}>
          <Text weight={700}>{section}</Text>
          <Text size="sm" color="light" weight={400}>
            {question}
          </Text>
        </Grid.Col>
        <Grid.Col md={6} lg={2}>
          <Group align="flex-start" position="right">
            <DynamicComponent
              component="ModalButton"
              props={{
                variant: 'primary',
                text: `#${item?.item_id}`,
                style: { minWidth: 100 },
                tooltip: 'View issue',
                children: (
                  <>
                    <Heading position="center">{section}</Heading>
                    <FormHeading>{question}</FormHeading>
                    {itemDetail}
                  </>
                ),
              }}
            />
          </Group>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col sm={12} lg={6}>
          <Grid>
            <Grid.Col sm={12}>
              <Text weight={700}>Issue</Text>
            </Grid.Col>
            <Grid.Col sm={12}>
              <Text size="sm" color="light" weight={400}>
                {item?.issue}
              </Text>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col sm={12} lg={3}>
          <Grid>
            <Grid.Col sm={12}>
              <Text weight={700}>Responsibility</Text>
            </Grid.Col>
            <Grid.Col sm={12}>
              <Text size="sm" color="light" weight={400}>
                {item?.responsibility_name ?? item?.responsibility_by ?? ''}
              </Text>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        {(item?.completed ?? 'No') === 'No' && (
          <Grid.Col sm={12} lg={2}>
            <Grid>
              <Grid.Col sm={12}>
                <Text weight={700}>Due date</Text>
              </Grid.Col>
              <Grid.Col sm={12}>
                <Text size="sm" color="light" weight={400}>
                  <FormatDate date={item?.due_date ?? ''} format="D MMM YYYY" />
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        )}
        {(item?.completed ?? 'No') === 'Yes' && (
          <Grid.Col sm={12} lg={2}>
            <Grid>
              <Grid.Col sm={12}>
                <Text weight={700}>Completion date</Text>
              </Grid.Col>
              <Grid.Col sm={12}>
                <Text size="sm" color="light" weight={400}>
                  <FormatDate
                    date={item?.completed_at ?? ''}
                    format="D MMM YYYY"
                  />
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        )}
        <Grid.Col sm={12} lg={1}>
          <Grid>
            <Grid.Col sm={12}>
              <Text weight={700}>Urgent</Text>
            </Grid.Col>
            <Grid.Col sm={12}>
              <Text size="sm" color="light" weight={400}>
                {item?.urgent ?? 'No'}
              </Text>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Card>
  )
}

function InspectionIssues({
  formId,
  open,
  completed,
  onSaveHandler,
}: IInspectionOpenIssues) {
  const [openIssues, setOpenIssues] = useState(open)
  const [completedIssues, setCompletedIssues] = useState(completed)
  const [issueCount, setIssueCount] = useState<number>(open?.length ?? 0)
  const [view, setView] = useState(open?.length ? 'open' : 'completed')

  const { data: form, isLoading: isFormLoading } = useForm({
    queryKey: ['form', String(formId), String(formId)],
    formId,
  })

  useEffect(() => {
    setOpenIssues(open)
    setCompletedIssues(completed)
  }, [open, completed])

  const markCompleteHandler = () => {
    setIssueCount(issueCount - 1)
    onSaveHandler()
  }

  if (isFormLoading) {
    return <Skeleton></Skeleton>
  }

  return (
    <>
      <Group position="right" style={{ marginBottom: 5 }}>
        <Toggle
          value={view}
          onChange={({ value }: any) => setView(value)}
          options={[
            {
              label: 'Open',
              value: 'open',
            },
            {
              label: 'Completed',
              value: 'completed',
            },
          ]}
          required
        />
      </Group>

      {view === 'open' && (
        <Stack>
          {(typeof openIssues === 'undefined' || openIssues?.length === 0) && (
            <Alert>No open issues</Alert>
          )}

          {openIssues?.map((item: any) => {
            const question = form.questions
              .filter((f: any) => f?.reference === item.item_ref)
              ?.map((a: any) => a.text)
            const section = form.questions
              .filter((f: any) => f?.reference === item.item_ref)
              .map((item: any) => {
                return item.parent_id
                  ? form.topQuestions
                      .filter((f: any) => f?.id === item.parent_id)
                      ?.map((a: any) => a.text)
                  : ''
              })

            const formProps = {
              formId: 'compliance-issue',
              query: { parent_id: item.parent_id, item_ref: item.item_ref },
              defaultValues: { type: item.type, item_ref: item.item_ref },
            }
            const itemDetail = (
              <>
                <Form {...formProps} autosave={true} hideSave={true} />
                <Group position="right">
                  <Confirm
                    text="Mark as completed"
                    icon="tick"
                    variant="primary"
                    title="Click OK to mark this issue as completed."
                    tooltip="Mark issue as complete"
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
                      endpoint={'d/compliance-detail/' + item.id}
                      after={markCompleteHandler}
                    />
                  </Confirm>
                </Group>
              </>
            )

            return ItemGridView(section, question, item, itemDetail)
          })}
        </Stack>
      )}
      {view === 'completed' && (
        <Stack>
          {(typeof completedIssues === 'undefined' ||
            completedIssues?.length === 0) && (
            <Alert>No completed issues</Alert>
          )}

          {completedIssues?.map((item: any) => {
            const question = form.questions
              ?.filter((f: any) => f?.reference === item.item_ref)
              ?.map((a: any) => a.text)
            const section = form.questions
              ?.filter((f: any) => f?.reference === item.item_ref)
              .map((item: any) => {
                return item.parent_id
                  ? form.topQuestions
                      .filter((f: any) => f?.id === item.parent_id)
                      ?.map((a: any) => a.text)
                  : ''
              })

            const formProps = {
              formId: 'compliance-issue',
              query: { parent_id: item.parent_id, item_ref: item.item_ref },
              defaultValues: { type: item.type, item_ref: item.item_ref },
            }

            const itemDetail = (
              <Form {...formProps} autosave={true} hideSave={true} readOnly />
            )

            return ItemGridView(section, question, item, itemDetail)
          })}
        </Stack>
      )}
    </>
  )
}

export default InspectionIssues

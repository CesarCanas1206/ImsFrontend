import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  Suspense,
} from 'react'
import FormContext from '../../../context/FormContext'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import { useQuery } from 'react-query'
import useAPI from '../../../hooks/useAPI'
import colStyles from '../../UI/Col/col.module.css'
import styles from './question.module.css'
import checkConditions from '../QuestionCondition/checkConditions'
import { isEmpty } from '../../../utilities/strings'
import ErrorBoundary from '../../../layout/ErrorBoundary/ErrorBoundary'
import { useMediaQuery } from '@mantine/hooks'
import HelpIcon from 'src/components/UI/HelpIcon/HelpIcon'

type QuestionTypes = {
  id: string
  component: string
  text: string
  form_props?: {
    questionWidth?: number | string
    question_width?: number | string
    answerWidth?: number | string
    answer_width?: number | string
    subChildren?: boolean | number | string
    sub_children?: boolean | number | string
    required?: boolean | string
    conditions?: string
    help?: string
    condition?: string
  }
  reference?: any
  endpoint?: string
  sub_section?: string | number
  props?: any | object
  otherProps?: any | object
  data?: any
  row?: any
  note?: any
}

let questionSavingQueue: any = {}

export function Question({
  id,
  component,
  form_props: formProps,
  reference,
  sub_section,
  text,
  props,
  row: sentRow,
  note,
}: QuestionTypes) {
  const {
    autosave,
    layout,
    values,
    changedValues,
    questions,
    changeHandler,
    saveHandler,
    readOnly,
    errors,
    row,
    mainId,
    isLoading,
    getValue,
    parent_id
  } = useContext(FormContext)
  const { get } = useAPI()
  const key =
    sub_section && sub_section !== ''
      ? `${reference}:${sub_section}`
      : reference

  const endpoint = props?.endpoint

  const { data: options, refetch: reloadData } = useQuery({
    queryKey: ['question', endpoint],
    queryFn: () => get({ endpoint }),
    select: (data: any) =>
      typeof data.map !== 'undefined'
        ? data.map((item: any) => ({
          label: item?.name ?? item.label,
          value: String(
            typeof props !== 'undefined' &&
              typeof props?.value_key !== 'undefined'
              ? item[props?.value_key ?? 'id']
              : item.id,
          ),
        }))
        : [],
    enabled: !isEmpty(endpoint),
  })

  const data =
    props?.options ??
    props?.data ??
    options ??
    (!isEmpty(endpoint)
      ? [
        {
          label: 'Loading options...',
          value: '',
        },
      ]
      : undefined)

  const questionChangeHandler = ({ value: val, ref }: any) => {
    const sendKey = ref ?? key
    changeHandler({ name: sendKey, val })

    switch (sendKey) {
      // used to set the end date if start date is set
      case 'start':
        if (!isEmpty(val) && isEmpty(getValue('end'))) {
          changeHandler({ name: 'end', val })
        }
        break
      case 'allday':
        if (!isEmpty(getValue('start'))) {
          const [startDate] = getValue('start').split(' ') ?? ['', '']
          changeHandler({
            name: 'start',
            val: `${startDate} ${val === 'Yes' ? '00:00' : ''}`,
          })
          changeHandler({
            name: 'end',
            val: `${startDate} ${val === 'Yes' ? '23:59' : ''}`,
          })
        }
        break
    }

    if (!autosave) {
      return
    }
    if (questionSavingQueue[sendKey]) {
      clearTimeout(questionSavingQueue[sendKey])
    }
    questionSavingQueue[sendKey] = setTimeout(() => {
      saveHandler(sendKey, val)
    }, 500)
  }

  const value = getValue(key)

  let questionWidth = Number(
    formProps?.questionWidth ?? formProps?.question_width ?? 4,
  )
  if (
    layout === 'table' ||
    isEmpty(text) ||
    ['FormSection', 'FormHeading', 'HasPermission'].includes(component)
  ) {
    questionWidth = 0
  }
  const answerWidth = Number(
    formProps?.answerWidth ?? formProps?.answer_width ?? 12 - questionWidth,
  )

  const subChildren = Boolean(
    formProps?.subChildren ?? formProps?.sub_children ?? false,
  )

  const required =
    (formProps?.required === true || formProps?.required === 'true') ?? false

  const childQuestions = useMemo(
    () => questions.filter((q: any) => q.parent_id === id),
    [questions, id],
  )

  const error = errors.find((err: string) =>
    Array.isArray(err) ? err[0] === reference : err === reference,
  )
  const displayErrors = error && (
    <div style={{ color: 'red' }}>
      {Array.isArray(error) ? error[1] : 'This field is required'}
    </div>
  )

  const hide = useMemo(
    () => !checkConditions({ conditions: formProps?.conditions, getValue }),
    [changedValues],
  )

  const dcProps = useMemo(
    () => ({
      readOnly,
      reference,
      text,
      ...props,
      component_name: component,
      value,
      data,
      parent_id,
      onChange: ({ value, ref }: any) => questionChangeHandler({ value, ref }),
      ...(['Select'].includes(component) ? { reloadData } : {}),
    }),
    [value, data, mainId, parent_id],
  )

  let answer: any = useMemo(
    () => (
      <ErrorBoundary>
        <DynamicComponent
          component={component}
          key={id}
          id={id}
          props={dcProps}
          row={{ form: values, ...(sentRow || row) }}
          sub={
            childQuestions.length !== 0 &&
            childQuestions?.map((child: any, idx: number) => (
              <Question
                key={child.id}
                {...child}
                row={{ ...(sentRow || row) }}
              />
            ))
          }
        />
      </ErrorBoundary>
    ),
    [values, dcProps, isLoading],
  )

  const isMobile = useMediaQuery('(max-width: 677px)')

  if (hide || component === 'Hidden') {
    return <></>
  }

  if (component === 'FormForEach') {
    ; (() => {
      if (typeof values === 'undefined') {
        answer = <>Loading items</>
        return
      }

      const items = values[dcProps.item]
      answer = items
        ?.sort((a: any, b: any) => a?.order - b?.order)
        ?.map((item: any, idx: number) => {
          return (
            <>
              {childQuestions?.map((child: any, idx: number) => (
                <Question key={child.id} isChild={true} {...child} row={item} />
              ))}
            </>
          )
        })
    })()
  }

  const hasQuestion = questionWidth !== 0

  const additionalStyles = {}
  const help = !isEmpty(formProps?.help) && <HelpIcon text={formProps?.help} />
  const outputText = hasQuestion && (
    <strong>
      {note}
      {text}
      {help}
      {required && !readOnly && '*'}
    </strong>
  )

  return (
    <Suspense fallback="">
      <div
        key={id}
        className={styles.questionRow}
        style={{
          display: 'flex',
          flexDirection:
            isMobile || (questionWidth === 12 && answerWidth === 12)
              ? 'column'
              : 'row',
          ...additionalStyles,
          ...(layout === 'card' && { justifyContent: 'space-between' }),
        }}
      >
        {isMobile || answerWidth === 0 || questionWidth === 0 || subChildren ? (
          <div style={{ width: '100%' }}>
            {questionWidth !== 0 && (
              <div className={colStyles.col12} key="label">
                {outputText}
              </div>
            )}
            <div
              className={colStyles.col12}
              key="answer"
              style={{
                display: 'flex',
                flexDirection:
                  isMobile || questionWidth === 0 ? 'column' : 'row',
                gap: '10px',
                ...additionalStyles,
                ...(layout === 'card' && { justifyContent: 'space-between' }),
              }}
            >
              {answer}
              {questionWidth === 0 && displayErrors}
            </div>
          </div>
        ) : (
          <>
            <label
              className={colStyles[`col${questionWidth}`]}
              key="label"
              style={{
                marginBottom:
                  isMobile || (questionWidth === 12 && answerWidth === 12)
                    ? '5px'
                    : 'inherit',
              }}
            >
              {outputText}
              {displayErrors}
            </label>
            <div className={colStyles[`col${answerWidth}`]} key="answer">
              {answer}
            </div>
          </>
        )}
      </div>
    </Suspense>
  )
}

export default Question

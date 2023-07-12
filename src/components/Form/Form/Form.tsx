import React, { useState, useContext, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAPI from '../../../hooks/useAPI'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import DataGridContext from '../../../context/DataGridContext'
import Question from '../Question/Question'
import CalendarContext from '../../../context/CalendarContext'
import FormContext from '../../../context/FormContext'
import ModalContext from '../../../context/ModalContext'
import { QuestionCondition } from '../QuestionCondition/QuestionCondition'

import { useQuery } from 'react-query'
import useWorkflow from '../../Function/Workflow/useWorkflow'
import Card from '../../UI/Card/Card'
import LoadingOverlay from '../../UI/LoadingOverlay/LoadingOverlay'
import { formSettings } from './formSettings'
import { isEmpty } from '../../../utilities/strings'
import useForm from '../../../hooks/useForm'
import { showNotification, updateNotification } from '@mantine/notifications'
import checkConditions from '../QuestionCondition/checkConditions'
import PageContext from 'src/context/PageContext'
import { VenuePreviewContext } from 'src/context/VenuePreviewContextProvider'

export const settings = formSettings
export type FormTypes = {
  formId?: string
  itemId?: string | number
  item_specific_id?: string
  specific_id?: string
  parent_id?: string
  item_parent_id?: string
  defaultValues?: object
  sentValues?: object | any
  valueNotes?: object | any
  autosave?: boolean | string
  printing?: boolean
  duplicate?: boolean | string
  readOnly?: boolean
  layout?: string
  headings?: boolean | string
  isLoading?: boolean | string
  hideSave?: boolean
  skipSave?: boolean
  showClose?: boolean
  save_button_text?: string
  save_button_icon?: string
  closeModal?: () => void
  onSave?: (props?: object) => void
  after_save_redirect?: string
  row?: any
  isInspection?: boolean
  query?: string | object
  previewMode?: boolean
  formOverRide?: object | any
}

export function Form({
  formId,
  itemId,
  item_specific_id,
  specific_id,
  parent_id,
  item_parent_id,
  defaultValues: initialValues,
  sentValues = {},
  valueNotes = {},
  autosave = false,
  printing = false,
  duplicate = 'false',
  readOnly: defaultReadOnly = false,
  layout,
  headings,
  hideSave,
  skipSave = false,
  showClose,
  closeModal,
  save_button_text = 'Save',
  save_button_icon = 'save',
  onSave,
  after_save_redirect,
  row,
  isInspection = false,
  query,
  formOverRide,
}: FormTypes) {
  const { state: previewState, setState: setPreviewState } =
    useContext(VenuePreviewContext)

  const [readOnly] = useState(!!defaultReadOnly)
  const [changedValues, setChangedValues] = useState<any>({
    ...(initialValues || {}),
  })
  const params = useParams<any>()
  if (
    isEmpty(itemId) &&
    !isEmpty(params.id) &&
    isEmpty(item_specific_id) &&
    isEmpty(item_parent_id)
  ) {
    itemId = params.id
  }

  const [mainId, setMainId] = useState(itemId && String(itemId))
  const [loadedItem, setLoadedItem] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { runWorkflow } = useWorkflow()

  const { reloadTable } = useContext(DataGridContext)
  const { reloadCalendar } = useContext<any>(CalendarContext)
  const { runAction } = useContext<any>(PageContext)
  const parentFormContext = useContext<any>(FormContext)
  const { onClose } = useContext(ModalContext)
  const navigate = useNavigate()

  if (isEmpty(formId) && !isEmpty(params.form_id) && isEmpty(formOverRide)) {
    formId = params.form_id
  }

  let form_id = formId
  if (
    (isEmpty(formId) || formId === 'form-question') &&
    typeof params.form_id !== 'undefined' &&
    isEmpty(formOverRide)
  ) {
    form_id = params.form_id
  }

  const [randomKey] = useState(!mainId ? Math.random() : 0)

  const { get, put, post } = useAPI()
  let formQueryKey: (string | number | undefined)[] = []

  const { data, isLoading: isFormLoading } = useForm({
    queryKey: ['form', String(form_id), String(formId)],
    formId,
    formOverRide,
  })

  let {
    form,
    questions: filteredQuestions,
    topQuestions,
  } = typeof data === 'undefined'
      ? { form: {}, questions: [], topQuestions: [] }
      : data

  const loadItem = async ({ queryKey }: any) => {
    if (!form.endpoint) {
      return {}
    }
    const formEndpoint = form.endpoint
    let endpoint = `${formEndpoint}/${queryKey[1]}`
    if (query) {
      const queryValues =
        typeof query === 'string'
          ? query
          : Object.entries(query)
            .map(([key, value]: any) => `${key}=${value}`)
            .join('&')
      if (queryValues.substring(0, 1) === '/') {
        endpoint = `${endpoint}?${queryValues.replace('/', '')}`
      } else {
        endpoint = `${formEndpoint}?${queryValues}`
      }
    } else if (queryKey[3]) {
      endpoint = `${formEndpoint}?parent_id=${queryKey[3]}`
    } else if (queryKey[2]) {
      endpoint = `${formEndpoint}?specific_id=${queryKey[2]}`
    }

    const initialValuesData = { ...(initialValues || {}) }

    if (queryKey[1] || queryKey[2] || queryKey[3] || query) {
      const getValues = await get({ endpoint })
      const tmpValues = getValues[0] || getValues
      const newValues = {
        ...params,
        ...tmpValues,
        ...initialValuesData,
        responses:
          typeof tmpValues.responses !== 'undefined'
            ? Object.fromEntries(
              tmpValues.responses.map((v: any) => [
                v.sub_section
                  ? `${v.reference}:${v.sub_section}`
                  : v.reference,
                v.value,
              ]),
            )
            : undefined,
      }
      if (!mainId || mainId === '') {
        setMainId(tmpValues.id)
      }
      setLoadedItem(true)
      setPreviewState(newValues)
      setChangedValues(initialValuesData)
      return newValues
    }
    setChangedValues(initialValuesData)
    return { ...params, ...initialValuesData, ...sentValues }
  }

  formQueryKey = [
    'data',
    mainId,
    item_specific_id,
    item_parent_id,
    form_id,
    parent_id,
    specific_id,
    randomKey,
  ]

  const {
    data: values,
    refetch: reloadFormItem,
    isLoading,
  } = useQuery<any>(formQueryKey, loadItem, {
    enabled: mainId !== 'new' && typeof form.endpoint !== 'undefined',
    // staleTime: !mainId && !item_specific_id ? 1 : 5 * 60 * 1000,
  })

  const changeFormValues = useCallback(({ name, val }: any) => {
    setPreviewState((prevState: any) => ({ ...prevState, [name]: val }))
    setChangedValues((prev: any) => {
      return { ...prev, [name]: val }
    })
  }, [])

  const formSaveValues = async (sentValues?: any) => {
    const saveData = { ...(sentValues ?? changedValues) }

    if (Object.keys(saveData)?.length === 0) {
      return
    }
    const alertOptions = {
      id: 'form-save',
      color: 'green',
      title: 'Saving...',
      message: '',
      autoClose: false,
      style: { width: 160 },
    }
    let result: any = {}
    showNotification({ ...alertOptions, loading: true, withCloseButton: false })
    let sendId = duplicate === 'true' ? '' : mainId
    if (!isEmpty(sendId) && sendId !== 'new') {
      await put({
        endpoint: `${form.endpoint}/${sendId}`,
        data: {
          ...saveData,
        },
      })
      result.id = sendId
    } else {
      result = await post({
        endpoint: form.endpoint,
        data: {
          parent_id,
          specific_id,
          ...saveData,
          form_id: form_id,
        },
      })
    }

    updateNotification({
      ...alertOptions,
      title: 'Saved!',
      icon: <DynamicComponent component="Icon" type="Tick" />,
      autoClose: 1000,
    })

    setMainId(result.id)
    sendId = result.id
    return sendId
  }

  const formSaveHandler = useCallback(
    async (after?: any, showErrors: boolean = true) => {
      const validation = await validate(filteredQuestions)
      if (showErrors) setErrors(validation)

      if (validation.length > 0) {
        return false
      }

      const run = async () => {
        let sendId: any = ''
        if (!skipSave) {
          sendId = await formSaveValues()
        }

        if (typeof runAction !== 'undefined') {
          runAction({ ref: 'DataGrid' })
        }
        if (typeof reloadTable !== 'undefined') {
          reloadTable()
        }
        if (typeof reloadCalendar !== 'undefined') {
          reloadCalendar()
        }
        if (typeof parentFormContext?.reloadFormItem !== 'undefined') {
          // parentFormContext.reloadFormItem()
        }
        if (after) {
          after()
        }
        if (typeof after_save_redirect !== 'undefined') {
          navigate(`${after_save_redirect}/${sendId}`)
        }

        if (closeModal) {
          closeModal()
        }

        if (typeof onSave !== 'undefined') {
          onSave({ id: sendId, ...changedValues })
        }

        if (typeof onClose !== 'undefined') {
          onClose()
        }
        runWorkflow({
          event: 'form.save',
          workflow: form?.workflow || [],
          id: sendId,
          data: { ...values, ...changedValues },
        })
      }
      run()
      return true
    },
    [filteredQuestions, changedValues, values],
  )

  const changeAndSubmit = useCallback(
    ({ name, val }: any) => {
      changeFormValues({ name, val })
      formSaveHandler()
    },
    [changeFormValues, formSaveHandler],
  )

  const saveHandler = useCallback(
    (name: any, val: any, ...other: any) => {
      if (Boolean(autosave) === false || !name) {
        return
      }

      const run = async () => {
        await formSaveValues({
          [name]: val,
        })
      }
      run()
    },
    [form, changedValues, mainId],
  )

  const validate = async (questions: any) => {
    let required: string[] = []

    const validateErrors: any = await runWorkflow({
      event: 'form.validate',
      workflow: form?.workflow || [],
      id: mainId,
      data: { ...values, ...changedValues },
    })

    required = [...required, ...(validateErrors ?? [])]

    questions.forEach((question: any) => {
      const formFieldValue = getFormValue(question.reference)
      if (
        !isEmpty(question?.form_props?.conditions) &&
        !checkConditions({
          conditions: question?.form_props?.conditions,
          getValue: getFormValue,
        })
      ) {
        return
      }

      if (
        typeof question.form_props === 'undefined' ||
        isEmpty(question.form_props?.required) ||
        !isEmpty(formFieldValue)
      ) {
        // check for start and end date references.
        if (
          formFieldValue &&
          typeof formFieldValue.split !== 'undefined' &&
          (question.reference === 'start' || question.reference === 'end') &&
          question.component === 'DateTime'
        ) {
          const [datePart, timePart] = formFieldValue?.split(' ') ?? ['', '']
          if (
            String(getFormValue('allday') ?? '') !== 'Yes' &&
            (typeof datePart === 'undefined' ||
              datePart === '' ||
              typeof timePart === 'undefined' ||
              timePart === '')
          ) {
            required = [...required, question.reference]
          }
        }
        return
      }

      required = [...required, question.reference]
    })
    return required
  }

  const getFormValue = (key: any) => {
    if (
      typeof changedValues !== 'undefined' &&
      typeof changedValues[key] !== 'undefined'
    ) {
      return changedValues[key]
    }
    if (typeof values !== 'undefined' && typeof values[key] !== 'undefined') {
      return values[key]
    }
    if (
      typeof sentValues !== 'undefined' &&
      typeof sentValues[key] !== 'undefined'
    ) {
      return sentValues[key]
    }

    return ''
  }

  const providerValue = useMemo(() => {
    return {
      autosave: Boolean(autosave),
      values: { ...(values ?? { ...(initialValues || {}) }), ...sentValues },
      questions: filteredQuestions,
      getValue: getFormValue,
      saveHandler,
      changeHandler: changeFormValues,
      changedValues,
      reloadFormItem,
      formSaveHandler,
      changeAndSubmit,
      readOnly,
      layout,
      formId,
      itemId,
      mainId,
      errors,
      row,
      loadedItem,
      isLoading,
      parent_id,
    }
  }, [
    autosave,
    values,
    errors,
    row,
    loadedItem,
    readOnly,
    filteredQuestions,
    changeFormValues,
    changedValues,
    reloadFormItem,
    formSaveHandler,
    changeAndSubmit,
    layout,
    formId,
    itemId,
    mainId,
    saveHandler,
    isLoading,
    getFormValue,
    parent_id,
  ])

  return (
    <FormContext.Provider value={providerValue}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          position: 'relative',
          minHeight: isLoading || isFormLoading ? 200 : 'auto',
        }}
      >
        <LoadingOverlay visible={isLoading || isFormLoading} />
        {/* Parent ID: {parent_id} */}
        {/* Specific ID: {specific_id} */}
        {/* ID: {mainId} */}
        {/* Row ID: {row.id} */}
        {/* Form ID: {form_id} */}

        {!isLoading && isInspection && (
          <DynamicComponent
            component="Row"
            sub={[
              <DynamicComponent
                key="save-buttons-top"
                component="InspectionButtons"
                onChange={saveHandler}
              />,
            ]}
          />
        )}
        {layout === 'table' && (
          <>
            <table>
              {headings !== false && headings !== 'false' && (
                <thead>
                  <tr>
                    {topQuestions?.map((question: any) => (
                      <QuestionCondition
                        key={question.id}
                        form_props={question.form_props}
                      >
                        <th>{question.text}</th>
                      </QuestionCondition>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                <tr>
                  {topQuestions?.map((question: any) => (
                    <QuestionCondition
                      key={question.id}
                      form_props={question.form_props}
                    >
                      <td>
                        <Question
                          key={loadedItem + question.id}
                          {...question}
                        />
                      </td>
                    </QuestionCondition>
                  ))}
                </tr>
              </tbody>
            </table>
          </>
        )}
        {layout === 'card' &&
          topQuestions?.map((question: any) => (
            <Card key={loadedItem + question.id}>
              <Question key={question.id} {...question} />
            </Card>
          ))}
        {layout !== 'table' &&
          layout !== 'card' &&
          topQuestions?.map((question: any) => (
            <Question
              key={loadedItem + question.id}
              {...question}
              note={
                typeof valueNotes !== 'undefined' &&
                  typeof valueNotes[question.reference] !== 'undefined'
                  ? valueNotes[question.reference]
                  : ''
              }
            />
          ))}
        {!readOnly && Boolean(hideSave) !== true && (
          <>
            <DynamicComponent
              key={'save-space'}
              component="Space"
              props={{ h: 'sm' }}
            />
            <DynamicComponent
              key={'save-group'}
              component="Group"
              position="right"
              sub={[
                <DynamicComponent
                  key="sub"
                  component="Button"
                  text={save_button_text}
                  icon={save_button_icon}
                  onClick={formSaveHandler}
                />,
                Boolean(showClose) && typeof onClose === 'function' && (
                  <DynamicComponent component="ModalClose" />
                ),
              ]}
            />
          </>
        )}
        {!isLoading && isInspection && (
          <DynamicComponent
            component="Row"
            sub={[
              <DynamicComponent
                key="save-buttons-bottom"
                component="InspectionButtons"
                onChange={saveHandler}
              />,
            ]}
          />
        )}
      </div>
    </FormContext.Provider>
  )
}

export default Form

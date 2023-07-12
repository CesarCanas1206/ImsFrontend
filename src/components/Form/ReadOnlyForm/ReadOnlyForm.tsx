import React, { useState, useContext, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import useAPI from '../../../hooks/useAPI'
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
import { formSettings } from '../Form/formSettings'
import { isEmpty } from '../../../utilities/strings'
import useForm from '../../../hooks/useForm'

export const settings = formSettings

export type FormTypes = {
  formId?: string
  itemId?: string | number
  item_specific_id?: string
  specific_id?: string
  parent_id?: string
  item_parent_id?: string
  defaultValues?: object
  valueNotes?: object | any
  autosave?: boolean | string
  printing?: boolean
  duplicate?: boolean | string
  readOnly?: boolean
  layout?: string
  headings?: boolean | string
  isLoading?: boolean | string
  hideSave?: boolean
  showClose?: boolean
  save_button_text?: string
  closeModal?: () => void
  onSave?: (props?: object) => void
  row?: any
  item?: any
}

export function ReadOnlyForm({
  formId,
  itemId,
  item_specific_id,
  specific_id,
  parent_id,
  item_parent_id,
  defaultValues: initialValues,
  valueNotes = {},
  autosave = false,
  printing = false,
  duplicate = 'false',
  readOnly: defaultReadOnly = true,
  layout,
  headings,
  hideSave,
  showClose,
  closeModal,
  save_button_text = 'Save',
  onSave,
  item: initialData,
  row,
}: FormTypes) {
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
  const parentFormContext = useContext<any>(FormContext)
  const { onClose } = useContext(ModalContext)
  // const queryClient = useQueryClient()

  if (isEmpty(formId) && !isEmpty(params.form_id)) {
    formId = params.form_id
  }

  let form_id = formId
  if (
    (typeof formId === 'undefined' ||
      formId === '' ||
      formId === 'form-question' ||
      formId === null) &&
    typeof params.form_id !== 'undefined'
  ) {
    form_id = params.form_id
  }

  const [randomKey] = useState(!mainId ? Math.random() : 0)

  const { get, put, post } = useAPI()
  let formQueryKey: (string | number | undefined)[] = []

  const { data, isLoading: isFormLoading } = useForm({
    queryKey: ['form', String(form_id), String(formId)],
    formId,
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
    if (queryKey[3]) {
      endpoint = `${formEndpoint}?parent_id=${queryKey[3]}`
    }
    if (queryKey[2]) {
      endpoint = `${formEndpoint}?specific_id=${queryKey[2]}`
    }

    const initialValuesData = { ...(initialValues || {}) }

    if (queryKey[1] || queryKey[2] || queryKey[3]) {
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
      setChangedValues(initialValuesData)
      return newValues
    }

    setChangedValues(initialValuesData)
    return { ...params, ...initialValuesData }
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
    initialData: initialData,
    enabled:
      isEmpty(initialData) &&
      mainId !== 'new' &&
      typeof form.endpoint !== 'undefined',
    // staleTime: !mainId && !item_specific_id ? 1 : 5 * 60 * 1000,
  })

  const changeFormValues = useCallback(({ name, val }: any) => {
    setChangedValues((prev: any) => {
      return { ...prev, [name]: val }
    })
  }, [])

  // const validate = (questions: any) => {
  //   let required: string[] = []
  //   questions.forEach((question: any) => {
  //     const formFieldValue = getFormValue(question.reference)
  //     if (
  //       typeof question.form_props === 'undefined' ||
  //       typeof question.form_props?.required === 'undefined' ||
  //       String(question.form_props?.required) !== 'true' ||
  //       (formFieldValue && formFieldValue !== '')
  //     ) {
  //       // check for start and end date references.
  //       if (question.reference === 'start' || question.reference === 'end') {
  //         const [datePart, timePart] = formFieldValue?.split(' ') ?? ['', '']
  //         if (
  //           String(getFormValue('allday') ?? '') !== 'Yes' &&
  //           (typeof datePart === 'undefined' ||
  //             datePart === '' ||
  //             typeof timePart === 'undefined' ||
  //             timePart === '')
  //         ) {
  //           required = [...required, question.reference]
  //         }
  //       }
  //       return
  //     }

  //     required = [...required, question.reference]
  //   })
  //   return required
  // }

  // const formSaveValues = async (sentValues?: any) => {
  //   let sendId = duplicate === 'true' ? '' : mainId
  //   if (!isEmpty(sendId) && sendId !== 'new') {
  //     await put({
  //       endpoint: `${form.endpoint}/${sendId}`,
  //       data: {
  //         ...(sentValues ?? changedValues),
  //       },
  //     })
  //     return sendId
  //   }
  //   const result = await post({
  //     endpoint: form.endpoint,
  //     data: {
  //       parent_id,
  //       specific_id,
  //       ...(sentValues ?? changedValues),
  //       form_id: form_id,
  //     },
  //   })
  //   setMainId(result.id)
  //   sendId = result.id
  //   return sendId
  // }

  // const formSaveHandler = useCallback(
  //   (after?: any) => {
  //     const validation = validate(filteredQuestions)
  //     setErrors(validation)
  //     if (validation.length > 0) {
  //       return false
  //     }
  //     const run = async () => {
  //       const sendId = await formSaveValues()
  //       if (typeof reloadTable !== 'undefined') {
  //         reloadTable()
  //       }
  //       if (typeof reloadCalendar !== 'undefined') {
  //         reloadCalendar()
  //       }
  //       if (typeof parentFormContext?.reloadFormItem !== 'undefined') {
  //         // parentFormContext.reloadFormItem()
  //       }
  //       if (after) {
  //         after()
  //       }
  //       if (closeModal) {
  //         closeModal()
  //       }

  //       if (typeof onSave !== 'undefined') {
  //         onSave({ id: sendId, ...changedValues })
  //       }
  //       if (typeof onClose !== 'undefined') {
  //         onClose()
  //       }
  //       runWorkflow({
  //         event: 'form.save',
  //         workflow: form?.workflow || [],
  //         id: sendId,
  //         data: { ...values, ...changedValues },
  //       })
  //     }
  //     run()
  //     return true
  //   },
  //   [filteredQuestions, changedValues, values],
  // )

  // const changeAndSubmit = useCallback(
  //   ({ name, val }: any) => {
  //     changeFormValues({ name, val })
  //     formSaveHandler()
  //   },
  //   [changeFormValues, formSaveHandler],
  // )

  // const saveHandler = useCallback(
  //   (name: any, val: any, ...other: any) => {
  //     if (Boolean(autosave) === false) {
  //       return
  //     }
  //     const run = async () => {
  //       await formSaveValues({
  //         [name]: val,
  //       })
  //     }
  //     run()
  //   },
  //   [form, changedValues, mainId],
  // )

  const getFormValue = (key: any) =>
    ((typeof changedValues !== 'undefined' && changedValues[key]) ||
      (typeof values !== 'undefined' && values[key]) ||
      '') ??
    ''

  // console.log(row, initialValues)

  const providerValue = useMemo(() => {
    return {
      autosave: Boolean(autosave),
      values: values ?? { ...(initialValues || {}) },
      questions: filteredQuestions,
      getValue: getFormValue,
      // saveHandler,
      changeHandler: changeFormValues,
      changedValues,
      reloadFormItem,
      // formSaveHandler,
      // changeAndSubmit,
      readOnly,
      layout,
      formId,
      itemId,
      mainId,
      errors,
      row,
      loadedItem,
      isLoading,
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
    // formSaveHandler,
    // changeAndSubmit,
    layout,
    formId,
    itemId,
    mainId,
    // saveHandler,
    isLoading,
    getFormValue,
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
        {/* {!readOnly && Boolean(hideSave) !== true && (
          <>
            <DynamicComponent key={'save-space'} component="Space" h="sm" />
            <DynamicComponent
              key={'save-group'}
              component="Group"
              position="right"
              sub={[
                <DynamicComponent
                  key={'sub'}
                  component="Button"
                  text={save_button_text}
                  icon="save"
                  onClick={formSaveHandler}
                />,
                Boolean(showClose) && typeof onClose === 'function' && (
                  <DynamicComponent key={'close'} component="ModalClose" />
                ),
              ]}
            />
          </>
        )} */}
      </div>
    </FormContext.Provider>
  )
}

export default ReadOnlyForm

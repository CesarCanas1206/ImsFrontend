import { useContext } from 'react'
import { useQuery } from 'react-query'
import PageContext from '../context/PageContext'
import { isEmpty, uuid } from '../utilities/strings'
import useAPI from './useAPI'

const formRegistry = () => import('../registry/formRegistry')

function useForm({
  formId,
  queryKey,
  options,
  readOnly = false,
  formOverRide,
}: any) {
  const { get } = useAPI()
  const { forms: formList } = useContext(PageContext)

  const loadForm = async () => {
    const formRegistryItems: any = (await formRegistry()).default

    const checkFormRegistry = {
      ...formRegistryItems.find((check: any) => check.reference === formId),
    }

    let loadForm: any = {}

    const loadedForm = formList?.includes(formId)
      ? await get({ endpoint: `f/${formId}` })
      : formOverRide ?? null

    loadForm =
      loadedForm && typeof loadedForm.questions !== 'undefined'
        ? loadedForm
        : checkFormRegistry

    const formProps =
      (typeof loadForm?.props !== 'undefined' &&
        typeof loadForm?.props === 'string' &&
        JSON.parse(loadForm?.props)) ??
      {}
    const formPropsRequired = (formProps && formProps?.required) ?? false

    const filteredQuestions = loadForm.questions
      ?.filter(
        (q: any) =>
          typeof q.show_form === 'undefined' ||
          (!readOnly && q.show_form === 1) ||
          (readOnly && q.show_report === 1),
      )
      ?.sort((a: any, b: any) =>
        a?.question_order && a?.question_order !== 0
          ? Number(a?.question_order) > Number(b?.question_order)
            ? 1
            : -1
          : null,
      )
      .map((q: any) => ({
        id: uuid(),
        ...q,
        form_props: {
          ...formProps,
          required:
            q.component === 'FormSection' || !formPropsRequired ? false : true,
          ...(q.form_props ?? {}),
        },
      }))

    const topQuestions = filteredQuestions?.filter((q: any) =>
      isEmpty(q.parent_id),
    )

    delete loadForm.questions

    return { form: loadForm, questions: filteredQuestions, topQuestions }
  }

  const data = useQuery<any>(queryKey ?? ['form', String(formId)], loadForm, {
    ...options,
  })

  return {
    data: data.data,
    isLoading: data.isLoading,
    refetch: data.refetch,
  }
}

export default useForm

import Question from '../Question/Question'
import LoadingOverlay from '../../UI/LoadingOverlay/LoadingOverlay'
import useForm from '../../../hooks/useForm'

function SubForm({ formId }: any) {
  const { data, isLoading: isFormLoading } = useForm({
    queryKey: ['form', String(formId)],
    formId,
  })

  let {
    form,
    questions: filteredQuestions,
    topQuestions,
  } = typeof data === 'undefined'
    ? { form: {}, questions: [], topQuestions: [] }
    : data

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          position: 'relative',
          minHeight: isFormLoading ? 200 : 'auto',
        }}
      >
        <LoadingOverlay visible={isFormLoading} />
        {topQuestions?.map((question: any) => (
          <Question key={question.id} {...question} />
        ))}
      </div>
    </>
  )
}

export default SubForm

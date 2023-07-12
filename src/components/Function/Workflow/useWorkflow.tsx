import useAPI from 'src/hooks/useAPI'
import workflowRegistry from '../../../registry/workflowRegistry'
import { isEmpty } from 'src/utilities/strings'

export interface IWorkflow {
  event: string
  workflow?: object[]
  id?: string | number
  data?: object
}

function useWorkflow() {
  const { post } = useAPI()

  const runWorkflow = async ({ event, workflow, data, id }: IWorkflow) => {
    if (!workflow || !workflow.length) {
      return
    }
    console.log(event, workflow)
    const workflows = workflowRegistry.filter((wf: any) =>
      workflow.includes(wf.reference),
    )

    console.log(`running event ` + event)

    const promises = workflows.map((flow: any) => {
      return new Promise(async (resolve1, reject) => {
        const results = await Promise.all(
          flow.workflow.map(async (wf: any) => {
            return new Promise(async (resolve, reject) => {
              let result: any = true
              switch (wf.action) {
                case 'refreshPage':
                  window.location.reload()
                  break
                case 'createEvents':
                  console.log(wf.action, data, id)
                  break
                case 'validateEmail':
                  const response = await post({
                    endpoint: 'validate-email',
                    getData: false,
                    data: {
                      email: data?.email,
                      id: data?.id,
                    },
                  })
                  if (response.status === 'error') {
                    result = ['email', 'The email address is already in use']
                  }
                  break
                case 'validateUsage':
                  if (isEmpty(data?.shared)) {
                    const response2 = await post({
                      endpoint: 'check/clash',
                      data,
                    })
                    if (response2.length > 0) {
                      result = [
                        'date',
                        'This date/time clashes with another event',
                        response2,
                      ]
                    }
                  }
                  break
                default:
              }
              resolve(result)
            })
          }),
        )
        resolve1(results.flat().filter((i: any) => i !== true))
      })
    })

    const results: any = await Promise.all(promises)

    if (!results[0].length) {
      return []
    }

    return results
  }

  return {
    runWorkflow,
  }
}

export default useWorkflow

import React, { useContext, useEffect, useState } from 'react'
import useAPI from '../../../hooks/useAPI'
import DC from '../../DynamicComponent/DC'
import FormContext from '../../../context/FormContext'

export function JobListing({ span, className, style, children, sub }: any) {
  const { values } = useContext(FormContext)
  const [results, setResults] = useState<any>([])
  const { get } = useAPI()
  const { responses } = values

  useEffect(() => {
    const run = async () => {
      if (values?.jobs || (responses?.jobs && responses?.jobs !== '')) {
        const jobs = (values.jobs ?? responses.jobs).split(',')
        const tmpResults = await Promise.all(
          jobs.map((jobId: any) => {
            return get({
              endpoint: `collection/job/${jobId}`,
            })
          }),
        )

        setResults(tmpResults)
      }
    }
    run()
  }, [])

  return (
    <div
      className={`col d-flex ${className || ''} ${
        span !== '' ? `col-sm-${span}` : ''
      } col-12 flex-column`}
    >
      {sub}
      {results.map((job: any) => (
        <div key={job.id}>
          <DC
            key="c"
            component="Callout"
            sub={[
              <DC
                key="a"
                component="Group"
                props={{ position: 'apart' }}
                sub={[
                  <>
                    <div>
                      <div>
                        #{job.id} {job.client?.name}
                      </div>
                      <div>
                        <small>{job.form?.name}</small>
                      </div>
                      <small>
                        <DC
                          key="f"
                          component="FormatDate"
                          props={{ text: job.start_date }}
                        />
                        {' - '}
                        <DC
                          key="f2"
                          component="FormatDate"
                          props={{ text: job.end_date }}
                        />
                      </small>
                    </div>
                  </>,
                  <DC
                    key="button"
                    component="ModalButton"
                    props={{
                      text:
                        job.signature && job.signature !== ''
                          ? 'Edit'
                          : 'Start',
                    }}
                    sub={[
                      <DC
                        key="form"
                        component="Form"
                        props={{ formId: job.form_id, itemId: job.id }}
                      />,
                    ]}
                  />,
                ]}
              />,
            ]}
          />
        </div>
      ))}
      {children}
    </div>
  )
}

export default JobListing

import React, { useContext, useEffect, useState } from 'react'
import useAPI from '../../../hooks/useAPI'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import FormContext from '../../../context/FormContext'
import Question from '../../Form/Question/Question'
import QuestionCondition from '../../Form/QuestionCondition/QuestionCondition'
import { Icon } from '../../UI/Icon/Icon'

function CompletedStatus({ children, questions, sub_section }: any) {
  const { values } = useContext(FormContext)

  if (typeof values?.responses === 'undefined' || values?.responses === null) {
    return children(false)
  }

  const questionIds = questions.map(
    (question: any) => `${question.reference}:${sub_section}`,
  )
  const checkCompleted =
    (values?.responses &&
      Object.keys(values?.responses).filter((response: any) =>
        questionIds.includes(response),
      ).length !== 0) ||
    Object.keys(values).filter((response: any) =>
      questionIds.includes(response),
    ).length !== 0

  return children(checkCompleted)
}

export function AssetRepeating({ questions, readOnly, ...props }: any) {
  const [assets, setAssets] = useState([])
  const { values } = useContext(FormContext)
  const { get } = useAPI()

  const asset_type_id =
    values.assets || values.responses?.assets || props.asset_type_id || ''

  const endpoint = `asset?id=[${asset_type_id}]`

  useEffect(() => {
    const run = async () => {
      setAssets(
        await get({
          endpoint,
        }),
      )
    }
    run()
  }, [])

  if (readOnly) {
    return (
      <>
        {assets.map((asset: any) => (
          <div key={asset.id}>
            <div
              style={{
                borderBottom: '1px solid #ccc',
                fontWeight: 'bold',
                padding: '10px 3px',
              }}
              className="mb-1"
            >
              {asset.name}
            </div>
            {questions?.map((child: any) => (
              <QuestionCondition
                key={child.id}
                {...child}
                sub_section={asset.id}
              >
                <Question key={child.id} {...child} sub_section={asset.id} />
              </QuestionCondition>
            ))}
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {assets.map((asset: any) => (
        <div
          style={{
            borderBottom: '1px solid #ccc',
            padding: '10px 3px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          key={asset.id}
          className="mb-1"
        >
          {asset.name}
          <div>
            <CompletedStatus questions={questions} sub_section={asset.id}>
              {(completed: boolean) => (
                <>
                  {completed && <Icon type="tick" style={{ color: 'green' }} />}
                  {!completed && <Icon type="close" style={{ color: 'red' }} />}
                  <DynamicComponent
                    component="ModalButton"
                    props={{ text: completed ? 'Edit' : 'Start' }}
                    sub={questions?.map((child: any) => (
                      <QuestionCondition
                        key={child.id}
                        {...child}
                        sub_section={asset.id}
                      >
                        <Question
                          key={child.id}
                          {...child}
                          sub_section={asset.id}
                        />
                      </QuestionCondition>
                    ))}
                  />
                </>
              )}
            </CompletedStatus>
          </div>
        </div>
      ))}
    </>
  )
}

export default AssetRepeating

import React from 'react'
import SimpleGrid from 'src/components/UI/SimpleGrid/SimpleGrid'
import { useMediaQuery } from '@mantine/hooks'
import colStyles from '../../UI/Col/col.module.css'
import styles from '../../Form/Question/question.module.css'
import { isEmpty } from 'src/utilities/strings'
import HelpIcon from 'src/components/UI/HelpIcon/HelpIcon'

interface IQuestionSimple {
  note?: string
  label?: string
  children?: React.ReactNode
  props?: any
}

function QuestionSimple({
  note,
  label,
  children,
  props = {},
}: IQuestionSimple) {
  const isMobile = useMediaQuery('(max-width: 677px)')

  let questionWidth = Number(props?.questionWidth ?? props?.question_width ?? 4)
  const answerWidth = Number(
    props?.answerWidth ?? props?.answer_width ?? 12 - questionWidth,
  )

  const colWidthText = isMobile
    ? colStyles.col12
    : colStyles[`col${questionWidth}`]
  const colWidthAnswer = isMobile
    ? colStyles.col12
    : colStyles[`col${answerWidth}`]

  const hasQuestion = questionWidth !== 0

  const additionalStyles = {}
  const help = !isEmpty(props?.help) && <HelpIcon text={props?.help} />
  const outputText = hasQuestion && (
    <strong>
      {note}
      {label}
      {help}
      {props.required && !props.readOnly && '*'}
    </strong>
  )
  return (
    <div
      key={label}
      className={styles.questionRow}
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {isMobile ? (
        <>
          <div style={{ width: '100%' }}>
            <div className={colWidthText} key="label">
              {outputText}
            </div>
            <div className={colWidthAnswer} key="answer">
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <label
            className={colWidthText}
            key="label"
            style={{
              marginBottom: isMobile ? '5px' : 'inherit',
            }}
          >
            {outputText}
          </label>
          <div className={colWidthAnswer} key="answer">
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export default QuestionSimple

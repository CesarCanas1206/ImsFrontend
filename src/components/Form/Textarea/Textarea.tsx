import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Textarea as TextareaUI, TextareaProps } from '@mantine/core'
import { nl2br } from '../../../utilities/strings'

export interface ITextarea extends TextareaProps {
  onChange?: (params?: object) => void
  value?: string
  readOnly?: boolean
  minRows?: number
}

export function Textarea({
  onChange,
  value,
  readOnly = false,
  minRows = 4,
  ...props
}: ITextarea) {
  const [cursor, setCursor] = useState(null)
  const ref = useRef<any>(null)
  const changeHandler = (e: any) => {
    setCursor(e.target.selectionStart)
    if (typeof onChange !== 'undefined') {
      onChange({ ...e.target })
    }
  }

  useEffect(() => {
    if (readOnly || value === '') {
      return
    }
    const input = ref.current
    if (input) input.setSelectionRange(cursor, cursor)
  }, [ref, cursor, value])

  const loadValue = useMemo(
    () => (typeof value !== 'string' ? JSON.stringify(value) : value),
    [value],
  )

  if (readOnly) {
    return <>{nl2br(loadValue)}</>
  }

  return (
    <TextareaUI
      ref={ref}
      radius="md"
      onChange={changeHandler}
      minRows={minRows}
      value={loadValue}
      style={{ resize: 'vertical' }}
      {...props}
    />
  )
}

export default Textarea

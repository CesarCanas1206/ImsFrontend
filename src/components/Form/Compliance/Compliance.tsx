import { useMemo, useState, useContext } from 'react'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import Heading from 'src/components/UI/Heading/Heading'
import FormHeading from '../Form/formHeading/FormHeading'
import useAPI from 'src/hooks/useAPI'
import { useQuery } from 'react-query'
/**
 * Compliance
 * Display compliance buttons and save the values for the buttons in the reference
 * Any additional details, Compliance (C) or Not compliance, are saved in a
 * new collection and collection_fields
 *
 * TODO
 *  - not compliant - responsibility to come from hirers who are linked to the
 * asset or from an internal user.
 *  - delete image(s) on change of compliance.
 *  - add mulitple images
 * - mark as complete, set status of question to 6 for all unaswered questions
 *
 * @param props
 * @returns
 */
export function Compliance(props: any) {
  const { get, put } = useAPI()

  const id = props.id || props.row?.form?.id
  // console.log(props)

  const { data: itemDetails, isLoading } = useQuery({
    queryKey: ['inspection', id, props.reference],
    queryFn: async () =>
      await get({
        endpoint: `d/compliance-details?parent_id=${id}&item_ref=${props.reference}`,
      }),
  })

  const clickHandler = async (value: any) => {
    if (props.readOnly) return
    if (typeof props.onChange !== 'undefined' && props.value !== value) {
      props.onChange({ value })
    }

    if (value !== props.value) {
      if (itemDetails?.length) {
        const detail = itemDetails[0]
        let data: any = []
        switch (value) {
          case 'NC':
            data = {
              comment: '',
            }
            break
          case 'CC':
            data = {
              urgent: 'No',
              issue: '',
              action: '',
              due_date: '',
              responsibility_by: '',
            }
            break
          default:
            data = {
              urgent: 'No',
              issue: '',
              action: '',
              due_date: '',
              responsibility_by: '',
              comment: '',
              type: '',
            }
        }
        await put({ endpoint: `d/${detail.id}`, data: data })
        // if (detail.photo) {
        //   await doDelete({ endpoint: `d/${detail.id}` })
        // }
      }
    }
  }

  /**
   * Items
   * Status values
   * 1 - not used (was urgent, but now replaced with 'urgent' property )
   * 2 - Not compliant - NC
   * 3 - Not applicable - N/A
   * 4 - Compliant - C
   * 5 - Compliant with comments - CC
   * 6 - Not observed - N/O - inspection is marked complete and all unanswered questions are marked as not observered
   */
  const items = [
    {
      text: 'Not compliant',
      value: 'NC', //2
      variant: 'danger',
      icon: 'Warning',
      modal: true,
    },
    {
      text: 'Not applicable',
      value: 'N/A', //3
      icon: 'Cancel',
      variant: 'info',
    },
    {
      text: 'Compliant',
      value: 'C', //4
      icon: 'Tick',
      variant: 'success',
    },
    {
      text: 'Compliant (C)',
      value: 'CC', //5
      icon: 'Comment',
      variant: 'success',
      modal: true,
    },
  ]

  const defaultValues = {
    type: props.value,
    item_ref: props.reference,
    ...(!(itemDetails?.length ?? 0) && props.value === 'NC'
      ? { 'ai::item_id': 0, urgent: 'No' }
      : {}),
  }

  const modalButtonFormProps = {
    formId: 'compliance-details',
    item_parent_id: props.form_id,
    parent_id: props.id,
    defaultValues: defaultValues,
    query: { parent_id: props.id, item_ref: props.reference },
    itemId: itemDetails?.[0]?.id ?? 'new',
  }

  const buttons = useMemo(
    () => [
      ...items.map((item: any) => ({
        component: item.modal && !props.readOnly ? 'ModalButtonForm' : 'Button',
        props: {
          variant: item.variant ?? 'danger',
          position: 'top',
          icon: item.icon ?? 'warning',
          text: item.text ?? 'Not compliant',
          onClick: () => clickHandler(item.value),
          outline: props.value !== item.value,
          active: props.value === item.value,
          disabled: props.value !== item.value ? props.readOnly : undefined,
          children: (
            <>
              <Heading position="center">{item.text}</Heading>
              <FormHeading>{props.text}</FormHeading>
            </>
          ),
          key: item.value,
          ...(item.modal ? modalButtonFormProps : {}),
        },
      })),
      !isLoading &&
        itemDetails?.length !== 0 &&
        props.readOnly && {
          component: 'ModalButtonForm',
          icon: props.readOnly ? 'Search' : 'Edit',
          tooltip: 'View details',
          formId: 'compliance-details',
          itemId: itemDetails?.[0]?.id,
          readOnly: props.readOnly,
          defaultValues: { type: props.value },
          compactX: props.readOnly,
          children: <FormHeading>{props.text}</FormHeading>,
        },
    ],
    [props.value, isLoading],
  )
  return (
    <>
      <DynamicComponent component="Group" sub={buttons} />
    </>
  )
}

export default Compliance

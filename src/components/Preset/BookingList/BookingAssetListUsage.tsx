import React, { useContext, useState } from 'react'
import Heading from 'src/components/UI/Heading/Heading'
import Form from 'src/components/Form/Form/Form'
import FormContext from 'src/context/FormContext'
import Stack from 'src/components/UI/Stack/Stack'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'
import QuestionSimple from 'src/components/Form/Question/QuestionSimple'
import Group from 'src/components/UI/Group/Group'
import Button from 'src/components/Form/Button/Button'
import AppContext from 'src/context/AppContext'

function BookingAssetListUsage({ asset, onClose }: any) {
  const { siteName } = useContext(AppContext)

  const formSubmitHandler = (saveData: any) => {
    const key = `${siteName}-usage`
    let localData = JSON.parse(localStorage.getItem(key) || '[]')
    localData.push(saveData)
    localStorage.setItem(key, JSON.stringify(localData))
    onClose()
  }

  // const fields = [
  //   {
  //     label: 'Booking description',
  //     reference: 'title',
  //     component: 'Input',
  //     form_props: { required: true },
  //   },
  //   {
  //     label: 'Number attending',
  //     reference: 'attending',
  //     component: 'Input',
  //   },
  //   {
  //     label: 'Date',
  //     component: 'Date',
  //     reference: 'date',
  //     props: { minDate: 'today' },
  //     form_props: { required: true },
  //   },
  //   {
  //     label: 'Start/End',
  //     component: 'TimeRangePublic',
  //   },
  //   // {
  //   //   label: 'Repeating',
  //   //   component: 'RepeatEvent',
  //   // },
  // ]

  // return (
  //   <div>
  //     <Stack>
  //       <Heading>{asset.label}</Heading>
  //       {fields.map((field: any) => {
  //         if (Object.keys(field).length === 0) {
  //           return <></>
  //         }
  //         return field.component === 'FormHeading' ||
  //           typeof field.label === 'undefined' ? (
  //           <DynamicComponent
  //             component={field.component}
  //             onChange={({ value, ref }: any) =>
  //               changeHandler({
  //                 type: field.type ?? 'data',
  //                 value,
  //                 reference: ref ?? field.reference,
  //               })
  //             }
  //             {...field.props}
  //           />
  //         ) : (
  //           <QuestionSimple key={field.label} label={field.label}>
  //             <div>
  //               <DynamicComponent
  //                 component={field.component}
  //                 onChange={({ value, ref }: any) =>
  //                   changeHandler({
  //                     type: field.type ?? 'data',
  //                     value,
  //                     reference: ref ?? field.reference,
  //                   })
  //                 }
  //                 {...{
  //                   value: data?.[field.reference] ?? '',
  //                   [field.reference]: data?.[field.reference] ?? '',
  //                   ...(field.props ?? {}),
  //                 }}
  //               />
  //             </div>
  //           </QuestionSimple>
  //         )
  //       })}
  //       <Group position="right">
  //         <Button icon="Save" text="Save" onClick={formSubmitHandler} />
  //       </Group>
  //     </Stack>
  //   </div>
  // )

  return (
    <div>
      <Heading>{asset.label}</Heading>
      <Form
        formId="casualusage-public"
        itemId="new"
        save_button_icon="save"
        save_button_text="Save"
        defaultValues={{
          asset_id: asset.id,
          title: asset.name ?? '',
        }}
        onSave={(saveData: any) => {
          formSubmitHandler(saveData)
        }}
        skipSave
      ></Form>
    </div>
  )
}

export default BookingAssetListUsage

import { useParams } from 'react-router-dom'
import DynamicComponent from 'src/components/DynamicComponent/DynamicComponent'

function FormQuestion() {
  const params = useParams()
  const form_id = params.form_id

  return (
    <DynamicComponent
      component="DataGrid"
      endpoint={`form/${form_id}/question`}
      columns={[
        { name: 'Id', key: 'id', title: true },
        { name: 'Parent id', key: '{parent_id}', title: true },
        {
          name: 'Question/text',
          key: '{text || props.text || component}',
          feature: true,
        },
        { name: 'Reference', key: 'reference', title: true, badge: true },
        { name: 'Type', key: 'component', title: true, badge: true },
        { name: 'Order', key: 'question_order', title: true, badge: true },
        {
          name: 'Actions',
          key: 'action',
          element: (row: any) => {
            return (
              <DynamicComponent
                component="Group"
                sub={[
                  {
                    component: 'ModalButton',
                    text: '',
                    icon: 'edit',
                    sub: [
                      {
                        component: 'Form',
                        formId: 'form-question',
                        itemId: row.id,
                      },
                    ],
                  },
                  {
                    component: 'Confirm',
                    text: '',
                    title: 'Are you sure you want to delete this?',
                    tooltip: 'Delete',
                    variant: 'danger',
                    icon: 'delete',
                    sub: [
                      {
                        component: 'Action',
                        props: {
                          action: 'delete',
                          endpoint: `form-question/${row.id}`,
                        },
                      },
                    ],
                  },
                ]}
              />
            )
          },
          sub: [
            {
              component: 'Group',
              sub: [
                {
                  component: 'ModalButton',
                  text: '',
                  icon: 'edit',
                  sub: [
                    {
                      component: 'Form',
                      formId: 'form-question',
                      itemId: '{id}',
                    },
                  ],
                },
                {
                  component: 'Confirm',
                  text: '',
                  title: 'Are you sure you want to delete this?',
                  tooltip: 'Delete',
                  variant: 'danger',
                  icon: 'delete',
                  sub: [
                    {
                      component: 'Action',
                      props: {
                        action: 'delete',
                        endpoint: 'form-question/{row.id || id}',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]}
      sub={[
        {
          component: 'Group',
          sub: [
            {
              component: 'BackButton',
            },
            {
              component: 'ModalButton',
              icon: 'plus',
              text: 'Add new',
              sub: [{ component: 'Form', formId: 'form-question' }],
            },
          ],
        },
        { component: 'Space', h: 'sm' },
      ]}
      // sorting={[
      //   { name: 'Order (Lowest to Highest)', key: 'question_order' },
      //   { name: 'Order (Highest to Lowest)', key: 'question_order,desc' },
      // ]}
    />
  )
}

export default FormQuestion

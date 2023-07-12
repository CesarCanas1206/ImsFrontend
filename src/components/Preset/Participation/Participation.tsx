import Form from 'src/components/Form/Form/Form'
import { useContext } from 'react'
import AppContext from 'src/context/AppContext'
import { useQuery } from 'react-query'
import useAPI from 'src/hooks/useAPI'

const defaultQuestions: any = [
  {
    text: 'Junior (under 18) participants',
    component: 'InputGenderCount',
    props: { prefix: 'junior_', withHeading: true },
  },
  {
    text: 'Senior (over 18) participants',
    component: 'InputGenderCount',
    props: { prefix: 'senior_' },
  },
  {
    text: 'Volunteers',
    component: 'InputGenderCount',
    props: { prefix: 'volunteer_' },
  },
  {
    text: 'Committee members',
    component: 'InputGenderCount',
    props: { prefix: 'committee_' },
  },
  {
    text: 'Players with a disability',
    component: 'InputGenderCount',
    props: { prefix: 'disability_' },
  },
  {
    text: 'Indigenous players',
    component: 'InputGenderCount',
    props: { prefix: 'atsi_' },
  },
  {
    text: 'Total number of club members',
    reference: 'count_total',
    component: 'Total',
    props: {
      fields:
        'junior_male,junior_female,junior_other,senior_male,senior_female,senior_other,volunteer_male,volunteer_female,volunteer_other,committee_male,committee_female,committee_other',
    },
  },
]
function Participation({ ...formProps }: any) {
  const { siteName } = useContext(AppContext)

  const hirerId = formProps.defaultValues.hirer_id

  const { get } = useAPI()

  const {
    data: hirer,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['hirer', hirerId],
    queryFn: async () =>
      await get({
        endpoint: `hirer-memberdetails?id=${hirerId}`,
      }),
  })

  if (isLoading) {
    return <></>
  }

  //const sport = hirer?.find((f: any) => f.id === hirerId)?.sport ?? undefined

  const siteQuestions: any = {
    monashnew: [
      {
        text: 'Juniors',
        component: 'InputGenderCount',
        props: { prefix: 'junior_', withHeading: true },
      },
      {
        text: 'Seniors (18+)',
        component: 'InputGenderCount',
        props: { prefix: 'senior_' },
      },
      {
        text: 'Masters (50+)',
        component: 'InputGenderCount',
        props: { prefix: 'master_' },
      },
      {
        text: 'Total number of participants',
        reference: 'count_total',
        component: 'Total',
        props: {
          fields:
            'junior_male,junior_female,senior_male,senior_female,master_male,master_female',
        },
      },
    ],
  }

  const questions = [
    {
      component: 'FormHeading',
      props: { text: 'Participation' },
    },
    ...(siteQuestions[siteName] ?? defaultQuestions),
  ]

  const form = {
    endpoint: 'd/participation',
    questions: questions,
  }

  return <Form formOverRide={form} {...formProps} />
}

export default Participation

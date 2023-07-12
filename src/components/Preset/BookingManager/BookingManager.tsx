import {
  Flex,
  Title,
  Text,
  Paper,
  Button as MButton,
  Table,
} from '@mantine/core'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import contact from 'src/assets/images/contact.svg'
import outstanding from 'src/assets/images/outstanding.svg'
import invoice from 'src/assets/images/invoice.svg'
import report from 'src/assets/images/report-letters.svg'
import keyholder from 'src/assets/images/keyholders.svg'
import confirmation from 'src/assets/images/confirmation.svg'
import Button from 'src/components/Form/Button/Button'
import styles from './booking-manager.module.css'
const hires = [
  {
    id: 1,
    name: 'Regular Hire',
  },
  {
    id: 2,
    name: 'Casual Hire',
  },
  {
    id: 3,
    name: 'Function Hire',
  },
]

const grid = [
  {
    id: 1,
    name: 'Contact Details',
    img: contact,
  },
  {
    id: 2,
    name: 'Registered Keyholders',
    img: keyholder,
  },
  {
    id: 3,
    name: 'Confirmation Letters',
    img: confirmation,
  },
  {
    id: 4,
    name: 'Outstanding Issues',
    img: outstanding,
  },
  {
    id: 5,
    name: 'Invoice Reports',
    img: invoice,
  },
  {
    id: 6,
    name: 'Report Letters',
    img: report,
  },
]

const submittedBookings = [
  {
    id: 1,
    date: '12/12/2021',
    name: 'Casual Hire',
    status: 'Approved',
  },
  {
    id: 2,
    date: '12/12/2021',
    name: 'Casual Hire',
    status: 'Approved',
  },
  {
    id: 3,
    date: '12/12/2021',
    name: 'Casual Hire',
    status: 'Approved',
  },
  {
    id: 4,
    date: '12/12/2021',
    name: 'Casual Hire',
    status: 'Approved',
  },
]

const BookingManager = () => {
  return (
    <Flex direction="column">
      <Flex direction="column" pb="lg">
        <Flex pb="xs">
          <Title order={2}>Bookings</Title>
        </Flex>
        <Flex gap="lg">
          <Flex style={{ flex: 1 }}>
            <Flex direction="column" style={{ flex: 1 }}>
              <Paper
                style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                pl="md"
                pr="md"
              >
                {hires.map((hire) => (
                  <Flex
                    key={hire.id}
                    pb="xs"
                    pt="xs"
                    style={{ borderBottom: '1px solid #ddd' }}
                  >
                    <Flex
                      style={{ flex: 1 }}
                      gap="xs"
                      justify="center"
                      align="center"
                    >
                      <Flex style={{ flex: 2 }}>
                        <Text fw="500">{hire.name}</Text>
                      </Flex>
                      <Flex style={{ flex: 1 }}>
                        <MButton
                          variant="default"
                          size="sm"
                          leftIcon={
                            <CalendarTodayIcon
                              color="primary"
                              fontSize="small"
                            />
                          }
                        >
                          <Text color="#2E53DA" fw={'300'}>
                            Check Calendar
                          </Text>
                        </MButton>
                      </Flex>
                      <Flex style={{ flex: 1 }}>
                        <Button
                          text="Start application"
                          size="sm"
                          variant="filled"
                          style={{ paddingLeft: 30, paddingRight: 30 }}
                        ></Button>
                      </Flex>
                    </Flex>
                    <Flex></Flex>
                  </Flex>
                ))}
              </Paper>
            </Flex>
          </Flex>
          <Flex style={{ flex: 1 }}>
            <Flex style={{ flex: '1' }} wrap={'wrap'} gap="xs">
              {grid.map((item) => (
                <Flex
                  key={item.id}
                  style={{ flex: '1 1 32%', background: '#fff' }}
                >
                  <Paper p="md" style={{ flex: 1, cursor: 'pointer' }}>
                    <Flex gap={'sm'}>
                      <Flex>
                        <img src={item.img} />
                      </Flex>
                      <Flex>
                        <Text>{item.name}</Text>
                      </Flex>
                    </Flex>
                  </Paper>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Flex pb={'xs'}>
          <Title order={2}>Submitted Bookings</Title>
        </Flex>
        <Flex>
          <Paper pt="sm" pb="sm" style={{ display: 'flex', flex: 1 }}>
            <Table withColumnBorders>
              <thead>
                <tr>
                  <th className={styles.th}>Application ID</th>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Recreation Centre</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {submittedBookings.map((element) => (
                  <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.date}</td>
                    <td>{element.name}</td>
                    <td>{element.status}</td>
                    <td
                      style={{
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'center',
                        flex: 0,
                      }}
                    >
                      <Button compact icon="pdf" />

                      <Button compact icon="trash" variant="danger" />

                      <Button compact icon="search" variant="info" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Paper>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default BookingManager

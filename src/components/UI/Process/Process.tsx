import { Timeline, Text } from '@mantine/core'
import Badge from '../Badge/Badge'

export function Process() {
  return (
    <div
      className="d-flex justify-content-center mt-3"
      style={{ flexDirection: 'column' }}
    >
      <div
        className="d-flex justify-content-center mt-3"
        style={{
          flexDirection: 'column',
          textAlign: 'center',
          width: 300,
          margin: '0 auto',
        }}
      >
        <Badge color="cyan" size="lg">
          Mark as complete
        </Badge>
        <div
          style={{
            borderLeft: '2px dashed lightblue',
            borderRight: '2px dashed lightblue',
            height: 20,
            margin: '5px auto',
            display: 'inline-block',
          }}
        ></div>
        <Badge color="cyan" size="lg">
          Send email
        </Badge>
        <small>Template: Completed form</small>
        <div
          style={{
            borderLeft: '2px dashed lightblue',
            borderRight: '2px dashed lightblue',
            height: 20,
            margin: '5px auto',
            display: 'inline-block',
          }}
        ></div>
        <Badge color="cyan" size="lg">
          End
        </Badge>
      </div>
      <Timeline color="grape" active={0} bulletSize={26}>
        <Timeline.Item bullet={1} title="Set form to be completed">
          <Text color="dimmed" size="sm">
            Set form to be completed
          </Text>
        </Timeline.Item>
        <Timeline.Item bullet={2} title="Select related users">
          <Text color="dimmed" size="sm">
            Select related users
          </Text>
        </Timeline.Item>
        <Timeline.Item bullet={3} title="Send completed email">
          <Text color="dimmed" size="sm">
            Send completed email
          </Text>
        </Timeline.Item>
        <Timeline.Item bullet={3} title="Send completed text message">
          <Text color="dimmed" size="sm">
            Send completed text message
          </Text>
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export default Process

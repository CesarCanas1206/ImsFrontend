import React from 'react'
import { Card, Flex, Group, Stack, Table, Text, Title } from '@mantine/core'
import Button from 'src/components/Form/Button/Button'
import Icon from 'src/components/UI/Icon/Icon'

const ActivityDetails = () => {
  return (
    <Stack>
      <Flex>
        <Flex style={{ flex: 1 }}>
          <Button text="Back" icon="back" />
        </Flex>
        <Flex style={{ flex: 1 }} gap="sm" justify="flex-end">
          <Button icon="plus" text="Add New Activity" />
          <Button icon="edit" text="Edit" />
        </Flex>
      </Flex>
      <Flex>
        <Flex direction="column">
          <Title weight={400}>TSS High School</Title>
          <Flex align="center" gap="sm" pt={'md'}>
            <Button light text="Internal Activities" />
            <Button variant="outline" text="System Correspondence" />
            <Button variant="outline" text="Custom Correspondence" />
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Flex style={{ flex: 1 }} gap={'lg'}>
          <Flex style={{ flex: 1 }}>
            <Table>
              <thead>
                <tr style={{ backgroundColor: '#1943B5' }}>
                  <th style={{ color: '#fff' }}>Date</th>
                  <th style={{ color: '#fff' }}>Type</th>
                  <th style={{ color: '#fff' }}>Activity</th>
                  <th style={{ color: '#fff' }}>Logged Date</th>
                  <th style={{ color: '#fff' }}>Logged By</th>
                  <th style={{ color: '#fff' }}>Attachments</th>
                  <th style={{ color: '#fff' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12/12/2020</td>
                  <td>Phone Call</td>
                  <td>Call with John Doe</td>
                  <td>12/12/2020</td>
                  <td>John Doe</td>
                  <td>0</td>
                  <td>
                    <Flex gap="sm">
                      <Button icon="edit" compact />
                      <Button variant="danger" light icon="delete" compact />
                    </Flex>
                  </td>
                </tr>
                <tr>
                  <td>12/12/2020</td>
                  <td>Phone Call</td>
                  <td>Call with John Doe</td>
                  <td>12/12/2020</td>
                  <td>John Doe</td>
                  <td>0</td>
                  <td>
                    <Flex gap="sm">
                      <Button icon="edit" compact />
                      <Button icon="delete" variant="danger" light compact />
                    </Flex>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  )
}

export default ActivityDetails

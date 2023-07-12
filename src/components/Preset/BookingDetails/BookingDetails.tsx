import React, { useState } from 'react'
import { Grid } from '@mantine/core'
// import '../BookingForm/BookingForm.css'
import {
  TextInput,
  Select,
  Divider,
  Table,
  Button,
  Title,
  Textarea,
  Modal,
} from '@mantine/core'
import './BookingDetails.css'
import Icon from '../../UI/Icon/Icon'

export default function BookingDetails() {
  const stateData = ['NSW', 'QLD', 'SA', 'TAS', 'VIC']

  const elements = [
    {
      BookableItem: 6,
      FromDate: '25/04/2022 10:00',
      ToDate: '26/04/2022 10:00',
      RVSites: '1',
      Unit: 'Days',
      ofUnits: 1,
      UnitPrice: '$0.00',
      Total: '$0.00',
      GST: '$0.00',
    },
  ]
  const [opened, setOpened] = useState<boolean>(false)

  const rows = elements.map((element: any, key: number) => (
    <tr key={key}>
      <td>{element.BookableItem}</td>
      <td>{element.FromDate}</td>
      <td>{element.ToDate}</td>
      <td>{element.RVSites}</td>
      <td>{element.Unit}</td>
      <td>{element.ofUnits}</td>
      <td>{element.UnitPrice}</td>
      <td>{element.Total}</td>

      <td>{element.GST}</td>
    </tr>
  ))
  const [state, setState] = useState<any>('')

  const formSubTitle = {
    position: 'relative',
    fontSize: '20px',
    marginTop: '10px',
    padding: '6px 12px 6px 12px',
  } as React.CSSProperties

  return (
    <div className="container">
      <div>
        <Grid>
          <Grid.Col sm={7} md={8} lg={8}>
            <Title order={5} style={{ color: '#003D6B' }}>
              Booking Details
            </Title>
          </Grid.Col>
          <Grid.Col sm={5} md={4} lg={4}>
            <Title order={5} style={{ color: '#003D6B' }}>
              Booking Status: Temporary
            </Title>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col sm={7} md={8} lg={8}>
            <div style={formSubTitle}>
              <div>
                <span>
                  Booking <strong className="ng-scope">Overview</strong>
                  <Icon type="calendar" style={{ color: 'white' }} />
                </span>
              </div>
            </div>
            <div>
              <TextInput
                label="Venue"
                value="Test venue"
                readOnly
                radius="xs"
              />
            </div>
            <Grid>
              <Grid.Col sm={6}>
                <div>
                  <TextInput
                    label="Venue"
                    value="Test venue"
                    radius="xs"
                    readOnly
                  />
                </div>
              </Grid.Col>
              <Grid.Col sm={6}>
                <div>
                  <TextInput
                    label="Custmer"
                    value="Guest"
                    radius="xs"
                    readOnly
                  />
                </div>
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col sm={6}>
                <div>
                  <TextInput
                    label="Booking Name"
                    value="Test Name"
                    radius="xs"
                    readOnly
                  />
                </div>
              </Grid.Col>
              <Grid.Col sm={6}>
                <div>
                  <TextInput
                    label={`Purpose`}
                    value="Camping"
                    radius="xs"
                    readOnly
                  />
                </div>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col sm={6}>
                <Button
                  size="xs"
                  style={{
                    marginTop: '15px',
                    marginBottom: '5px',
                    float: 'right',
                  }}
                >
                  <Icon type="edit" />
                </Button>
                <Textarea
                  readOnly
                  placeholder="Click edit button to enter decription"
                  radius="xs"
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <Button
                  size="xs"
                  style={{
                    marginTop: '15px',
                    marginBottom: '5px',
                    float: 'right',
                  }}
                >
                  <Icon type="edit" />
                </Button>
                <Textarea
                  className=""
                  readOnly
                  placeholder="Click edit button to edit Purpose"
                  radius="xs"
                />
              </Grid.Col>
            </Grid>
            <div className="form-group form-sub-title">
              <div className="copydiv">
                <span className="copytxt">
                  Guest <strong className="ng-scope">Details</strong>
                  <Icon type="calendar" style={{ color: 'white' }} />
                </span>
              </div>
            </div>

            <Grid>
              <Grid.Col sm={3}>
                <div>
                  <TextInput
                    radius="xs"
                    placeholder="Given Name(s)*"
                    required
                  />
                </div>
              </Grid.Col>
              <Grid.Col sm={3}>
                <div>
                  <TextInput radius="xs" placeholder="Familiy Name*" required />
                </div>
              </Grid.Col>
              <Grid.Col sm={3}>
                <div>
                  <TextInput radius="xs" placeholder="Email*" required />
                </div>
              </Grid.Col>

              <Grid.Col sm={3}>
                <div>
                  <TextInput
                    radius="xs"
                    placeholder="Mobile Number*"
                    required
                  />
                </div>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col sm={6}>
                <div>
                  <TextInput
                    radius="xs"
                    placeholder="Address Line 1 (Optional)"
                  />
                </div>
              </Grid.Col>
              <Grid.Col sm={6}>
                <div>
                  <TextInput
                    radius="xs"
                    placeholder="Address Line 2 (Optional)"
                  />
                </div>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col sm={4}>
                <div>
                  <TextInput radius="xs" placeholder="Suburb (Optional)" />
                </div>
              </Grid.Col>

              <Grid.Col sm={4}>
                <div>
                  <Select
                    className="hide-bottom-border"
                    value={state}
                    onChange={setState}
                    data={stateData}
                  />
                </div>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col sm={4}>
                <div>
                  <TextInput radius="xs" placeholder="Postcode (Optional)" />
                </div>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col sm={5} md={4}>
            <div className="pricingTable">
              <div className="pricing_heading">
                <h3 className="title">Pricing Summary</h3>
                <span className="value"></span>
              </div>
              <div className="content">
                <ul className="price-list">
                  <li>
                    Fees (Incl GST) :{' '}
                    <span
                      style={{
                        display: 'block',
                        float: 'right',
                        fontWeight: 'bold',
                      }}
                    >
                      $99
                    </span>
                  </li>
                  <li>
                    Bonds:{' '}
                    <span
                      style={{
                        display: 'block',
                        float: 'right',
                        fontWeight: 'bold',
                      }}
                    >
                      $99
                    </span>
                  </li>
                  <li>
                    Total(Incl GST):{' '}
                    <span
                      style={{
                        display: 'block',
                        float: 'right',
                        fontWeight: 'bold',
                      }}
                    >
                      $99
                    </span>
                  </li>
                  <li>
                    GST:{' '}
                    <span
                      style={{
                        display: 'block',
                        float: 'right',
                        fontWeight: 'bold',
                      }}
                    >
                      $99
                    </span>
                  </li>
                  <li>
                    Total price :{' '}
                    <span
                      style={{
                        display: 'block',
                        float: 'right',
                        fontWeight: 'bold',
                      }}
                    >
                      $99
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col sm={12} md={7} lg={7}>
            <div className="border-color">
              <Title order={3} style={{ color: '#003D6B' }}>
                Required Documents
                <br />
              </Title>
              <p>
                The document(s) specified below are required for your booking to
                be assessed. The maximum file size is 30MB per file.
              </p>
              <Divider size="xs" />

              <h3>No documents required.</h3>
            </div>
          </Grid.Col>

          <Grid.Col sm={12} md={5} lg={5}>
            <div className="border-color">
              <Title order={3} style={{ color: '#003D6B' }}>
                Other Documents
                <br />
              </Title>
              <p>
                Only use this option to upload additional documents that are NOT
                specified in the &apos;Required Documents&apos; panel
              </p>
              <Divider size="xs" />

              <h3>Clik upload button to upload documents.</h3>
              <Button className="margin-top">Upload document</Button>
            </div>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col sm={12} md={7} lg={7}>
            <div className="border-color">
              <Title order={3} style={{ color: '#003D6B' }}>
                Booking summary
              </Title>

              <Title order={5} style={{ color: '#003D6B', textAlign: 'left' }}>
                25 April 2022 Monday
              </Title>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Bookable Item</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>RV Sites</th>
                    <th>Unit</th>
                    <th># of Units</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>GST*</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </div>
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col sm={12} md={12} lg={12}>
            <div className="border-color">
              <Title order={3} style={{ color: '#003D6B' }}>
                Add contacts for booking notifications
                <br />
              </Title>
              <p>
                Only use this option to upload additional documents that are NOT
                specified in the &apos;Required Documents&apos; panel
              </p>
              <Divider size="xs" />

              <Button className="margin-top" onClick={() => setOpened(true)}>
                Add contact
              </Button>
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add contact"
              >
                <Grid>
                  <Grid.Col sm={12}>
                    <div>
                      <TextInput
                        radius="xs"
                        label="First name"
                        placeholder="Frist Name"
                      />
                    </div>
                  </Grid.Col>

                  <Grid.Col sm={12}>
                    <div>
                      <TextInput
                        label="Surname"
                        radius="xs"
                        placeholder="Surname"
                      />
                    </div>
                  </Grid.Col>

                  <Grid.Col sm={12}>
                    <div>
                      <TextInput
                        label="Email"
                        radius="xs"
                        placeholder="Email"
                      />
                    </div>
                  </Grid.Col>
                  <Grid.Col sm={12}>
                    <div>
                      <TextInput
                        label="Mobile"
                        radius="xs"
                        placeholder="Mobile"
                      />
                    </div>
                  </Grid.Col>
                </Grid>
              </Modal>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  )
}

import React from 'react'
import './table.css'

export default function CommunityCenterTable() {
  // const [opened, setOpened] = useState(false);
  // const elements = [
  //   {
  //     position: "Room 1",
  //     capacity: 5,
  //     table: "YES",
  //     chairs: "YES",
  //     stove: "NO",
  //     fridge: "YES",
  //     aircon: "YES",
  //   },
  //   {
  //     position: "Room 2",
  //     capacity: 10,
  //     table: "NO",
  //     chairs: "YES",
  //     stove: "YES",
  //     fridge: "YES",
  //     aircon: "NO",
  //   },
  //   {
  //     position: "Room 3",
  //     capacity: 10,
  //     table: "YES",
  //     chairs: "NO",
  //     stove: "NO",
  //     fridge: "NO",
  //     aircon: "NO",
  //   },
  //   {
  //     position: "Room 4",
  //     capacity: 8,
  //     table: "NO",
  //     chairs: "NO",
  //     stove: "YES",
  //     fridge: "NO",
  //     aircon: "YES",
  //   },
  //   {
  //     position: "Room 5",
  //     capacity: 30,
  //     table: "NO",
  //     chairs: "NO",
  //     stove: "NO",
  //     fridge: "NO",
  //     aircon: "YES",
  //   },
  // ];
  // const ths = (
  //   <tr>
  //     <th>Room</th>
  //     <th>Capacity</th>
  //     <th>Tables</th>
  //     <th>Chairs</th>
  //     <th>Stove/Oven</th>
  //     <th>Fridge</th>
  //     <th>Air conditioner</th>
  //   </tr>
  // );
  // const secondHeading = (
  //   <tr>
  //     <th>BBQs</th>
  //     <th>Dogs</th>
  //     <th>Gym Equipment</th>
  //     <th>Play</th>
  //     <th>Stove/Oven</th>
  //     <th>Sport</th>
  //     <th>Toliet</th>
  //   </tr>
  // );
  // const rows = elements.map((element) => (
  //   <tr key={element.name}>
  //     <td>{element.position}</td>
  //     <td>{element.capacity}</td>
  //     <td>
  //       {element.table == "YES" && (
  //         <DoneOutlinedIcon style={{ color: "green" }} />
  //       )}
  //       {element.table == "NO" && (
  //         <CloseOutlinedIcon style={{ color: "red" }} />
  //       )}
  //     </td>
  //     <td>
  //       {element.chairs == "YES" && (
  //         <DoneOutlinedIcon style={{ color: "green" }} />
  //       )}
  //       {element.chairs == "NO" && (
  //         <CloseOutlinedIcon style={{ color: "red" }} />
  //       )}
  //     </td>
  //     <td>
  //       {" "}
  //       {element.stove == "YES" && (
  //         <DoneOutlinedIcon style={{ color: "green" }} />
  //       )}
  //       {element.stove == "NO" && (
  //         <CloseOutlinedIcon style={{ color: "red" }} />
  //       )}
  //     </td>
  //     <td>
  //       {element.fridge == "YES" && (
  //         <DoneOutlinedIcon style={{ color: "green" }} />
  //       )}
  //       {element.fridge == "NO" && (
  //         <CloseOutlinedIcon style={{ color: "red" }} />
  //       )}
  //     </td>
  //     <td>
  //       {element.aircon == "YES" && (
  //         <DoneOutlinedIcon style={{ color: "green" }} />
  //       )}
  //       {element.aircon == "NO" && (
  //         <CloseOutlinedIcon style={{ color: "red" }} />
  //       )}
  //     </td>
  //   </tr>
  // ));
  // return (
  //   <Grid.Col sm={6} md={5} lg={5} className='table-margin'>
  //     <div>
  //       <h3>Atwell Community Centre</h3>
  //       Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum dolor sit
  //       amet, consectetur adip
  //       <Table striped highlightOnHover className='styled-table'>
  //         <caption>Some elements from periodic table</caption>
  //         <thead>{ths}</thead>
  //         <tbody>{rows}</tbody>
  //       </Table>
  //       <Table striped highlightOnHover className='styled-table'>
  //         <caption>Some elements from periodic table</caption>
  //         <thead>{ths}</thead>
  //       </Table>
  //       <div className='content'>
  //         <PriceLisitngTable />
  //         <Button
  //           color='cyan'
  //           radius='xl'
  //           size='lg'
  //           style={{ marginBottom: "10px" }}
  //           onClick={() => setOpened(true)}>
  //           Open Availability Calendar
  //         </Button>
  //         <>
  //           <Modal
  //             opened={opened}
  //             onClose={() => setOpened(false)}
  //             title='Check Availability'
  //             size='lg'>
  //             <Grid>
  //               <Grid.Col sm={6} lg={6} md={6}>
  //                 <DatePicker
  //                   placeholder='Pick date'
  //                   minDate={dayjs(new Date())
  //                     .startOf("month")
  //                     .add(5, "days")
  //                     .toDate()}
  //                   maxDate={dayjs(new Date())
  //                     .endOf("month")
  //                     .subtract(5, "days")
  //                     .toDate()}
  //                 />
  //               </Grid.Col>
  //               <Grid.Col sm={6} lg={6} md={6}>
  //                 <Input placeholder='Select time' radius='md' size='md' />
  //                 <AddTimeButton />
  //               </Grid.Col>
  //             </Grid>
  //           </Modal>
  //         </>
  //       </div>
  //     </div>
  //   </Grid.Col>
  // <div></div>;
}

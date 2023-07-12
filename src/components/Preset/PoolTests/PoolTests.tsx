import React, { useState } from 'react'
import DynamicComponent from '../../DynamicComponent/DynamicComponent'
import { Accordion } from '@mantine/core'
import DatePicker from '../../Form/DatePicker/DatePicker'

export const settings = [
  {
    name: 'chart',
    label: 'Show chart',
    type: 'Radios',
    options: [
      {
        name: 'Yes',
        value: 'true',
      },
      {
        name: 'No',
        value: 'false',
      },
    ],
  },
]

// prettier-ignore
const testData = JSON.parse(`[{"id":"43","assetname":"COS - Coastal Villas","pools":{"20":{"poolid":"20","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":3}},"overdue":1,"completed":0},{"id":"23","assetname":"CWD - Crestwood","pools":{"28":{"poolid":"28","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":1,"completed":0},{"id":"40","assetname":"DMG - Dannemora Gardens","pools":{"26":{"poolid":"26","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":1,"completed":0},{"id":"41","assetname":"EDG - Edgewater Village","pools":{"25":{"poolid":"25","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"24":{"poolid":"24","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"30","assetname":"FLG - Forest Lakes Gardens","pools":{"33":{"poolid":"33","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"32":{"poolid":"32","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"33","assetname":"GNG - Greenwich Gardens","pools":{"35":{"poolid":"35","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"34":{"poolid":"34","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"26","assetname":"GWP - Greenwood Park","pools":{"37":{"poolid":"37","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"36":{"poolid":"36","poolname":"Swimming Pool","poolenabled":"1","overdue":3,"completed":0}},"overdue":4,"completed":0},{"id":"32","assetname":"HCV - Hibiscus Coast Village","pools":{"39":{"poolid":"39","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"38":{"poolid":"38","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"47","assetname":"HEI - Metlifecare Heights","pools":{"70":{"poolid":"70","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"69":{"poolid":"69","poolname":"Swimming Pool","poolenabled":"1","overdue":3,"completed":0}},"overdue":4,"completed":0},{"id":"24","assetname":"HHV - Hillsborough Heights","pools":{"45":{"poolid":"45","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"44":{"poolid":"44","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"38","assetname":"HLD - Highlands","pools":{"41":{"poolid":"41","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"40":{"poolid":"40","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"44","assetname":"KAP - Kapiti Village","pools":{"42":{"poolid":"42","poolname":"Big Swimming Pool","poolenabled":"1","overdue":1,"completed":0},"43":{"poolid":"43","poolname":"Small Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"37","assetname":"LPV - Longford Park Village","pools":{"51":{"poolid":"51","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"50":{"poolid":"50","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"34","assetname":"ORC - The Orchards","pools":{"62":{"poolid":"62","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"61":{"poolid":"61","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"35","assetname":"ORV - Oakridge Villas","pools":{"53":{"poolid":"53","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"52":{"poolid":"52","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"45","assetname":"PAN - Palmerston North Village","pools":{"55":{"poolid":"55","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"54":{"poolid":"54","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"27","assetname":"PBV - Papamoa Beach Village","pools":{"58":{"poolid":"58","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"56":{"poolid":"56","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"22","assetname":"POW - Powley","pools":{"48":{"poolid":"48","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":1,"completed":0},{"id":"31","assetname":"POY - The Poynton","pools":{"64":{"poolid":"64","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"63":{"poolid":"63","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"18","assetname":"PSG - Pinesong","pools":{"13":{"poolid":"13","poolname":"Spa Pool No.1","poolenabled":"1","overdue":1,"completed":0},"14":{"poolid":"14","poolname":"Spa Pool No.2","poolenabled":"1","overdue":1,"completed":0},"12":{"poolid":"12","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":3,"completed":0},{"id":"29","assetname":"SOM - Somervale","pools":{"57":{"poolid":"57","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"49":{"poolid":"49","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"39","assetname":"SSV - 7 Saint Vincent","pools":{"16":{"poolid":"16","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"15":{"poolid":"15","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0},{"id":"21","assetname":"WTG - Waitakere Gardens","pools":{"21":{"poolid":"21","poolname":"Swimming Pool","poolenabled":"1","overdue":1,"completed":0}},"overdue":1,"completed":0},{"id":"46","assetname":"ZZZ - Demo Facility","pools":{"66":{"poolid":"66","poolname":"Spa Pool","poolenabled":"1","overdue":1,"completed":0},"67":{"poolid":"67","poolname":"Swimming Poll","poolenabled":"1","overdue":1,"completed":0}},"overdue":2,"completed":0}]`)

function AssetPoolRow({ pool, id }: any) {
  const overdueCompletedText = [pool.overdue, pool.completed].map(
    (value, index) => {
      if (value === 0) {
        return ''
      }

      return (
        <DynamicComponent
          key={`${pool.poolid}${id}${index}`}
          component="Badge"
          props={{
            text: `${value} ${index === 0 ? 'overdue' : 'completed'}`,
            color: index === 0 ? 'yellow' : 'green',
          }}
        />
      )
    },
  )

  return (
    <Accordion
      multiple
      className="mt-3 border border-primary"
      classNames={{
        item: 'border-bottom',
      }}
      color="blue"
    >
      <Accordion.Item value={pool.poolname}>
        <Accordion.Control>
          {pool.poolname}
          {overdueCompletedText}
        </Accordion.Control>
        <Accordion.Panel>
          <DynamicComponent
            component="Group"
            sub={[
              <DynamicComponent
                key="a"
                component="ModalButton"
                props={{ text: '8:00am', icon: 'tick' }}
                sub={[
                  <DynamicComponent
                    key="a1"
                    component="Form"
                    props={{
                      formId: 'pool-test',
                      itemId: 'a838ea76-d104-42cb-aebf-946884c32b6a',
                    }}
                  />,
                ]}
              />,
              <DynamicComponent
                key={2}
                component="Button"
                props={{ variant: 'warning', text: '9:00am', icon: 'clock' }}
              />,
              <DynamicComponent
                key={3}
                component="Button"
                props={{ text: '8:00am', icon: 'clock' }}
              />,
            ]}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

function PoolTestFilters({ filterAsset, setFilterAsset }: any) {
  return (
    <div>
      <span className="fw-bold">Date: </span>
      <div className="btn-group" style={{ width: '240px' }}>
        <DatePicker />
        <DynamicComponent component="Button" props={{ text: 'Today' }} />
      </div>

      <span className="fw-bold">Facility: </span>
      <div className="btn-group bg-group-lg" style={{ width: '240px' }}>
        <select
          className="form-select d-inline-block"
          value={filterAsset}
          onChange={(e) => setFilterAsset(e.target.value)}
        >
          <option value="">-- All results --</option>
          <option value="43">COS - Coastal Villas</option>
          <option value="23">CWD - Crestwood</option>
          <option value="40">DMG - Dannemora Gardens</option>
          <option value="41">EDG - Edgewater Village</option>
          <option value="30">FLG - Forest Lakes Gardens</option>
          <option value="19">FWG - Fairway Gardens</option>
          <option value="33">GNG - Greenwich Gardens</option>
          <option value="36">GUL - Gulf Rise</option>
          <option value="26">GWP - Greenwood Park</option>
          <option value="32">HCV - Hibiscus Coast Village</option>
          <option value="47">HEI - Metlifecare Heights</option>
          <option value="24">HHV - Hillsborough Heights</option>
          <option value="38">HLD - Highlands</option>
          <option value="44">KAP - Kapiti Village</option>
          <option value="37">LPV - Longford Park Village</option>
          <option value="34">ORC - The Orchards</option>
          <option value="35">ORV - Oakridge Villas</option>
          <option value="45">PAN - Palmerston North Village</option>
          <option value="27">PBV - Papamoa Beach Village</option>
          <option value="42">POH - Pohutukawa Landing</option>
          <option value="22">POW - Powley</option>
          <option value="31">POY - The Poynton</option>
          <option value="18">PSG - Pinesong</option>
          <option value="29">SOM - Somervale</option>
          <option value="39">SSV - 7 Saint Vincent</option>
          <option value="21">WTG - Waitakere Gardens</option>
          <option value="46">ZZZ - Demo Facility</option>
        </select>
      </div>
    </div>
  )
}

export function PoolTests({ onChange, chart, value, ...props }: any) {
  const [filterAsset, setFilterAsset] = useState('')
  return (
    <>
      <PoolTestFilters
        filterAsset={filterAsset}
        setFilterAsset={setFilterAsset}
      />
      <Accordion multiple className="mt-3 border border-primary" color="blue">
        {testData
          .filter(
            (item: any) =>
              filterAsset === '' || String(item.id) === String(filterAsset),
          )
          .map((item: any) => {
            return (
              <Accordion.Item key={item.id} value={item.assetname}>
                <Accordion.Control>{item.assetname}</Accordion.Control>
                <Accordion.Panel>
                  {item.pools &&
                    Object.values(item.pools).map((pool: any) => (
                      <AssetPoolRow
                        key={pool.poolid}
                        pool={pool}
                        id={item.id}
                      />
                    ))}
                </Accordion.Panel>
              </Accordion.Item>
            )
          })}
      </Accordion>
    </>
  )
}

export default PoolTests

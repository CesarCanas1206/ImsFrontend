export const settings = [
  {
    name: 'html',
    label: 'HTML',
    type: 'Textarea',
  },
]

function RawHtml({ html = '<p>Placeholder html</p>' }: any) {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>
  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <th>Risk level</th>
          <th>Likelihood</th>
          <th>Impact</th>
          <th>Consequence</th>
          <th>Action</th>
        </tr>
        <tr className="text-danger">
          <th>1</th>
          <th>Certain</th>
          <th>Extreme</th>
          <th>
            Safety: Catastrophic
            <br />
            Operation: System failure
          </th>
          <th>Immediate - Within 3 hours</th>
        </tr>
        <tr className="text-danger">
          <th>2</th>
          <th>Certain - most probable</th>
          <th>Very high</th>
          <th>
            Safety: Major/Catastrophic
            <br />
            Operation: System failure
          </th>
          <th>Immediate within 24 hours</th>
        </tr>
        <tr className="text-danger">
          <th>3</th>
          <th>Certain - most possible</th>
          <th>High</th>
          <th>
            Safety: Major
            <br />
            Operation: System failure
          </th>
          <th>Immediate within 24 hours</th>
        </tr>
        <tr className="text-warning">
          <th>4</th>
          <th>Probably</th>
          <th>Moderate</th>
          <th>
            Safety: Moderate
            <br />
            Operation: Compromised
          </th>
          <th>Within 2 – 3 working days</th>
        </tr>
        <tr className="text-warning">
          <th>5</th>
          <th>Probably</th>
          <th>Moderate</th>
          <th>
            Safety: Moderate
            <br />
            Operation: Compromised
          </th>
          <th>Within 5 working days</th>
        </tr>
        <tr className="text-success">
          <th>6</th>
          <th>Possible</th>
          <th>Low</th>
          <th>
            Safety: Minor
            <br />
            Operation: Plant maintenance
          </th>
          <th>Within 10 working days</th>
        </tr>
        <tr className="text-success">
          <th>7</th>
          <th>Possible - Unlikely</th>
          <th>Low</th>
          <th>
            Safety: Minor
            <br />
            Operation: Plant maintenance
          </th>
          <th>Within 15 working days</th>
        </tr>
      </tbody>
    </table>
  )
}

export default RawHtml

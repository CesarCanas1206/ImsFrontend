function PricingOrig({ onChange, value }: any) {
  const pricing =
    value && typeof value?.rate !== 'undefined'
      ? [value]
      : value ?? [
          {
            condition: 'If something',
            rate: '200',
          },
        ]
  // return <></>
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Condition</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {typeof pricing !== 'undefined' &&
            typeof pricing.map !== 'undefined' &&
            pricing?.map((price: any) => (
              <tr>
                <td>
                  <input defaultValue={price.condition} />
                </td>
                <td>
                  $<input defaultValue={price.rate} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => onChange({ value: pricing })}>Something</button>
    </>
  )
}

export default PricingOrig

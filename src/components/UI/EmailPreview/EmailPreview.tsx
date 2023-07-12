import React from 'react'

function EmailPreview({ children, row }: any) {
  return (
    <div style={{ border: '1px solid #efefef', padding: 8, borderRadius: 4 }}>
      <h5 style={{ marginBottom: 2, marginTop: 2 }}>John Smith</h5>
      <small style={{ color: '#999' }}>Mon 1/1/2020 8:00am</small>
      <h6 style={{ marginBottom: 2, marginTop: 2 }}>To: Jane Smith</h6>
      {row?.subject && <h6 style={{ marginTop: 2 }}>Subject: {row.subject}</h6>}
      <hr />
      {children}
    </div>
  )
}

export default EmailPreview

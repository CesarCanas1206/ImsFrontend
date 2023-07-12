import React from 'react'
import {
  PDFViewer,
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'
import { ucFirst } from '../../../utilities/strings'
import { useQueryClient } from 'react-query'

// Create styles
const styles = StyleSheet.create({
  page: {
    fontSize: 14,
    // flexDirection: 'row',
    // backgroundColor: '#E4E4E4',
  },
  header: {
    margin: '10px 20px 20px',
    padding: 10,
    flexGrow: 0,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    gap: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: '0 10px 10px',
    gap: 10,
    borderBottom: '1px solid #ccc',
  },
  label: {
    fontWeight: 'bold',
    width: '30%',
  },
  logo: {
    maxHeight: 150,
    maxWidth: 150,
  },
  footerCount: {
    textAlign: 'right',
    fontSize: 12,
    marginBottom: 10,
    marginRight: 20,
  },
})

// Create Document Component
const PdfDocument = ({ logo, values }: any) => {
  // const values = {
  //   name: 'Test',
  //   email: 'Test',
  //   blah: 'test',
  //   thing: 'test123123',
  //   hi: 'etsets',
  // }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logo && <Image src={logo} style={styles.logo} />}
        </View>
        <View style={styles.section}>
          {Object.entries(values).map(
            ([field, value]: any) =>
              typeof value === 'string' && (
                <View style={styles.row}>
                  <Text style={styles.label}>{ucFirst(field)}</Text>
                  <Text>{value}</Text>
                </View>
              ),
          )}
        </View>
        <Text
          style={styles.footerCount}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

interface IPdf {
  row?: any
}

function Pdf({ row, ...props }: IPdf) {
  const queryClient = useQueryClient()
  const settings: any = queryClient.getQueryData(['settings'])

  console.log(row)

  return (
    <PDFViewer width={'100%'} height={500}>
      <PdfDocument
        values={row}
        logo={settings['login-logo']?.value ?? settings['login-logo']}
      />
    </PDFViewer>
  )
}

export default Pdf

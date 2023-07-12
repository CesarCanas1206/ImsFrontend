import { useState } from 'react'
import { saveAs } from 'file-saver'

import {
  Document,
  Header,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  TableOfContents,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  VerticalPositionAlign,
  VerticalPositionRelativeFrom,
  Footer,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  UnderlineType,
  convertInchesToTwip,
  BorderStyle,
  AlignmentType,
  PageNumber,
  PageOrientation,
  LevelFormat,
  VerticalAlign,
} from 'docx'
import useAPI from '../../../hooks/useAPI'
import Button from '../../Form/Button/Button'
import Loader from '../../UI/Loader/Loader'

import amottoHeaderImage from './amottoHeaderImage'
import useForm from '../../../hooks/useForm'
import { moneyFormatter, isEmpty } from '../../../utilities/strings'

let allPhotos: any = {}
let totals: any = { total: 0 }

let count = 0
let audit: any = {}
let asset: any = {}
let summarySections: any = {}
let poolSpecificationQuestions: any = {}

const addParagraphs = (count: number) => Array(count).fill(new Paragraph(''))

const loadImage = async (url: any, blob = false) => {
  if (typeof url === 'undefined' || url === '') {
    return ''
  }

  if (blob) {
    return await fetch(url).then((r) => r.blob())
  }
  return await fetch(`${url}?h=300&r=-90`).then((r) => r.blob())
}

const dateFormat = (date: any) =>
  typeof date === 'undefined' || date === ''
    ? ''
    : new Intl.DateTimeFormat('en-AU', {
        year: 'numeric',
        month: 'long',
      }).format(new Date(date))

const dateFormatDay = (date: any) => {
  if (typeof date === 'undefined') {
    return ''
  }
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

const outputIntroduction = () => {
  count += 1
  return [
    new Paragraph({
      text: `${count}. Introduction`,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      text: `Amotto is an independent consultancy company which provides advice and support to residential and commercial swimming and spa pool operators.`,
    }),
    new Paragraph({
      text: `We have over 20 years of nation-wide industry experience working for various councils, healthcare providers/retirement villages, accommodation providers, schools, health clubs and residential clients.`,
    }),
    new Paragraph({
      text: `The objective of this report is to provide ${
        typeof audit.client !== 'undefined' && audit.client[0]?.name
      } with an understanding of the current condition of the ${
        typeof audit['report-type'] !== 'undefined' &&
        audit['report-type'][0]?.name
      } facilities.`,
    }),
    new Paragraph({
      text: `This report reviews the following aspects of the ${
        typeof audit['report-type'] !== 'undefined' &&
        audit['report-type'][0]?.name
      } facilities:`,
    }),
    new Paragraph({
      text: `the condition of the pool, plant and equipment`,
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      text: `the ability of plant items to perform their task in a compliant manner with reference to the current New Zealand Standards NZS 4441:2008 (Swimming Pool Design) and NZS 5826:2010 (Pool Water Quality)`,
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      text: `health and safety, and`,
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      text: `operational procedures.`,
      bullet: {
        level: 0,
      },
    }),

    new Paragraph({
      text: `We have included a number of recommendations throughout this report, which have also been summarised at the end of this document.`,
    }),

    new Paragraph(''),
    new Paragraph(''),
    new Paragraph(''),
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: `Distribution List:`,
                }),
              ],
              borders: {
                top: {
                  style: BorderStyle.NIL,
                },
                bottom: {
                  style: BorderStyle.NIL,
                },
                left: {
                  style: BorderStyle.NIL,
                },
                right: {
                  style: BorderStyle.NIL,
                },
              },
            }),
            new TableCell({
              borders: {
                top: {
                  style: BorderStyle.NIL,
                },
                bottom: {
                  style: BorderStyle.NIL,
                },
                left: {
                  style: BorderStyle.NIL,
                },
                right: {
                  style: BorderStyle.NIL,
                },
              },
              children:
                audit?.distribution?.split('\n').map(
                  (item: any) =>
                    new Paragraph({
                      text: item,
                    }),
                ) ?? [],
            }),
          ],
        }),
      ],
    }),
  ]
}

const outputReportSummary = () => {
  count += 1
  return [
    new Paragraph({
      text: `${count}. Report Summary`,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      text: `Amotto was engaged by ${
        typeof audit.client !== 'undefined' && audit.client[0]?.name
      } to conduct an annual inspection of the ${
        typeof audit['report-type'] !== 'undefined' &&
        audit['report-type'][0]?.name
      } facilities located at ${asset?.name}, ${asset?.address}.`,
    }),
    new Paragraph({
      text: `The facility was visited on the ${dateFormatDay(
        audit['date'],
      )} when a comprehensive visual assessment of the facility was completed.`,
    }),
    new Paragraph({
      text: `During our visit we met with ${audit?.met_with} to discuss the daily operation, maintenance and chemical testing requirements for the swimming and spa pools. We trust this report provides you with the relevant information required to make informed decisions about the facility moving forward.`,
    }),
    new Paragraph({
      text: `The priority works highlighted within this report will enable the facility to continue to be used in the future with reduced operational and minimal maintenance costs.`,
    }),
    new Paragraph({
      text: `We trust this report provides you with the relevant information required to make informed decisions about the facility moving forward. We are happy to meet with you to discuss any aspects of this report in further detail if required, to enable you to have a better understanding of the identified issues and potential costs.`,
    }),
    new Paragraph({
      text: `Thank you for the opportunity to complete this work; we look forward to hearing from you.`,
    }),
    new Paragraph(''),
    outputSignatures(),
  ]
}

const outputCostSummary = () => {
  count += 1
  return [
    new Paragraph({
      text: `${count}. Cost Summary`,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      text: `The recommendations made throughout the condition assessment report have been prioritised below in the following order:`,
    }),
    new Paragraph({
      text: `Refer to Section 13 for detailed information on work recommended and associated costs.`,
    }),
    outputCostSummaryTable(),
  ]
}

const defaultBorders = {
  top: {
    style: BorderStyle.SINGLE,
    color: 'A6A6A6',
  },
  bottom: {
    style: BorderStyle.SINGLE,
    color: 'A6A6A6',
  },
  left: {
    style: BorderStyle.SINGLE,
    color: 'A6A6A6',
  },
  right: {
    style: BorderStyle.SINGLE,
    color: 'A6A6A6',
  },
}

const outputPhotoRow = (photos: any) => {
  return new TableRow({
    children: [1, 2, 3, 4].map(
      (n: any, idx: number) =>
        new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                typeof photos[idx] !== 'undefined' &&
                typeof photos[idx].name !== 'undefined' &&
                typeof allPhotos[photos[idx]?.name] !== 'undefined'
                  ? new ImageRun({
                      data: allPhotos[photos[idx]?.name] ?? '',
                      transformation: {
                        width: 113.5,
                        height: (113.5 / 3) * 4,
                      },
                    })
                  : new TextRun(''),
              ],
              style: 'table',
            }),
          ],

          margins: {
            top: convertInchesToTwip(0.03),
            bottom: convertInchesToTwip(0.03),
            left: convertInchesToTwip(0.03),
            right: convertInchesToTwip(0.03),
          },
          width: {
            size: 25,
            type: WidthType.PERCENTAGE,
          },
          borders: defaultBorders,
        }),
    ),
  })
}

const outputRow = (label: any, comment: any, note?: string) => {
  return new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            text: label + ':',
            style: 'table',
          }),
        ],

        margins: {
          top: convertInchesToTwip(0.07),
          bottom: convertInchesToTwip(0.04),
          left: convertInchesToTwip(0.07),
          right: convertInchesToTwip(0.07),
        },
        width: {
          size: 25,
          type: WidthType.PERCENTAGE,
        },
        borders: defaultBorders,
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: comment,
                bold: label === 'Priority',
              }),
              typeof note !== 'undefined' && note !== ''
                ? new TextRun({ text: 'Note: ' + note, break: 1 })
                : new TextRun(''),
            ],
            style: 'table',
          }),
        ],
        margins: {
          top: convertInchesToTwip(0.07),
          bottom: convertInchesToTwip(0.04),
          left: convertInchesToTwip(0.07),
          right: convertInchesToTwip(0.07),
        },
        columnSpan: 3,
        borders: defaultBorders,
      }),
    ],
  })
}

const outputSignatures = () => {
  const borders = {
    top: {
      style: BorderStyle.NIL,
    },
    bottom: {
      style: BorderStyle.NIL,
    },
    left: {
      style: BorderStyle.NIL,
    },
    right: {
      style: BorderStyle.NIL,
    },
  }
  const margins = {
    top: convertInchesToTwip(0.1),
    bottom: convertInchesToTwip(0.07),
    left: convertInchesToTwip(0.07),
    right: convertInchesToTwip(0.07),
  }

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Report Prepared By:',
                    bold: true,
                  }),
                ],
              }),
            ],
            margins,
            borders,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Report Reviewed By:',
                    bold: true,
                  }),
                ],
              }),
            ],
            margins,
            borders,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              typeof allPhotos['prepared-by-signature'] !== 'undefined'
                ? new Paragraph({
                    children: [
                      new ImageRun({
                        data: allPhotos['prepared-by-signature'],
                        transformation: {
                          width: 200,
                          height: 60,
                        },
                      }),
                    ],
                  })
                : new Paragraph({
                    text: '',
                  }),
            ],
            margins,
            borders,
          }),
          new TableCell({
            children: [
              typeof allPhotos['reviewed-by-signature'] !== 'undefined'
                ? new Paragraph({
                    children: [
                      new ImageRun({
                        data: allPhotos['reviewed-by-signature'],
                        transformation: {
                          width: 200,
                          height: 60,
                        },
                      }),
                    ],
                  })
                : new Paragraph({
                    text: '',
                  }),
            ],
            margins,
            borders,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: audit['prepared-by'],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Amotto Consultancy Ltd',
                    bold: true,
                  }),
                ],
              }),
            ],
            margins,
            borders,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: audit['reviewed-by'],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Amotto Consultancy Ltd',
                    bold: true,
                  }),
                ],
              }),
            ],
            margins,
            borders,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('')],
            borders,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Report Issued:',
                  }),
                  new TextRun({
                    text: ' ',
                  }),
                  new TextRun({
                    text: dateFormatDay(audit['report-date']),
                    bold: true,
                  }),
                ],
              }),
            ],
            margins,
            borders,
          }),
        ],
      }),
    ],
  })
}

const outputCostSummaryRow = (values: any, borders: any, margins: any) => {
  return new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            text: String(values[0]),
            alignment: AlignmentType.CENTER,
          }),
        ],
        margins,
        borders,
        width: {
          size: 10,
          type: WidthType.PERCENTAGE,
        },
      }),
      new TableCell({
        children: [
          new Paragraph({
            text: values[1],
          }),
        ],
        margins,
        borders,
        width: {
          size: 70,
          type: WidthType.PERCENTAGE,
        },
      }),
      new TableCell({
        children: [
          new Paragraph({
            text: String(moneyFormatter.format(values[2] ?? 0)),
            alignment: AlignmentType.RIGHT,
          }),
        ],
        margins,
        borders,
        width: {
          size: 20,
          type: WidthType.PERCENTAGE,
        },
      }),
    ],
  })
}

const outputCostSummaryTable = () => {
  const borders = {
    top: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    bottom: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    left: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    right: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
  }
  const margins = {
    top: convertInchesToTwip(0.07),
    bottom: convertInchesToTwip(0.04),
    left: convertInchesToTwip(0.07),
    right: convertInchesToTwip(0.07),
  }

  const shading = {
    type: ShadingType.CLEAR,
    fill: 'D9E2F3',
  }

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Priority Rating',
                    bold: true,
                  }),
                ],
              }),
            ],
            margins,
            borders,
            width: {
              size: 10,
              type: WidthType.PERCENTAGE,
            },
          }),
          new TableCell({
            shading,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Definition',
                    bold: true,
                  }),
                ],
              }),
            ],
            margins,
            borders,
            width: {
              size: 70,
              type: WidthType.PERCENTAGE,
            },
          }),
          new TableCell({
            shading,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Cost Estimate (ex GST)',
                    bold: true,
                  }),
                ],
              }),
            ],
            margins,
            borders,
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
          }),
        ],
      }),
      outputCostSummaryRow(
        [
          1,
          'Compliance with NZS5826:2010 and NZS4441:2008 or H&S associated work that is required.',
          totals[1] ?? '0.00',
        ],
        borders,
        margins,
      ),
      outputCostSummaryRow(
        [
          2,
          'Priority maintenance works that will need to be completed immediately.',
          totals[2] ?? '0.00',
        ],
        borders,
        margins,
      ),
      outputCostSummaryRow(
        [
          3,
          'Recommended upgrade works that will be required within the next five years.',
          totals[3] ?? '0.00',
        ],
        borders,
        margins,
      ),
      outputCostSummaryRow(
        [
          4,
          'Optional works that could be completed to simply improve the functionality or operations of the facility.',
          totals[4] ?? '0.00',
        ],
        borders,
        margins,
      ),
      new TableRow({
        children: [
          new TableCell({
            shading,
            children: [new Paragraph('')],
            margins,
            borders,
            width: {
              size: 10,
              type: WidthType.PERCENTAGE,
            },
          }),
          new TableCell({
            shading,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Total (excluding GST)',
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins,
            borders,
            width: {
              size: 70,
              type: WidthType.PERCENTAGE,
            },
          }),
          new TableCell({
            shading,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: String(moneyFormatter.format(totals.total ?? 0)),
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins,
            borders,
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
          }),
        ],
      }),
    ],
  })
}

const outputWaterTestingRow = (values: any, borders: any, margins: any) => {
  return new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            text: String(values.test),
            style: 'table',
          }),
        ],
        margins,
        borders,
      }),
      new TableCell({
        children: [
          new Paragraph({
            text: values.values,
            style: 'table',
          }),
        ],
        margins,
        borders,
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: String(values.result ?? ''),
                bold: true,
              }),
            ],
            style: 'table',
          }),
        ],
        margins,
        borders,
      }),
    ],
  })
}

const outputWaterTesting = (type = 'swimming pool') => {
  const borders = {
    top: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    bottom: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    left: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    right: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
  }
  const margins = {
    top: convertInchesToTwip(0.07),
    bottom: convertInchesToTwip(0.04),
    left: convertInchesToTwip(0.07),
    right: convertInchesToTwip(0.07),
  }

  const shading = {
    type: ShadingType.CLEAR,
    fill: 'D9E2F3',
  }

  const tests = [
    {
      test: 'Free Available Chlorine (FAC)',
      values: '3.0-5.0 mg/L',
      result: '3.0 mg/l',
    },
    {
      test: 'Total Available Chlorine (TAC)',
      values: '3.0-5.5 mg/L',
      result: '4.9 mg/l',
    },
    {
      test: 'Combined Available Chlorine (CAC)',
      values: '< 0.5 mg/L',
      result: '1.9 mg/l',
    },
    {
      test: 'pH',
      values: '7.4-7.6',
      result: '7.25',
    },
    {
      test: 'Alkalinity',
      values: '60-120 mg/L',
      result: '115 mg/l',
    },
    {
      test: 'Calcium Hardness',
      values: '40-300 mg/L',
      result: '<<',
    },
    {
      test: 'Total Dissolved Solids (TDS)',
      values: 'Less than 2000 mg/L above make-up water',
      result: '2680 mg/l',
    },
    {
      test: 'Pool Salt Level',
      values: '2500 mg/L',
      result: '-',
    },
  ]

  return [
    new Paragraph(
      `The following are the results of our testing of the ${type} water at the during our visit.`,
    ),
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Chemical Test',
                      bold: true,
                    }),
                  ],
                  style: 'table',
                }),
              ],
              margins,
              borders,
              width: {
                size: 50,
                type: WidthType.PERCENTAGE,
              },
            }),
            new TableCell({
              shading,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'NZS 5826:2010',
                      bold: true,
                    }),
                    new TextRun({
                      text: 'Desirable Values',
                      bold: true,
                      break: 1,
                    }),
                  ],
                  style: 'table',
                  alignment: AlignmentType.CENTER,
                }),
              ],

              margins,
              borders,
              width: {
                size: 30,
                type: WidthType.PERCENTAGE,
              },
            }),
            new TableCell({
              shading,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Site Result',
                      bold: true,
                    }),
                  ],
                  style: 'table',
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins,
              borders,
              width: {
                size: 20,
                type: WidthType.PERCENTAGE,
              },
            }),
          ],
        }),
        ...tests.map((test: any) =>
          outputWaterTestingRow(test, borders, margins),
        ),
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: 'Comment:',
                  style: 'table',
                }),
              ],
              margins,
              borders,
              width: {
                size: 50,
                type: WidthType.PERCENTAGE,
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: 'comments',
                  style: 'table',
                }),
              ],
              margins,
              borders,
              width: {
                size: 50,
                type: WidthType.PERCENTAGE,
              },
              columnSpan: 2,
            }),
          ],
        }),
      ],
    }),
  ]
}

const outputSpecification = (type = 'swimming pool', element: any) => {
  const borders = {
    top: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    bottom: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    left: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    right: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
  }
  const margins = {
    top: convertInchesToTwip(0.07),
    bottom: convertInchesToTwip(0.04),
    left: convertInchesToTwip(0.07),
    right: convertInchesToTwip(0.07),
  }

  const shading = {
    type: ShadingType.CLEAR,
    fill: 'D9E2F3',
  }

  const elementSpecifications = !isEmpty(element['pool-specification'])
    ? element['pool-specification'][0] ?? []
    : []

  const specifications = Object.keys(elementSpecifications)
    .filter(
      (k: any) =>
        !isEmpty(poolSpecificationQuestions[k]) &&
        elementSpecifications[k] !== '',
    )
    .map((k: any) => ({
      specification: poolSpecificationQuestions[k],
      value: elementSpecifications[k],
    }))

  if (specifications.length === 0) {
    return []
  }

  return [
    new Paragraph(`The specifications for the ${type} are as follows:`),
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        ...specifications.map(
          ({ specification, value }: any) =>
            new TableRow({
              children: [
                new TableCell({
                  shading,
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: specification,
                        }),
                      ],
                      style: 'table',
                    }),
                  ],
                  margins,
                  borders,
                  width: {
                    size: 70,
                    type: WidthType.PERCENTAGE,
                  },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: value,
                        }),
                      ],
                      style: 'table',
                      alignment: AlignmentType.CENTER,
                    }),
                  ],

                  margins,
                  borders,
                  width: {
                    size: 30,
                    type: WidthType.PERCENTAGE,
                  },
                }),
              ],
            }),
        ),
      ],
    }),
  ]
}

const outputFooter = () => {
  const borders = {
    top: {
      style: BorderStyle.SINGLE,
      color: 'A6A6A6',
    },
    bottom: {
      style: BorderStyle.NIL,
    },
    left: {
      style: BorderStyle.NIL,
    },
    right: {
      style: BorderStyle.NIL,
    },
  }
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                text: audit.monthYear,
                style: 'footer',
              }),
            ],
            margins: {
              top: convertInchesToTwip(0.1),
              bottom: convertInchesToTwip(0.07),
              left: convertInchesToTwip(0.07),
              right: convertInchesToTwip(0.07),
            },
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            borders,
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: `${asset?.name} ${audit.title || 'Site Audit Report'}`,
                style: 'footer',
              }),
            ],
            margins: {
              top: convertInchesToTwip(0.1),
              bottom: convertInchesToTwip(0.07),
              left: convertInchesToTwip(0.07),
              right: convertInchesToTwip(0.07),
            },
            borders,
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    children: [PageNumber.CURRENT],
                  }),
                ],
                style: 'footer',
              }),
            ],
            margins: {
              top: convertInchesToTwip(0.1),
              bottom: convertInchesToTwip(0.07),
              left: convertInchesToTwip(0.07),
              right: convertInchesToTwip(0.07),
            },
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            borders,
          }),
        ],
      }),
    ],
  })
}

const outputLastPage = () => {
  return {
    properties: {
      page: {
        size: {
          orientation: PageOrientation.LANDSCAPE,
        },
        margin: {
          right: 1137,
        },
      },
    },
    children: [
      new Paragraph({
        text: `${count}. Cost Summary of Recommendations`,
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        text: `The recommendations made throughout this document have been prioritised below in the following order:`,
      }),
      new Paragraph({
        text: `Compliance with NZS5826:2010 and NZS4441:2008 or H&S associated work that is required`,
        numbering: {
          reference: 'lastpage',
          level: 0,
        },
      }),
      new Paragraph({
        text: `Priority maintenance works that will need to be completed immediately.`,
        numbering: {
          reference: 'lastpage',
          level: 0,
        },
      }),
      new Paragraph({
        text: `Recommended upgrade works that will be required within the next five years.`,
        numbering: {
          reference: 'lastpage',
          level: 0,
        },
      }),
      new Paragraph({
        text: `Optional works that could be completed to simply improve the functionality or operations of the facility.`,
        numbering: {
          reference: 'lastpage',
          level: 0,
        },
      }),
      outputCostRecommendationSummaryTable(),
    ],
  }
}

const outputCostRecommendationSummaryItems = (borders: any, margins: any) => {
  let results: any = []

  Object.values(summarySections).forEach((section: any) => {
    const elements = Object.values(section?.elements).filter(
      (element: any) => element.budget && String(element.budget) !== '',
    )
    elements.forEach((element: any, idx: number) => {
      results = [
        ...results,
        new TableRow({
          children: [
            ...(idx === 0
              ? [
                  new TableCell({
                    margins,
                    borders,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: section.name,
                          }),
                        ],
                        style: 'table-summary',
                      }),
                    ],
                    rowSpan: elements.length,
                  }),
                ]
              : []),
            new TableCell({
              margins,
              borders,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: element.ref,
                    }),
                  ],
                  style: 'table-summary',
                  alignment: AlignmentType.RIGHT,
                }),
              ],
            }),
            new TableCell({
              margins,
              borders,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: element.recommendations,
                    }),
                  ],
                  style: 'table-summary',
                }),
              ],
            }),
            ...[1, 2, 3, 4].map(
              (number: any) =>
                new TableCell({
                  margins,
                  borders,
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text:
                            element.priority === String(number)
                              ? String(
                                  moneyFormatter.format(element.budget ?? 0),
                                )
                              : '',
                        }),
                      ],
                      style: 'table-summary',
                      alignment: AlignmentType.RIGHT,
                    }),
                  ],
                }),
            ),
          ],
        }),
      ]
    })
  })

  return results
}

const outputCostRecommendationSummaryTable = () => {
  const borders = {
    top: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    bottom: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    left: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
    right: {
      color: 'A6A6A6',
      style: BorderStyle.SINGLE,
    },
  }
  const margins = {
    top: convertInchesToTwip(0.07),
    bottom: convertInchesToTwip(0.04),
    left: convertInchesToTwip(0.07),
    right: convertInchesToTwip(0.07),
  }

  const shading = {
    type: ShadingType.CLEAR,
    fill: 'D9E2F3',
  }

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            shading,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Section',
                    bold: true,
                  }),
                ],
                style: 'table-summary',
              }),
            ],
            margins,
            borders,
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            rowSpan: 2,
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            shading,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Ref. No.',
                    bold: true,
                  }),
                ],
                style: 'table-summary',
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins,
            borders,
            width: {
              size: 10,
              type: WidthType.PERCENTAGE,
            },
            rowSpan: 2,
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            shading,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Recommendation',
                    bold: true,
                  }),
                ],
                style: 'table-summary',
              }),
            ],
            margins,
            borders,
            width: {
              size: 35,
              type: WidthType.PERCENTAGE,
            },
            rowSpan: 2,
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            shading,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Priority of Works',
                    bold: true,
                  }),
                ],
                style: 'table-summary',
              }),
            ],
            margins,
            borders,
            width: {
              size: 35,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 4,
          }),
        ],
      }),
      new TableRow({
        tableHeader: true,
        children: [1, 2, 3, 4].map(
          (number: any) =>
            new TableCell({
              shading,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: String(number),
                      bold: true,
                    }),
                  ],
                  style: 'table-summary',
                }),
              ],
              width: {
                size: 8.75,
                type: WidthType.PERCENTAGE,
              },
              margins,
              borders,
            }),
        ),
      }),
      ...outputCostRecommendationSummaryItems(borders, margins),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Totals',
                    bold: true,
                  }),
                ],
                style: 'table-summary',
                alignment: AlignmentType.RIGHT,
              }),
            ],
            margins,
            borders,
            columnSpan: 3,
          }),
          ...[1, 2, 3, 4].map(
            (number: any) =>
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: String(
                          moneyFormatter.format(totals[number] ?? 0),
                        ),
                        bold: true,
                      }),
                    ],
                    style: 'table-summary',
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
                margins,
                borders,
              }),
          ),
        ],
      }),
    ],
  })
}

const calculateCosts = () => {
  audit.section?.forEach((section: any) => {
    section?.element?.forEach((element: any) => {
      if (
        typeof element?.priority === 'undefined' ||
        element?.priority === ''
      ) {
        return
      }
      if (typeof totals[element.priority] === 'undefined') {
        totals[element.priority] = 0
      }
      totals[element.priority] += Number(element.budget?.replace(',', '') ?? 0)
      totals.total += Number(element.budget?.replace(',', '') ?? 0)
    })
  })
}

const loadAllPhotos = async () => {
  return Promise.all([
    new Promise(async (resolve) => {
      const photo = audit['prepared-by-signature']
      if (typeof photo === 'undefined') {
        return resolve(true)
      }
      allPhotos['prepared-by-signature'] = await loadImage(
        photo[0]?.path ?? photo[0]?.value,
        true,
      )
      resolve(true)
    }),
    new Promise(async (resolve) => {
      const photo = audit['reviewed-by-signature']
      if (typeof photo === 'undefined') {
        return resolve(true)
      }
      allPhotos['reviewed-by-signature'] = await loadImage(
        photo[0]?.path ?? photo[0]?.value,
        true,
      )
      resolve(true)
    }),

    ...(audit.section ?? []).map((section: any) => {
      return new Promise((resolve) => {
        const elements = section.element?.filter(
          (element: any) =>
            typeof element.photo_1 !== 'undefined' ||
            typeof element.photo_2 !== 'undefined' ||
            typeof element.photo_3 !== 'undefined' ||
            typeof element.photo_4 !== 'undefined',
        )

        if (!elements || elements.length === 0) {
          return resolve(true)
        }

        return Promise.all([
          ...elements.map((element: any) => {
            return Promise.all(
              [
                element.photo_1,
                element.photo_2,
                element.photo_3,
                element.photo_4,
              ].map((photo: any) => {
                return new Promise(async (resolve2) => {
                  if (
                    typeof photo === 'undefined' ||
                    !photo ||
                    photo.name === ''
                  ) {
                    return resolve2(true)
                  }
                  allPhotos[photo.name] = await loadImage(photo?.value)
                  resolve2(true)
                })
              }),
            )
          }),
        ]).then(resolve)
      })
    }),
  ])
}

const styles = {
  default: {
    document: {
      run: {
        font: 'Century Gothic',
        size: 21,
      },
      paragraph: {
        spacing: {
          after: 120,
        },
      },
    },
    heading1: {
      run: {
        font: 'Century Gothic',
        size: 40,
        bold: true,
        underline: {
          type: UnderlineType.SINGLE,
          color: '4472C4',
        },
      },
      paragraph: {
        spacing: {
          after: 300,
        },
      },
    },
    heading2: {
      run: {
        font: 'Century Gothic',
        size: 28,
        bold: true,
      },
      paragraph: {
        spacing: {
          before: 240,
          after: 120,
        },
      },
    },
  },
  paragraphStyles: [
    {
      id: 'table',
      name: 'Table',
      basedOn: 'Normal',
      next: 'Normal',
      paragraph: {
        spacing: {
          after: 0,
        },
      },
    },
    {
      id: 'table-summary',
      name: 'Table Summary',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 18,
      },
      paragraph: {
        spacing: {
          after: 0,
        },
      },
    },
    {
      id: 'footer',
      name: 'Footer',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 18,
      },
    },
    {
      id: 'frontheading',
      name: 'Front Heading',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 28,
      },
      paragraph: {
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 240,
        },
      },
    },
    {
      id: 'frontheadingsml',
      name: 'Front Heading Small',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 36,
      },
      paragraph: {
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 120,
        },
      },
    },
    {
      id: 'frontheadingmid',
      name: 'Front Heading Mid',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 40,
        bold: true,
      },
      paragraph: {
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 120,
        },
      },
    },
    {
      id: 'frontheadingmid2',
      name: 'Front Heading Mid 2',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 48,
      },
      paragraph: {
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 120,
        },
      },
    },
    {
      id: 'frontheadingbig',
      name: 'Front Heading Big',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 60,
        bold: true,
      },
      paragraph: {
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 120,
        },
      },
    },
    {
      id: 'heading',
      name: 'Heading',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        font: 'Century Gothic',
        size: 28,
        bold: true,
        underline: {
          type: UnderlineType.SINGLE,
          color: '4472C4',
        },
      },
      paragraph: {
        spacing: {
          after: 240,
        },
      },
    },
    {
      id: 'subheading',
      name: 'Subheading',
      basedOn: 'Normal',
      next: 'Normal',
      run: {
        size: 28,
        bold: true,
      },
    },
  ],
}

function WordBuilder({ id, row, ...props }: any) {
  id = row.id ?? ''
  const { get } = useAPI()
  const [building, setBuilding] = useState(false)

  const { data: poolSpecificationForm } = useForm({
    queryKey: ['form', 'poolspecification'],
    formId: 'pool-specification',
  })

  async function generateWordDocument() {
    setBuilding(true)
    count = 0
    const data = await get({
      endpoint: 'd/pool-audit/' + id + '?with=audit,section,element',
    })

    poolSpecificationQuestions = Object.fromEntries(
      poolSpecificationForm.questions?.map((question: any) => [
        question.reference,
        question.text,
      ]),
    )

    // console.log(poolSpecificationQuestions)
    // setBuilding(false)
    // return

    audit = data
    asset =
      typeof audit.asset !== 'undefined' &&
      typeof audit.asset[0] !== 'undefined'
        ? audit.asset[0]
        : {}

    await loadAllPhotos()

    audit.monthYear = dateFormat(audit.date)

    calculateCosts()

    const margin = {
      right: 1137,
    }

    const sectionProperties = {
      page: {
        margin,
      },
    }

    const doc = new Document({
      features: {
        updateFields: true,
      },
      numbering: {
        config: [
          {
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: '%1.',
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: {
                      left: convertInchesToTwip(0.5),
                      hanging: convertInchesToTwip(0.18),
                    },
                  },
                },
              },
            ],
            reference: 'lastpage',
          },
        ],
      },
      styles,
      sections: [
        {
          properties: {
            titlePage: true,
            page: {
              margin,
              pageNumbers: {
                start: 0,
              },
            },
          },

          headers: {
            first: new Header({
              children: [
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: amottoHeaderImage,
                      transformation: {
                        width: 800,
                        height: 550,
                      },
                      floating: {
                        zIndex: 5,
                        horizontalPosition: {
                          relative: HorizontalPositionRelativeFrom.PAGE,
                          align: HorizontalPositionAlign.RIGHT,
                        },
                        verticalPosition: {
                          relative: VerticalPositionRelativeFrom.PAGE,
                          align: VerticalPositionAlign.TOP,
                        },
                      },
                    }),
                  ],
                }),
              ],
            }),
          },
          footers: {
            first: new Footer({
              children: [new Paragraph(''), outputFooter()],
            }),
            default: new Footer({
              children: [new Paragraph(''), outputFooter()],
            }),
          },
          children: [
            ...addParagraphs(4),
            new Paragraph({
              children: [
                new ImageRun({
                  data: await loadImage(asset?.photo?.value),
                  transformation: {
                    width: 500,
                    height: 500,
                  },
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            ...addParagraphs(2),
            new Paragraph({
              text: audit.title,
              style: 'frontheadingmid2',
            }),
            new Paragraph(''),
            new Paragraph({
              text: '',
              border: {
                top: {
                  color: 'D9D9D9',
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 40,
                },
              },
            }),
            new Paragraph({
              text:
                typeof audit['report-type'] !== 'undefined' &&
                audit['report-type'][0]?.name,
              style: 'frontheadingbig',
            }),
            new Paragraph({
              text: asset?.name,
              style: 'frontheadingmid',
            }),
            new Paragraph({
              text: audit.monthYear,
              style: 'frontheadingsml',
            }),
          ],
        },
        {
          properties: sectionProperties,
          children: [
            ...addParagraphs(7),
            new Paragraph({
              text: 'Disclaimer',
              style: 'subheading',
            }),
            new Paragraph(''),
            new Paragraph({
              text: 'Information enclosed within this report has been obtained from sources that Amotto Consultancy believes to be reliable. This information has been used in good faith and Amotto Consultancy therefore gives no warranty for the accuracy of this information.',
            }),
            ...addParagraphs(18),
            new Paragraph({
              text: 'Copyright © Amotto Consultancy Ltd',
              style: 'subheading',
            }),
            new Paragraph({
              text: 'Amy Waller asserts the moral right to be identified as the author of all the procedures and recommendations produced in this document.',
            }),
            new Paragraph({
              text: 'All rights reserved. No part of this document may be reproduced, stored or transmitted without prior permission of Amotto Consultancy Ltd.',
            }),
          ],
        },
        {
          properties: sectionProperties,
          children: [
            new Paragraph({
              text: 'Table of contents',
              style: 'heading',
            }),
            new TableOfContents('Summary', {
              hyperlink: true,
              headingStyleRange: '1-5',
            }),
          ],
        },
        { properties: sectionProperties, children: outputIntroduction() },
        { properties: sectionProperties, children: outputReportSummary() },
        { properties: sectionProperties, children: outputCostSummary() },
        ...data?.section
          ?.filter((section: any) => Number(section.enabled) === 1)
          ?.sort((a: any, b: any) => a.order - b.order)
          ?.map((section: any) => {
            count += 1
            let subCount = 0
            let elements: any = []
            section?.element
              ?.filter((element: any) => Number(element.hide) !== 1)
              ?.sort((a: any, b: any) => a.order - b.order)
              ?.forEach((element: any) => {
                subCount += 1
                const photos = [
                  element?.photo_1,
                  element?.photo_2,
                  element?.photo_3,
                  element?.photo_4,
                ].filter((photo: any) => typeof photo !== 'undefined')

                const photoRows: any =
                  photos.length > 0 ? [outputPhotoRow(photos)] : []

                const rows: TableRow[] = [
                  ...photoRows,
                  outputRow('Comments', element?.comments),
                  outputRow(
                    'Recommendations',
                    ['1', 'true'].includes(String(element['no-further-action']))
                      ? 'No further action required.'
                      : element?.recommendations,
                    element?.notes,
                  ),
                  outputRow('Priority', element?.priority),
                  outputRow(
                    'Budget estimate',
                    moneyFormatter.format(
                      element?.budget?.replace(',', '') ?? 0,
                    ),
                  ),
                ].filter((row: any) => row !== null)

                if (typeof summarySections[section.name] === 'undefined') {
                  summarySections[section.name] = {
                    name: section.name,
                    elements: {},
                  }
                }

                if (
                  typeof summarySections[section.name].elements[
                    element.name
                  ] === 'undefined' &&
                  element?.budget !== '' &&
                  element?.budget !== '0'
                ) {
                  summarySections[section.name].elements[element.name] = {
                    ref: `${count}.${subCount}`,
                    recommendations: element.recommendations,
                    priority: element.priority,
                    budget: element?.budget?.replace(',', '') ?? 0,
                  }
                }

                if (
                  typeof element['swimming-pool-testing'] !== 'undefined' &&
                  Number(element['swimming-pool-testing']) === 1
                ) {
                  elements = [
                    ...elements,
                    new Paragraph({
                      text: `${count}.${subCount} ${element.name}`,
                      heading: HeadingLevel.HEADING_2,
                    }),
                    ...outputWaterTesting(),
                  ]
                  return
                }

                if (
                  typeof element['spa-pool-testing'] !== 'undefined' &&
                  Number(element['spa-pool-testing']) === 1
                ) {
                  elements = [
                    ...elements,
                    new Paragraph({
                      text: `${count}.${subCount} ${element.name}`,
                      heading: HeadingLevel.HEADING_2,
                    }),
                    ...outputWaterTesting('spa pool'),
                  ]
                  return
                }

                if (
                  typeof element['swimming-pool-specification'] !==
                    'undefined' &&
                  Number(element['swimming-pool-specification']) === 1
                ) {
                  elements = [
                    ...elements,
                    new Paragraph({
                      text: `${count}.${subCount} ${element.name}`,
                      heading: HeadingLevel.HEADING_2,
                    }),
                    ...outputSpecification('swimming pool', element),
                    new Paragraph(''),
                    new Table({
                      width: {
                        size: 100,
                        type: WidthType.PERCENTAGE,
                      },
                      rows,
                    }),
                  ]
                  return
                }

                if (
                  typeof element['spa-pool-specification'] !== 'undefined' &&
                  Number(element['spa-pool-specification']) === 1
                ) {
                  elements = [
                    ...elements,
                    new Paragraph({
                      text: `${count}.${subCount} ${element.name}`,
                      heading: HeadingLevel.HEADING_2,
                    }),
                    ...outputSpecification('spa pool', element),
                    new Paragraph(''),
                    new Table({
                      width: {
                        size: 100,
                        type: WidthType.PERCENTAGE,
                      },
                      rows,
                    }),
                  ]
                  return
                }

                elements = [
                  ...elements,
                  new Paragraph({
                    text: `${count}.${subCount} ${element.name}`,
                    heading: HeadingLevel.HEADING_2,
                  }),
                  new Table({
                    width: {
                      size: 100,
                      type: WidthType.PERCENTAGE,
                    },
                    rows,
                  }),
                ]
              })

            return {
              properties: sectionProperties,
              children: [
                new Paragraph({
                  text: `${count}. ${section.name}`,
                  heading: HeadingLevel.HEADING_1,
                }),
                ...elements,
              ],
            }
          }),
        outputLastPage(),
      ],
    })

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'audit.docx')
    })
    setBuilding(false)
  }

  return (
    <Button
      onClick={generateWordDocument}
      text={
        building ? (
          <Loader
            size="1.5rem"
            style={{
              borderTopColor: '#fff',
              borderLeftColor: '#fff',
              borderRightColor: '#fff',
            }}
          />
        ) : (
          'Word'
        )
      }
      icon="file"
      tooltip="Generate a word document from this audit"
    />
  )
}

export default WordBuilder

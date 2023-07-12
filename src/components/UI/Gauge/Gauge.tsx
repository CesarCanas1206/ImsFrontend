export const settings = [
  {
    name: 'type',
    label: 'Risk',
    type: 'Radios',
    options: [
      {
        name: 'Low',
        value: 'low',
      },
      {
        name: 'Medium',
        value: 'medium',
      },
      {
        name: 'High',
        value: 'high',
      },
    ],
  },
  {
    name: 'showBadge',
    label: 'Show badge',
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

export interface GaugeType {
  type?: string
  showBadge?: boolean
}

export function Gauge({ type = 'medium', showBadge = false }: any) {
  const lineRotates: any = {
    low: 'rotate(-60deg)',
    high: 'rotate(60deg)',
  }

  const labels: any = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  }

  return (
    <>
      <svg
        id="gauge"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 180"
        style={{ transform: 'rotate(90deg)', height: '50px', width: '50px' }}
      >
        <path
          id="0"
          fill="transparent"
          d="M90, 0 A90,90 0 0 1 90.00785398162398,179.9999996573054 L90.00349065849954,129.9999998476913 A40,40 0 0 0 90,50 Z"
        ></path>
        <path
          id="1"
          fill="#419641"
          d="M90.00785398162398, 179.9999996573054 A90,90 0 0 1 12.062950174757546,135.0090686921833 L55.36131118878113,110.00403052985925 A40,40 0 0 0 90.00349065849954,129.9999998476913 Z"
        ></path>
        <path
          id="2"
          fill="#eb9316"
          d="M12.062950174757546, 135.0090686921833 A90,90 0 0 1 12.05116949912366,45.01133672195127 L55.356075332943846,70.00503854308946 A40,40 0 0 0 55.36131118878113,110.00403052985925 Z"
        ></path>
        <path
          id="3"
          fill="#c12e2a"
          d="M12.05116949912366, 45.01133672195127 A90,90 0 0 1 89.98429203681187,0.0000013707783779182137 L89.99301868302749,50.00000060923484 A40,40 0 0 0 55.356075332943846,70.00503854308946 Z"
        ></path>
        <line
          xmlns="http://www.w3.org/2000/svg"
          x1="90"
          y1="90"
          x2="30"
          y2="90"
          style={{
            stroke: '#000',
            strokeWidth: '4px',
            transformBox: 'fill-box',
            transformOrigin: 'right',
            transform: lineRotates[type] ?? '',
          }}
        ></line>
      </svg>
      {showBadge && (
        <div className="badge bg-warning text-white">{labels[type]}</div>
      )}
    </>
  )
}

export default Gauge

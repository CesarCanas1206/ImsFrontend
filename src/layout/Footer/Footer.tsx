import { useMemo } from 'react'

interface IFooter {
  settings?: any
}

export default function Footer({ settings }: IFooter) {
  const footerLogo = useMemo(() => {
    return (
      settings &&
      typeof settings['footer-logo'] !== 'undefined' && (
        <img
          alt={settings.name ?? 'IMS'}
          src={settings['footer-logo']?.value ?? settings['footer-logo']}
          style={{ maxWidth: '90%' }}
        />
      )
    )
  }, [settings])

  return (
    <footer
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 12,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
      }}
    >
      {footerLogo}
      <div>© {new Date().getFullYear()} Integrated Monitoring Systems</div>
    </footer>
  )
}

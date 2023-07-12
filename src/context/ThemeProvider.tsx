import { MantineProvider } from '@mantine/core'

const styles = {
  fontFamily: 'var(--c-fonts)',
  components: {
    Button: {
      variants: {
        filled: (theme: any) => ({
          root: {
            backgroundColor: '#2e53da',
            color: '#fff',
            ...theme.fn.hover({ backgroundColor: '#4C76E8' }),
          },
        }),
        primary: (theme: any) => ({
          root: {
            backgroundColor: '#2e53da',
            color: '#fff',
            ...theme.fn.hover({ backgroundColor: '#4C76E8' }),
          },
        }),
        danger: (theme: any) => ({
          root: {
            backgroundColor: '#c12e2a',
            color: 'white',
            ...theme.fn.hover({ backgroundColor: theme.colors.red[8] }),
          },
        }),
        info: (theme: any) => ({
          root: {
            backgroundColor: theme.colors.cyan[6],
            color: 'white',
            ...theme.fn.hover({ backgroundColor: theme.colors.cyan[8] }),
          },
        }),
        success: (theme: any) => ({
          root: {
            backgroundColor: '#419641',
            color: 'white',
            ...theme.fn.hover({ backgroundColor: theme.colors.green[8] }),
          },
        }),
        warning: (theme: any) => ({
          root: {
            backgroundColor: theme.colors.yellow[6],
            color: 'white',
            ...theme.fn.hover({
              backgroundColor: theme.colors.yellow[8],
            }),
          },
        }),
        secondary: (theme: any) => ({
          root: {
            backgroundColor: '#5c636a',
            color: 'white',
            ...theme.fn.hover({ backgroundColor: theme.colors.gray[6] }),
          },
        }),
        'primary-light': (theme: any) => ({
          root: {
            backgroundColor: '#e7f5ff',
            color: '#228be6',
            ...theme.fn.hover({ backgroundColor: theme.colors.blue[1] }),
          },
        }),
        'danger-light': (theme: any) => ({
          root: {
            backgroundColor: '#FBD9DB',
            color: '#fa5252',
            ...theme.fn.hover({ backgroundColor: theme.colors.red[1] }),
          },
        }),
        'info-light': (theme: any) => ({
          root: {
            backgroundColor: theme.colors.cyan[1],
            color: theme.colors.cyan[6],
            ...theme.fn.hover({ backgroundColor: theme.colors.cyan[0] }),
          },
        }),
        'success-light': (theme: any) => ({
          root: {
            backgroundColor: '#C7F8C7',
            color: '#419641',
            ...theme.fn.hover({ backgroundColor: theme.colors.green[1] }),
          },
        }),
        'warning-light': (theme: any) => ({
          root: {
            backgroundColor: theme.colors.yellow[3],
            color: theme.colors.yellow[6],
            ...theme.fn.hover({
              backgroundColor: theme.colors.yellow[1],
            }),
          },
        }),
        'secondary-light': (theme: any) => ({
          root: {
            backgroundColor: '#88A2FF',
            color: '#5c636a',
            ...theme.fn.hover({ backgroundColor: theme.colors.gray[1] }),
          },
        }),
        'primary-menu': (theme: any) => ({
          root: {
            color: '#228be6',
            backgroundColor: '#fff',
            ...theme.fn.hover({
              backgroundColor: theme.colors.blue[1],
            }),
          },
        }),
        'danger-menu': (theme: any) => ({
          root: {
            color: '#fa5252',
            backgroundColor: 'white',
            ...theme.fn.hover({ backgroundColor: theme.colors.red[1] }),
          },
        }),
        'info-menu': (theme: any) => ({
          root: {
            color: theme.colors.cyan[6],
            backgroundColor: 'white',
            ...theme.fn.hover({ backgroundColor: theme.colors.cyan[1] }),
          },
        }),
        'success-menu': (theme: any) => ({
          root: {
            color: '#419641',
            backgroundColor: 'white',
            ...theme.fn.hover({ backgroundColor: theme.colors.green[1] }),
          },
        }),
        'warning-menu': (theme: any) => ({
          root: {
            color: theme.colors.yellow[6],
            backgroundColor: 'white',
            ...theme.fn.hover({
              backgroundColor: theme.colors.yellow[1],
            }),
          },
        }),
        'secondary-menu': (theme: any) => ({
          root: {
            color: '#5c636a',
            backgroundColor: 'white',
            ...theme.fn.hover({ backgroundColor: theme.colors.gray[1] }),
          },
        }),
        'primary-outline': (theme: any) => ({
          root: {
            color: '#228be6',
            backgroundColor: '#fff',
            borderColor: '#228be6',
            borderWidth: 1,
            borderStyle: 'solid',
            ...theme.fn.hover({
              backgroundColor: theme.colors.blue[1],
            }),
          },
        }),
        'danger-outline': (theme: any) => ({
          root: {
            color: '#fa5252',
            backgroundColor: 'white',
            borderColor: '#fa5252',
            borderWidth: 1,
            borderStyle: 'solid',
            ...theme.fn.hover({ backgroundColor: theme.colors.red[1] }),
          },
        }),
        'info-outline': (theme: any) => ({
          root: {
            color: theme.colors.cyan[6],
            backgroundColor: 'white',
            borderColor: theme.colors.cyan[6],
            borderWidth: 1,
            borderStyle: 'solid',
            ...theme.fn.hover({ backgroundColor: theme.colors.cyan[1] }),
          },
        }),
        'success-outline': (theme: any) => ({
          root: {
            color: '#419641',
            borderColor: '#419641',
            borderWidth: 1,
            borderStyle: 'solid',
            backgroundColor: 'white',
            ...theme.fn.hover({ backgroundColor: theme.colors.green[1] }),
          },
        }),
        'warning-outline': (theme: any) => ({
          root: {
            color: theme.colors.yellow[6],
            backgroundColor: 'white',
            borderColor: theme.colors.yellow[6],
            borderWidth: 1,
            borderStyle: 'solid',
            ...theme.fn.hover({
              backgroundColor: theme.colors.yellow[1],
            }),
          },
        }),
        'secondary-outline': (theme: any) => ({
          root: {
            color: '#5c636a',
            backgroundColor: 'white',
            borderColor: '#5c636a',
            borderWidth: 1,
            borderStyle: 'solid',
            ...theme.fn.hover({ backgroundColor: theme.colors.gray[1] }),
          },
        }),
      },
    },
  },
}

function ThemeProvider({ children }: any) {
  return <MantineProvider theme={styles}>{children}</MantineProvider>
}

export default ThemeProvider

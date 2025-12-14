import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B7355', // Darker, richer brown - different from logo subtext
      light: '#A38A70',
      dark: '#6E5A42',
      contrastText: '#fefcfc',
    },
    secondary: {
      main: '#665d5d', // Logo subtext as secondary (was primary before)
      light: '#8a7f7f',
      dark: '#4a4242',
      contrastText: '#fefcfc',
    },
    accent: {
      main: '#dcccc0', // Logo background as accent
      light: '#ebe0d6',
      dark: '#c9b7a8',
      contrastText: '#665d5d',
    },
    background: {
      default: '#FAF8F5', // Warmer, creamier off-white
      paper: '#fefcfc', // Logo text color for paper
      dark: '#3A3430', // Deeper charcoal-brown
    },
    text: {
      primary: '#3A3430', // Deep warm charcoal for readability
      secondary: '#665d5d', // Logo subtext for secondary text
      disabled: '#A8A09D',
    },
    success: {
      main: '#28A745',
      light: '#48C774',
      dark: '#1E8135',
    },
    error: {
      main: '#DC3545',
      light: '#E65C6A',
      dark: '#BD2130',
    },
    warning: {
      main: '#FFC107',
      light: '#FFD54F',
      dark: '#FFA000',
    },
    info: {
      main: '#17A2B8',
      light: '#3FC1D6',
      dark: '#138496',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: '"Inter", "Work Sans", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '3.5rem',
      fontWeight: 900,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (max-width:900px)': {
        fontSize: '2.75rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2.25rem',
      },
    },
    h2: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '2.75rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      '@media (max-width:900px)': {
        fontSize: '2.25rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.875rem',
      },
    },
    h3: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      '@media (max-width:900px)': {
        fontSize: '1.875rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.375rem',
      },
    },
    h5: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '1.375rem',
      fontWeight: 700,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.9375rem',
      fontWeight: 600,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 700,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(58, 52, 48, 0.05), 0px 1px 2px rgba(58, 52, 48, 0.03)',
    '0px 4px 8px rgba(58, 52, 48, 0.06), 0px 2px 4px rgba(58, 52, 48, 0.03)',
    '0px 6px 12px rgba(58, 52, 48, 0.08), 0px 3px 6px rgba(58, 52, 48, 0.04)',
    '0px 8px 16px rgba(58, 52, 48, 0.1), 0px 4px 8px rgba(58, 52, 48, 0.05)',
    '0px 10px 20px rgba(58, 52, 48, 0.12), 0px 5px 10px rgba(58, 52, 48, 0.06)',
    '0px 12px 24px rgba(58, 52, 48, 0.14), 0px 6px 12px rgba(58, 52, 48, 0.07)',
    '0px 14px 28px rgba(58, 52, 48, 0.16), 0px 7px 14px rgba(58, 52, 48, 0.08)',
    '0px 16px 32px rgba(58, 52, 48, 0.18), 0px 8px 16px rgba(58, 52, 48, 0.09)',
    '0px 18px 36px rgba(58, 52, 48, 0.2), 0px 9px 18px rgba(58, 52, 48, 0.1)',
    '0px 20px 40px rgba(58, 52, 48, 0.22), 0px 10px 20px rgba(58, 52, 48, 0.11)',
    '0px 22px 44px rgba(58, 52, 48, 0.24), 0px 11px 22px rgba(58, 52, 48, 0.12)',
    '0px 24px 48px rgba(58, 52, 48, 0.26), 0px 12px 24px rgba(58, 52, 48, 0.13)',
    '0px 26px 52px rgba(58, 52, 48, 0.28), 0px 13px 26px rgba(58, 52, 48, 0.14)',
    '0px 28px 56px rgba(58, 52, 48, 0.3), 0px 14px 28px rgba(58, 52, 48, 0.15)',
    '0px 30px 60px rgba(58, 52, 48, 0.32), 0px 15px 30px rgba(58, 52, 48, 0.16)',
    '0px 32px 64px rgba(58, 52, 48, 0.34), 0px 16px 32px rgba(58, 52, 48, 0.17)',
    '0px 34px 68px rgba(58, 52, 48, 0.36), 0px 17px 34px rgba(58, 52, 48, 0.18)',
    '0px 36px 72px rgba(58, 52, 48, 0.38), 0px 18px 36px rgba(58, 52, 48, 0.19)',
    '0px 38px 76px rgba(58, 52, 48, 0.4), 0px 19px 38px rgba(58, 52, 48, 0.2)',
    '0px 40px 80px rgba(58, 52, 48, 0.42), 0px 20px 40px rgba(58, 52, 48, 0.21)',
    '0px 42px 84px rgba(58, 52, 48, 0.44), 0px 21px 42px rgba(58, 52, 48, 0.22)',
    '0px 44px 88px rgba(58, 52, 48, 0.46), 0px 22px 44px rgba(58, 52, 48, 0.23)',
    '0px 46px 92px rgba(58, 52, 48, 0.48), 0px 23px 46px rgba(58, 52, 48, 0.24)',
    '0px 48px 96px rgba(58, 52, 48, 0.5), 0px 24px 48px rgba(58, 52, 48, 0.25)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '0.9375rem',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(26, 26, 46, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '8px 20px',
          fontSize: '0.875rem',
        },
        contained: {
          boxShadow: '0px 2px 8px rgba(26, 26, 46, 0.1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #A38A70 0%, #8B7355 70%, #6E5A42 100%)',
          boxShadow: '0 4px 12px rgba(139, 115, 85, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fefcfc !important',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: '#6E5A42 !important',
            boxShadow: '0px 6px 16px rgba(139, 115, 85, 0.45)',
            color: '#fefcfc !important',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #8a7f7f 0%, #665d5d 70%, #4a4242 100%)',
          boxShadow: '0 4px 12px rgba(102, 93, 93, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fefcfc',
          '&:hover': {
            background: '#4a4242',
            boxShadow: '0px 6px 16px rgba(102, 93, 93, 0.4)',
            color: '#fefcfc',
          },
        },
        outlinedPrimary: {
          borderColor: '#8B7355',
          color: '#8B7355',
          '&:hover': {
            borderColor: '#6E5A42',
            backgroundColor: 'rgba(139, 115, 85, 0.08)',
            color: '#6E5A42',
          },
        },
        outlinedSecondary: {
          borderColor: '#665d5d',
          color: '#665d5d',
          '&:hover': {
            borderColor: '#4a4242',
            backgroundColor: 'rgba(102, 93, 93, 0.08)',
            color: '#4a4242',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 16px rgba(26, 26, 46, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(26, 26, 46, 0.12)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(26, 26, 46, 0.04)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(26, 26, 46, 0.06)',
        },
        elevation3: {
          boxShadow: '0px 6px 16px rgba(26, 26, 46, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: '0px 2px 8px rgba(26, 26, 46, 0.08)',
            },
            '&.Mui-focused': {
              boxShadow: '0px 4px 12px rgba(212, 175, 55, 0.15)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.8125rem',
          transition: 'all 0.25s ease-in-out',
          border: '1px solid rgba(220, 204, 192, 0.25)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.06)',
          },
        },
        filled: {
          background: 'linear-gradient(135deg, #8B7355 0%, #6E5A42 100%)',
          color: '#fefcfc',
          border: '1px solid rgba(139, 115, 85, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(58, 52, 48, 0.08)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#8B7355',
        },
        iconHover: {
          color: '#A38A70',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(139, 115, 85, 0.12)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 8,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: '0.9375rem',
        },
      },
    },
  },
});

export default theme;

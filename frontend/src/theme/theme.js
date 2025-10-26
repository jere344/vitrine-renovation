import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A1A2E', // Deep navy blue - sophisticated and professional
      light: '#2D2D44',
      dark: '#0F0F1E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D4AF37', // Luxurious gold - premium and elegant
      light: '#E5C965',
      dark: '#B8941F',
      contrastText: '#1A1A2E',
    },
    accent: {
      main: '#16213E', // Complementary dark blue
      light: '#2C3E5D',
      dark: '#0D1526',
    },
    background: {
      default: '#F8F9FA', // Soft off-white
      paper: '#FFFFFF',
      dark: '#1A1A2E',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#5A5A6E',
      disabled: '#9E9EB0',
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
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
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
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.375rem',
      },
    },
    h5: {
      fontSize: '1.375rem',
      fontWeight: 600,
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
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
    '0px 2px 4px rgba(26, 26, 46, 0.04), 0px 1px 2px rgba(26, 26, 46, 0.02)',
    '0px 4px 8px rgba(26, 26, 46, 0.04), 0px 2px 4px rgba(26, 26, 46, 0.02)',
    '0px 6px 12px rgba(26, 26, 46, 0.06), 0px 3px 6px rgba(26, 26, 46, 0.03)',
    '0px 8px 16px rgba(26, 26, 46, 0.08), 0px 4px 8px rgba(26, 26, 46, 0.04)',
    '0px 10px 20px rgba(26, 26, 46, 0.1), 0px 5px 10px rgba(26, 26, 46, 0.05)',
    '0px 12px 24px rgba(26, 26, 46, 0.12), 0px 6px 12px rgba(26, 26, 46, 0.06)',
    '0px 14px 28px rgba(26, 26, 46, 0.14), 0px 7px 14px rgba(26, 26, 46, 0.07)',
    '0px 16px 32px rgba(26, 26, 46, 0.16), 0px 8px 16px rgba(26, 26, 46, 0.08)',
    '0px 18px 36px rgba(26, 26, 46, 0.18), 0px 9px 18px rgba(26, 26, 46, 0.09)',
    '0px 20px 40px rgba(26, 26, 46, 0.2), 0px 10px 20px rgba(26, 26, 46, 0.1)',
    '0px 22px 44px rgba(26, 26, 46, 0.22), 0px 11px 22px rgba(26, 26, 46, 0.11)',
    '0px 24px 48px rgba(26, 26, 46, 0.24), 0px 12px 24px rgba(26, 26, 46, 0.12)',
    '0px 26px 52px rgba(26, 26, 46, 0.26), 0px 13px 26px rgba(26, 26, 46, 0.13)',
    '0px 28px 56px rgba(26, 26, 46, 0.28), 0px 14px 28px rgba(26, 26, 46, 0.14)',
    '0px 30px 60px rgba(26, 26, 46, 0.3), 0px 15px 30px rgba(26, 26, 46, 0.15)',
    '0px 32px 64px rgba(26, 26, 46, 0.32), 0px 16px 32px rgba(26, 26, 46, 0.16)',
    '0px 34px 68px rgba(26, 26, 46, 0.34), 0px 17px 34px rgba(26, 26, 46, 0.17)',
    '0px 36px 72px rgba(26, 26, 46, 0.36), 0px 18px 36px rgba(26, 26, 46, 0.18)',
    '0px 38px 76px rgba(26, 26, 46, 0.38), 0px 19px 38px rgba(26, 26, 46, 0.19)',
    '0px 40px 80px rgba(26, 26, 46, 0.4), 0px 20px 40px rgba(26, 26, 46, 0.2)',
    '0px 42px 84px rgba(26, 26, 46, 0.42), 0px 21px 42px rgba(26, 26, 46, 0.21)',
    '0px 44px 88px rgba(26, 26, 46, 0.44), 0px 22px 44px rgba(26, 26, 46, 0.22)',
    '0px 46px 92px rgba(26, 26, 46, 0.46), 0px 23px 46px rgba(26, 26, 46, 0.23)',
    '0px 48px 96px rgba(26, 26, 46, 0.48), 0px 24px 48px rgba(26, 26, 46, 0.24)',
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
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0F0F1E 0%, #0D1526 100%)',
            boxShadow: '0px 6px 16px rgba(26, 26, 46, 0.2)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #D4AF37 0%, #E5C965 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #B8941F 0%, #D4AF37 100%)',
            boxShadow: '0px 6px 16px rgba(212, 175, 55, 0.3)',
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
        },
        filled: {
          background: 'linear-gradient(135deg, #D4AF37 0%, #E5C965 100%)',
          color: '#1A1A2E',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(26, 26, 46, 0.04)',
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
          color: '#D4AF37',
        },
        iconHover: {
          color: '#E5C965',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(26, 26, 46, 0.08)',
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

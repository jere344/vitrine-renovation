import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  IconButton,
  Divider,
  Stack,
  Paper,
  useTheme
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { Link } from 'react-router-dom';
import { getCompanyInfo } from '../../services/api';
import { siteConfig } from '../../config/site';

const Footer = () => {
  const theme = useTheme();
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    getCompanyInfo()
      .then(data => setCompanyInfo(data))
      .catch(() => console.log('Using fallback company info'));
  }, []);

  const info = companyInfo || siteConfig.contact;
  const currentYear = new Date().getFullYear();

  const socialMedia = [
    { 
      icon: <FacebookIcon />, 
      url: companyInfo?.facebook_url || siteConfig.socialMedia.facebook,
      color: '#1877F2',
      name: 'Facebook'
    },
    { 
      icon: <InstagramIcon />, 
      url: companyInfo?.instagram_url || siteConfig.socialMedia.instagram,
      color: '#E4405F',
      name: 'Instagram'
    },
    { 
      icon: <LinkedInIcon />, 
      url: companyInfo?.linkedin_url || siteConfig.socialMedia.linkedin,
      color: '#0A66C2',
      name: 'LinkedIn'
    },
  ];

  const contactInfo = [
    { icon: <PhoneIcon />, text: companyInfo?.phone || info.phone },
    { icon: <EmailIcon />, text: companyInfo?.email || info.email },
    { icon: <LocationOnIcon />, text: companyInfo?.address || info.address },
  ];

  const quickLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Réalisations', path: '/projets' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.background.dark,
        color: '#fefcfc',
        pt: 8,
        pb: 3,
        mt: 'auto',
      }}
    >
      {/* Decorative top border */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.accent.main} 50%, ${theme.palette.primary.main} 100%)`,
        }}
      />
      
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Logo & Description */}
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              component={Link}
              to="/"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                mb: 2.5,
              }}
            >
              <Box
                component="img"
                src="logo.jpg"
                alt={companyInfo?.company_name || siteConfig.siteName}
                sx={{
                  maxWidth: '180px',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              />
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(254, 252, 252, 0.8)',
                lineHeight: 1.7,
                mb: 2
              }}
            >
              {companyInfo?.tagline || siteConfig.tagline}
            </Typography>
            
            <Stack direction="row" spacing={1}>
              {socialMedia.map((social, index) => (
                social.url && (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitez notre page ${social.name}`}
                    size="small"
                    sx={{
                      color: 'rgba(254, 252, 252, 0.7)',
                      border: '1px solid rgba(254, 252, 252, 0.2)',
                      '&:hover': {
                        backgroundColor: social.color,
                        borderColor: social.color,
                        color: '#fff',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {social.icon}
                  </IconButton>
                )
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                mb: 2.5, 
                fontFamily: '"Merriweather", serif',
                fontSize: '1.1rem',
                color: '#fefcfc'
              }}
            >
              Navigation
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link) => (
                <MuiLink
                  key={link.path}
                  component={Link}
                  to={link.path}
                  underline="none"
                  sx={{ 
                    color: 'rgba(254, 252, 252, 0.7)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.palette.accent.main,
                      paddingLeft: '8px',
                    },
                    '&::before': {
                      content: '"›"',
                      marginRight: '8px',
                      fontWeight: 'bold',
                    }
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                mb: 2.5, 
                fontFamily: '"Merriweather", serif',
                fontSize: '1.1rem',
                color: '#fefcfc'
              }}
            >
              Contact
            </Typography>
            <Stack spacing={2}>
              {contactInfo.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ color: theme.palette.accent.main, mr: 1.5, mt: 0.3 }}>
                    {item.icon}
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      flex: 1, 
                      lineHeight: 1.7,
                      color: 'rgba(254, 252, 252, 0.8)',
                      fontSize: '0.9rem'
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* CTA Box */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={6}
              sx={{ 
                p: 3, 
                bgcolor: theme.palette.primary.main,
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                  pointerEvents: 'none',
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1.5,
                  fontFamily: '"Merriweather", serif',
                  color: '#fefcfc'
                }}
              >
                Devis Gratuit
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  color: 'rgba(254, 252, 252, 0.9)',
                  lineHeight: 1.6
                }}
              >
                Transformez votre espace avec nos experts en rénovation
              </Typography>
              <MuiLink
                component={Link}
                to="/contact"
                underline="none"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#fefcfc',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  px: 2.5,
                  py: 1,
                  bgcolor: 'rgba(254, 252, 252, 0.15)',
                  borderRadius: 2,
                  border: '2px solid rgba(254, 252, 252, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    bgcolor: 'rgba(254, 252, 252, 0.25)',
                    borderColor: 'rgba(254, 252, 252, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Contactez-nous →
              </MuiLink>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(254, 252, 252, 0.1)' }} />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: 2 
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(254, 252, 252, 0.7)' }}>
            © {currentYear} {companyInfo?.company_name || siteConfig.siteName}. Tous droits réservés.
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '0.75rem', 
              color: 'rgba(254, 252, 252, 0.5)',
            }}
          >
            Développé par{" "}
            <MuiLink 
              href="https://www.linkedin.com/in/j%C3%A9r%C3%A9my-guerin-b9019b255/" 
              target="_blank" 
              rel="noopener noreferrer"
              underline="hover"
              sx={{ 
                color: 'rgba(254, 252, 252, 0.7)',
                '&:hover': { color: theme.palette.accent.main }
              }}
            >
              Guerin
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;


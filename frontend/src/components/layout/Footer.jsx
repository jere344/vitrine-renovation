import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  IconButton,
  Divider
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { getCompanyInfo } from '../../services/api';
import { siteConfig } from '../../config/site';

const Footer = () => {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    getCompanyInfo()
      .then(data => setCompanyInfo(data))
      .catch(() => console.log('Using fallback company info'));
  }, []);

  const info = companyInfo || siteConfig.contact;

  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              {companyInfo?.company_name || siteConfig.siteName}
            </Typography>
            <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              {companyInfo?.tagline || siteConfig.tagline}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {(companyInfo?.facebook_url || siteConfig.socialMedia.facebook) && (
                <IconButton
                  component="a"
                  href={companyInfo?.facebook_url || siteConfig.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white' }}
                  size="small"
                >
                  <FacebookIcon />
                </IconButton>
              )}
              {(companyInfo?.instagram_url || siteConfig.socialMedia.instagram) && (
                <IconButton
                  component="a"
                  href={companyInfo?.instagram_url || siteConfig.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white' }}
                  size="small"
                >
                  <InstagramIcon />
                </IconButton>
              )}
              {(companyInfo?.linkedin_url || siteConfig.socialMedia.linkedin) && (
                <IconButton
                  component="a"
                  href={companyInfo?.linkedin_url || siteConfig.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white' }}
                  size="small"
                >
                  <LinkedInIcon />
                </IconButton>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Liens rapides
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={Link} to="/" color="grey.400" underline="hover">
                Accueil
              </MuiLink>
              <MuiLink component={Link} to="/services" color="grey.400" underline="hover">
                Services
              </MuiLink>
              <MuiLink component={Link} to="/projets" color="grey.400" underline="hover">
                Réalisations
              </MuiLink>
              <MuiLink component={Link} to="/a-propos" color="grey.400" underline="hover">
                À propos
              </MuiLink>
              <MuiLink component={Link} to="/contact" color="grey.400" underline="hover">
                Contact
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" sx={{ color: 'grey.400' }} />
                <Typography variant="body2" color="grey.400">
                  {companyInfo?.phone || info.phone}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" sx={{ color: 'grey.400' }} />
                <Typography variant="body2" color="grey.400">
                  {companyInfo?.email || info.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ color: 'grey.400', mt: 0.5 }} />
                <Typography variant="body2" color="grey.400">
                  {companyInfo?.address || info.address}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'grey.700' }} />

        <Typography variant="body2" color="grey.500" align="center">
          © {new Date().getFullYear()} {companyInfo?.company_name || siteConfig.siteName}. 
          Tous droits réservés.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

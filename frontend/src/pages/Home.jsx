import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  CardActions,
  Rating,
  ImageList,
  ImageListItem,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BathtubIcon from '@mui/icons-material/Bathtub';
import StorageIcon from '@mui/icons-material/Storage';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BuildIcon from '@mui/icons-material/Build';
import PaletteIcon from '@mui/icons-material/Palette';
import ConstructionIcon from '@mui/icons-material/Construction';
import { 
  getCompanyInfo, 
  getServices, 
  getFeaturedProjects, 
  getTestimonials,
  getHeroImages
} from '../services/api';
import { siteConfig } from '../config/site';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [companyInfo, setCompanyInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const baseUrl = siteConfig.apiUrl.replace('/api', '');
    return `${baseUrl}/${cleanPath}`;
  };

  useEffect(() => {
    document.title = `${siteConfig.siteName} - ${siteConfig.seo.defaultTitle}`;
    
    const fetchData = async () => {
      try {
        const [companyData, servicesData, projectsData, testimonialsData, heroData] = await Promise.all([
          getCompanyInfo(),
          getServices(),
          getFeaturedProjects(),
          getTestimonials(),
          getHeroImages().catch(() => []), // Gallery is optional
        ]);
        setCompanyInfo(companyData);
        setServices(servicesData.results || servicesData);
        setProjects(projectsData.results || projectsData);
        setTestimonials(testimonialsData.results || testimonialsData);
        setHeroImages(heroData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography>Chargement...</Typography>
    </Box>;
  }

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 12, md: 16 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(26, 26, 46, 0) 50%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Box className="accent-line" sx={{ bgcolor: 'secondary.main' }} />
                <Typography 
                  variant="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    mb: 3,
                    fontFamily: '"Merriweather", serif',
                  }}
                >
                  {siteConfig.tagline}
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 5, 
                    opacity: 0.95,
                    fontWeight: 400,
                    lineHeight: 1.6
                  }}
                >
                  {siteConfig.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to="/contact?type=devis"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="pulse-animation"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Demander un devis gratuit
                  </Button>
                  <Button
                    component="a"
                    href={`tel:${siteConfig.contact.phone}`}
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      borderWidth: 2,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': { 
                        borderColor: 'secondary.main',
                        bgcolor: 'rgba(220, 204, 192, 0.1)',
                        borderWidth: 2,
                      },
                    }}
                  >
                    Contact direct
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Gallery Showcase Section */}
      {heroImages.length > 0 && (
        <Box sx={{ 
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box className="accent-line accent-line-center" sx={{ bgcolor: 'secondary.main' }} />
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                  Notre Savoir-Faire
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                  Quelques aperçus de nos réalisations pour vous inspirer
                </Typography>
              </Box>

              <ImageList
                variant="quilted"
                cols={isMobile ? 2 : 4}
                rowHeight={isMobile ? 150 : 200}
                gap={16}
                sx={{
                  overflow: 'hidden',
                  '& .MuiImageListItem-root': {
                    overflow: 'hidden',
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: theme.shadows[12],
                      zIndex: 2,
                    },
                  },
                }}
              >
                {heroImages.map((item, index) => {
                  // Custom layout pattern: 1 big (2x2), 1 tall (1x2), rest fill (1x1)
                  let cols = 1, rows = 1;
                  if (!isMobile) {
                    if (index === 0) { cols = 2; rows = 2; }      // Big image (2x2)
                    else if (index === 1) { cols = 1; rows = 2; }  // Tall image (1x2)
                    // All others are 1x1 by default
                  } else {
                    // Mobile: simpler layout
                    if (index === 0) { cols = 2; rows = 2; }
                  }
                  
                  return (
                    <ImageListItem
                      key={item.id}
                      cols={cols}
                      rows={rows}
                      component={Link}
                      to={item.project_slug ? `/projets/${item.project_slug}` : '/projets'}
                      sx={{ textDecoration: 'none' }}
                    >
                    <img
                      src={getImageUrl(item.image_url || item.image)}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
                        color: 'white',
                        p: 2,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Typography 
                        variant="subtitle1" 
                        fontWeight={600}
                        sx={{ 
                          mb: 0.5,
                          transition: 'all 0.3s ease',
                          '.MuiImageListItem-root:hover &': {
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          opacity: 0,
                          maxHeight: 0,
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          '.MuiImageListItem-root:hover &': {
                            opacity: 1,
                            maxHeight: '2em',
                          },
                        }}
                      >
                        Voir le projet <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                      </Typography>
                    </Box>
                  </ImageListItem>
                  );
                })}
              </ImageList>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Button
                  component={Link}
                  to="/projets"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Voir toutes nos réalisations
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>
      )}



      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Box className="accent-line accent-line-center" sx={{ bgcolor: 'secondary.main' }} />
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Nos Services
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
              Une expertise complète pour tous vos projets de rénovation
            </Typography>
          </Box>

          <Masonry
            columns={{ xs: 1, sm: 2, md: 3 }}
            spacing={3}
          >
            {services.map((service, index) => {
              // Map icons for each service
              const serviceIcons = [
                KitchenIcon,      // Cuisine
                BathtubIcon,      // Salle de bain
                StorageIcon,      // Rangement
                HomeIcon,         // Rénovation générale
                LightbulbIcon,    // Electricité
                BuildIcon,        // Plomberie
                PaletteIcon,      // Peinture
                ConstructionIcon, // Construction
              ];
              const ServiceIcon = serviceIcons[index % serviceIcons.length];

              return (
                <Box key={service.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                      <Card 
                        className="p-card"
                        sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          border: '2px solid transparent',
                          height: '100%',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0px 12px 32px rgba(26, 26, 46, 0.15)',
                            borderColor: 'secondary.main',
                            '& .service-icon': {
                              transform: 'scale(1.1) rotate(5deg)',
                            },
                            '& .service-number': {
                              color: 'secondary.main',
                            },
                          }
                        }}
                      >
                    {/* Decorative Background */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -50,
                        right: -50,
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                        opacity: 0.5,
                      }}
                    />
                    
                    <CardContent sx={{ flexGrow: 1, p: 4, position: 'relative' }}>
                      {/* Number Badge */}
                      <Typography 
                        className="service-number"
                        variant="h3" 
                        sx={{ 
                          fontWeight: 800,
                          color: alpha(theme.palette.primary.main, 0.15),
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          lineHeight: 1,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </Typography>

                      {/* Service Icon */}
                      <Box
                        className="service-icon"
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <ServiceIcon sx={{ fontSize: 32, color: 'white' }} />
                      </Box>

                      <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 700,
                          mb: 2,
                          color: 'primary.main',
                          lineHeight: 1.3,
                        }}
                      >
                        {service.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          lineHeight: 1.8,
                          fontSize: '0.95rem',
                        }}
                      >
                        {service.short_description || service.description.substring(0, 120) + '...'}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            );
          })}
          </Masonry>
        </motion.div>
      </Container>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Témoignages Clients
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Ce que nos clients disent de nous
          </Typography>

          <Grid container spacing={4}>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                      <Typography variant="body1" paragraph>
                        "{testimonial.content}"
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {testimonial.client_name}
                      </Typography>
                      {testimonial.client_location && (
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.client_location}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* CTA Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #dcccc0 0%, #c9b7a8 100%)',
          color: 'primary.main',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, mb: 2, fontFamily: '"Merriweather", serif' }}>
                Prêt à démarrer votre projet ?
              </Typography>
              <Typography variant="h5" sx={{ mb: 5, opacity: 0.9, fontWeight: 400 }}>
                Contactez-nous pour un devis gratuit et sans engagement
              </Typography>
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 12px 24px rgba(102, 93, 93, 0.3)',
                  },
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Nous contacter
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Home;


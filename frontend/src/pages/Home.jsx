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
  Rating
} from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { 
  getCompanyInfo, 
  getServices, 
  getFeaturedProjects, 
  getTestimonials 
} from '../services/api';
import { siteConfig } from '../config/site';

const Home = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = siteConfig.apiUrl.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    document.title = `${siteConfig.siteName} - ${siteConfig.seo.defaultTitle}`;
    
    const fetchData = async () => {
      try {
        const [companyData, servicesData, projectsData, testimonialsData] = await Promise.all([
          getCompanyInfo(),
          getServices(),
          getFeaturedProjects(),
          getTestimonials(),
        ]);
        setCompanyInfo(companyData);
        setServices(servicesData.results || servicesData);
        setProjects(projectsData.results || projectsData);
        setTestimonials(testimonialsData.results || testimonialsData);
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
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
          color: 'white',
          py: { xs: 10, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
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
                    mb: 3
                  }}
                >
                  {companyInfo?.tagline || siteConfig.tagline}
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
                  {companyInfo?.description || "Entreprise de rénovation professionnelle à votre service"}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="pulse-animation"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Demander un devis
                  </Button>
                  <Button
                    component={Link}
                    to="/projets"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      borderWidth: 2,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': { 
                        borderColor: 'secondary.main',
                        bgcolor: 'rgba(212, 175, 55, 0.1)',
                        borderWidth: 2,
                      },
                    }}
                  >
                    Nos réalisations
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

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

          <Grid container spacing={4}>
            {services.slice(0, 6).map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    className="premium-card"
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0px 12px 32px rgba(26, 26, 46, 0.15)',
                      }
                    }}
                  >
                    {service.image && (
                      <CardMedia
                        component="img"
                        height="220"
                        image={getImageUrl(service.image)}
                        alt={service.title}
                        sx={{ 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {service.short_description || service.description.substring(0, 150) + '...'}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              component={Link}
              to="/services"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ px: 4 }}
              endIcon={<ArrowForwardIcon />}
            >
              Voir tous les services
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Featured Projects Section */}
      {projects.length > 0 && (
        <Box sx={{ bgcolor: 'background.default', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom>
              Nos Réalisations
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
              Découvrez nos projets récents
            </Typography>

            <Grid container spacing={4}>
              {projects.slice(0, 3).map((project, index) => (
                <Grid item xs={12} md={4} key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={getImageUrl(project.featured_image)}
                        alt={project.title}
                      />
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          {project.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {project.short_description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          component={Link}
                          to={`/projets/${project.slug}`}
                          size="small"
                          endIcon={<ArrowForwardIcon />}
                        >
                          Voir le projet
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                component={Link}
                to="/projets"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
              >
                Voir toutes les réalisations
              </Button>
            </Box>
          </Container>
        </Box>
      )}

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
          background: 'linear-gradient(135deg, #D4AF37 0%, #E5C965 100%)',
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
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>
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
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 12px 24px rgba(26, 26, 46, 0.3)',
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

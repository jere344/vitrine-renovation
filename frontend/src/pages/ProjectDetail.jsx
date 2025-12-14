import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip,
  Button,
  Divider,
} from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimerIcon from '@mui/icons-material/Timer';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import { getProject } from '../services/api';
import { siteConfig } from '../config/site';
import BeforeAfterComparison from '../components/BeforeAfterComparison';
import ImageGallery from '../components/ImageGallery';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = siteConfig.apiUrl.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    getProject(slug)
      .then(data => {
        setProject(data);
        document.title = `${data.title} - ${siteConfig.siteName}`;
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching project:', error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Chargement...</Typography>
      </Box>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Projet non trouvé
        </Typography>
        <Button
          onClick={() => navigate('/projets')}
          startIcon={<ArrowBackIcon />}
        >
          Retour aux projets
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section with Featured Image */}
      <Box
        sx={{
          height: { xs: 300, md: 500 },
          backgroundImage: `url(${getImageUrl(project.featured_image)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              pb: 4,
              color: 'white',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/projets')}
                sx={{ color: 'white', mb: 2 }}
              >
                Retour aux projets
              </Button>
              {project.service_name && (
                <Chip 
                  label={project.service_name} 
                  sx={{ bgcolor: 'white', mb: 2 }}
                />
              )}
              <Typography variant="h2" gutterBottom>
                {project.title}
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Project Details */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ fontSize: '1.1rem', whiteSpace: 'pre-line' }}
            >
              {project.description}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Détails du projet
              </Typography>
              
              {project.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon color="action" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Lieu
                    </Typography>
                    <Typography variant="body2">
                      {project.location}
                    </Typography>
                  </Box>
                </Box>
              )}

              {project.completion_date && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarTodayIcon color="action" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Date de réalisation
                    </Typography>
                    <Typography variant="body2">
                      {new Date(project.completion_date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </Typography>
                  </Box>
                </Box>
              )}

              {project.duration && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimerIcon color="action" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Durée des travaux
                    </Typography>
                    <Typography variant="body2">
                      {project.duration}
                    </Typography>
                  </Box>
                </Box>
              )}

              {project.surface && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SquareFootIcon color="action" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Surface
                    </Typography>
                    <Typography variant="body2">
                      {project.surface}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Before/After Comparison */}
        {project.has_before_after && project.before_image_url && project.featured_image_url && (
          <Box sx={{ mt: 8 }}>
            <BeforeAfterComparison
              beforeImage={getImageUrl(project.before_image_url)}
              afterImage={getImageUrl(project.featured_image_url)}
              alt={project.title}
            />
          </Box>
        )}

        {/* Divider */}
        {project.has_before_after && project.images && project.images.length > 0 && (
          <Divider sx={{ my: 8 }} />
        )}

        {/* Project Gallery */}
        {project.images && project.images.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
              Galerie photos
            </Typography>
            <ImageGallery images={project.images} getImageUrl={getImageUrl} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default ProjectDetail;

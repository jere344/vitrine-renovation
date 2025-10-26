import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  CardActions,
  Button,
  Chip
} from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getProjects } from '../services/api';
import { siteConfig } from '../config/site';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = siteConfig.apiUrl.replace('/api', '');
    return `${baseUrl}${imagePath}`;
  };

  useEffect(() => {
    document.title = `Réalisations - ${siteConfig.siteName}`;
    
    getProjects()
      .then(data => {
        setProjects(data.results || data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Chargement...</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Page Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" gutterBottom>
              Nos Réalisations
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9 }}>
              Découvrez nos projets de rénovation
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Projects Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: 4,
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={getImageUrl(project.featured_image)}
                    alt={project.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 1 }}>
                      {project.is_featured && (
                        <Chip 
                          label="Projet mis en avant" 
                          color="secondary" 
                          size="small" 
                          sx={{ mb: 1 }}
                        />
                      )}
                      {project.service_name && (
                        <Chip 
                          label={project.service_name} 
                          size="small" 
                          variant="outlined"
                          sx={{ ml: project.is_featured ? 1 : 0, mb: 1 }}
                        />
                      )}
                    </Box>
                    <Typography variant="h5" gutterBottom>
                      {project.title}
                    </Typography>
                    {project.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {project.location}
                        </Typography>
                      </Box>
                    )}
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

        {projects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary">
              Aucune réalisation disponible pour le moment
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Projects;

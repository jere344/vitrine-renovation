import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  Chip,
  ButtonGroup,
  alpha,
  useTheme
} from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { getProjects } from '../services/api';
import { siteConfig } from '../config/site';

const Projects = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Tout');
  
  const filters = ['Tout', 'Cuisine', 'Salle de bain', 'Rangement', 'Autre'];
  
  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    // Remove any leading slash to avoid double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const baseUrl = siteConfig.apiUrl.replace('/api', '');
    return `${baseUrl}/${cleanPath}`;
  };

  useEffect(() => {
    document.title = `Réalisations - ${siteConfig.siteName}`;
    
    getProjects()
      .then(data => {
        setProjects(data.results || data);
        setFilteredProjects(data.results || data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === 'Tout') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.service_name?.toLowerCase().includes(filter.toLowerCase()) ||
        project.title?.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

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
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #665d5d 0%, #4a4242 100%)',
          color: 'white', 
          py: { xs: 8, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 50%, rgba(220, 204, 192, 0.15) 0%, transparent 50%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box className="accent-line" sx={{ bgcolor: 'secondary.main' }} />
            <Typography variant="h1" gutterBottom sx={{ fontFamily: '"Merriweather", serif' }}>
              Nos Réalisations
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Découvrez nos projets de rénovation et d'aménagement
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Filter Bar */}
      <Box sx={{ bgcolor: 'background.default', py: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
            <ButtonGroup 
              variant="outlined" 
              sx={{ 
                flexWrap: 'wrap',
                gap: 1,
                '& .MuiButtonGroup-grouped': {
                  borderRadius: 2,
                  m: 0.5,
                }
              }}
            >
              {filters.map((filter) => (
                <Button
                  key={filter}
                  onClick={() => handleFilter(filter)}
                  variant={activeFilter === filter ? 'contained' : 'outlined'}
                  sx={{
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    ...(activeFilter === filter ? {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      }
                    } : {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderColor: 'primary.main',
                      }
                    })
                  }}
                >
                  {filter}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Container>
      </Box>

      {/* Projects Grid */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 4 
          }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              key={project.id}
            >
                <Card 
                  className="p-card"
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0px 12px 32px rgba(102, 93, 93, 0.18)',
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="280"
                      image={getImageUrl(project.featured_image_url || project.featured_image)}
                      alt={project.title}
                      sx={{
                        transition: 'transform 0.5s ease',
                        objectFit: 'cover',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}
                    />
                    {/* Overlay with project info */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(180deg, transparent 0%, rgba(102, 93, 93, 0.9) 100%)',
                        color: 'white',
                        p: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {project.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        {project.location && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">
                              {project.location}
                            </Typography>
                          </Box>
                        )}
                        {project.completion_date && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">
                              {new Date(project.completion_date).getFullYear()}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    
                    {/* "Avanhas_before_afterbel if applicable */}
                    {project.is_featured && (
                      <Chip 
                        label="Avant/Après" 
                        color="secondary"
                        size="small"
                        sx={{ 
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          fontWeight: 700,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        }}
                      />
                    )}
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {project.service_name && (
                      <Chip 
                        label={project.service_name} 
                        size="small" 
                        variant="outlined"
                        sx={{ mb: 2, fontWeight: 600 }}
                      />
                    )}
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {project.short_description}
                    </Typography>
                  </CardContent>
                  
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      component={Link}
                      to={`/projets/${project.slug}`}
                      variant="contained"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      Voir le projet
                    </Button>
                  </Box>
                </Card>
              </motion.div>
          ))}
        </Box>

        {filteredProjects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary">
              Aucune réalisation disponible pour cette catégorie
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Projects;


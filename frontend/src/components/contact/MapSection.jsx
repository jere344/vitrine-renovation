import { Box, Typography, useTheme, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapSection = ({ companyInfo }) => {
  const theme = useTheme();
  
  // Coordinates for Lattes, France (near Montpellier)
  // Campilongo Frères Rénovation approximate location
  const position = [43.5667, 3.9000]; // Lattes, Hérault, France
  
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      sx={{
        width: '100%',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ 
            mb: 2,
            fontWeight: 700,
            color: 'text.primary'
          }}
        >
          Nous Trouver
        </Typography>
        
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: '600px', mx: 'auto' }}
        >
          Basés à Lattes, nous intervenons dans toute la région de Montpellier
        </Typography>
        
        <Box
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'stretch'
          }}
        >
          {/* Map */}
          <Paper
            elevation={8}
            component={motion.div}
            whileHover={{ scale: 1.01, boxShadow: `0 25px 50px -12px ${theme.palette.primary.main}40` }}
            transition={{ type: 'spring', stiffness: 300 }}
            sx={{
              width: { xs: '100%', md: '65%' },
              height: 450,
              borderRadius: 3,
              overflow: 'hidden',
              '.leaflet-container': {
                height: '100%',
                width: '100%',
                zIndex: 1,
                borderRadius: 3,
              }
            }}
          >
            <MapContainer 
              center={position} 
              zoom={13} 
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <strong>{companyInfo?.company_name || 'Campilongo Frères Rénovation'}</strong><br/>
                  {companyInfo?.address || 'Lattes, Hérault (34)'}
                </Popup>
              </Marker>
            </MapContainer>
          </Paper>
          
          {/* Info Card */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            sx={{ 
              width: { xs: '100%', md: '35%' },
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography 
                variant="h5" 
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: 'text.primary',
                  fontFamily: '"Merriweather", serif'
                }}
              >
                {companyInfo?.company_name || 'Campilongo Frères Rénovation'}
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  mb: 2,
                  color: 'text.secondary'
                }}
              >
                <Box component="span" sx={{ mr: 1.5, color: theme.palette.primary.main, fontSize: '1.2rem' }}>📍</Box>
                <span>{companyInfo?.address || 'Lattes, Hérault (34)'}</span>
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2,
                  color: 'text.secondary'
                }}
              >
                <Box component="span" sx={{ mr: 1.5, color: theme.palette.primary.main, fontSize: '1.2rem' }}>📞</Box>
                <span>{companyInfo?.phone || '+33 (0)4 XX XX XX XX'}</span>
              </Typography>
              
              <Typography 
                variant="body1"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: 'text.secondary'
                }}
              >
                <Box component="span" sx={{ mr: 1.5, color: theme.palette.primary.main, fontSize: '1.2rem' }}>✉️</Box>
                <span>{companyInfo?.email || 'thomascampilongo@yahoo.fr'}</span>
              </Typography>
            </Paper>
            
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: theme.palette.primary.main,
                color: '#fefcfc',
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  fontFamily: '"Merriweather", serif'
                }}
              >
                Zone d'intervention
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.7, opacity: 0.95 }}>
                Nous intervenons principalement dans l'agglomération de Montpellier et ses environs :
                Lattes, Pérols, Castelnau-le-Lez, Palavas-les-Flots, et plus encore.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MapSection;


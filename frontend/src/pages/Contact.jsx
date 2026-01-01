import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button,
  Alert,
  Paper,
  CircularProgress
} from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import { getCompanyInfo, sendContactMessage } from '../services/api';
import { siteConfig } from '../config/site';
import MapSection from '../components/contact/MapSection';

const Contact = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `Contact - ${siteConfig.siteName}`;
    
    getCompanyInfo()
      .then(data => setCompanyInfo(data))
      .catch(() => console.log('Using fallback company info'));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const info = companyInfo || siteConfig.contact;

  return (
    <>
      {/* Page Header */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: { xs: 6, md: 10 },
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
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Contactez-nous
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.9,
                fontWeight: 400,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
              }}
            >
              Nous sommes à votre écoute pour tous vos projets
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Contact Info Cards */}
        <Box sx={{ mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography 
              variant="h4" 
              align="center"
              gutterBottom
              sx={{ 
                fontWeight: 600,
                mb: 5,
                fontSize: { xs: '1.75rem', md: '2.125rem' }
              }}
            >
              Nos coordonnées
            </Typography>

            <Grid container spacing={3} justifyContent="center">
              {/* Phone */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <PhoneIcon />
                    </Box>
                    <Box>
                      <Typography 
                        variant="subtitle2" 
                        color="text.secondary"
                        sx={{ 
                          fontWeight: 600, 
                          mb: 0.5,
                          textTransform: 'uppercase',
                          fontSize: '0.75rem',
                          letterSpacing: 1
                        }}
                      >
                        Téléphone
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{ 
                          fontWeight: 500,
                          fontSize: '1.1rem',
                          color: 'text.primary'
                        }}
                      >
                        {companyInfo?.phone || info.phone}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <EmailIcon />
                    </Box>
                    <Box>
                      <Typography 
                        variant="subtitle2" 
                        color="text.secondary"
                        sx={{ 
                          fontWeight: 600, 
                          mb: 0.5,
                          textTransform: 'uppercase',
                          fontSize: '0.75rem',
                          letterSpacing: 1
                        }}
                      >
                        Email
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{ 
                          fontWeight: 500,
                          fontSize: '1.1rem',
                          color: 'text.primary',
                          wordBreak: 'break-word'
                        }}
                      >
                        {companyInfo?.email || info.email}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Address */}
              <Grid item xs={12} md={8}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <LocationOnIcon />
                    </Box>
                    <Box>
                      <Typography 
                        variant="subtitle2" 
                        color="text.secondary"
                        sx={{ 
                          fontWeight: 600, 
                          mb: 0.5,
                          textTransform: 'uppercase',
                          fontSize: '0.75rem',
                          letterSpacing: 1
                        }}
                      >
                        Adresse
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{ 
                          fontWeight: 500,
                          fontSize: '1.1rem',
                          color: 'text.primary',
                          lineHeight: 1.6
                        }}
                      >
                        {companyInfo?.address || info.address}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Box>

        {/* Contact Form */}
        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 3, md: 5 },
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  background: 'linear-gradient(to bottom, #ffffff 0%, #fafbfc 100%)',
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    fontSize: { xs: '1.75rem', md: '2.125rem' }
                  }}
                >
                  Envoyez-nous un message
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 4,
                    fontSize: '1.05rem',
                    lineHeight: 1.7
                  }}
                >
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </Typography>

                {success && (
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 2,
                      fontSize: '1rem'
                    }}
                  >
                    Votre message a été envoyé avec succès ! Nous vous recontacterons bientôt.
                  </Alert>
                )}

                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 2,
                      fontSize: '1rem'
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                      <TextField
                        required
                        fullWidth
                        label="Nom complet"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'white',
                            '&:hover fieldset': {
                              borderColor: 'secondary.main',
                            },
                          },
                        }}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'white',
                            '&:hover fieldset': {
                              borderColor: 'secondary.main',
                            },
                          },
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                      <TextField
                        fullWidth
                        label="Téléphone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'white',
                            '&:hover fieldset': {
                              borderColor: 'secondary.main',
                            },
                          },
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Sujet"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'white',
                            '&:hover fieldset': {
                              borderColor: 'secondary.main',
                            },
                          },
                        }}
                      />
                    </Box>

                    <TextField
                      fullWidth
                      label="Adresse postale"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Votre adresse complète (rue, code postal, ville)"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                          '&:hover fieldset': {
                            borderColor: 'secondary.main',
                          },
                        },
                      }}
                    />

                    <TextField
                      required
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={8}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                          '&:hover fieldset': {
                            borderColor: 'secondary.main',
                          },
                        },
                      }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', pt: 1 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        sx={{
                          py: 1.5,
                          px: 4,
                          fontSize: '1.05rem',
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: 'none',
                          boxShadow: '0 4px 14px rgba(212, 175, 55, 0.4)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(212, 175, 55, 0.5)',
                          },
                          '&:disabled': {
                            backgroundColor: 'action.disabledBackground',
                            boxShadow: 'none',
                          }
                        }}
                      >
                        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Paper>
            </motion.div>
          </Box>
      </Container>

      {/* Map Section */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
        <MapSection companyInfo={companyInfo} />
      </Box>
    </>
  );
};

export default Contact;

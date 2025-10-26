import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Paper
} from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getCompanyInfo } from '../services/api';
import { siteConfig } from '../config/site';

const About = () => {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    document.title = `À propos - ${siteConfig.siteName}`;
    
    getCompanyInfo()
      .then(data => setCompanyInfo(data))
      .catch(() => console.log('Using fallback company info'));
  }, []);

  const values = [
    {
      title: 'Qualité',
      description: 'Nous utilisons uniquement des matériaux de qualité et travaillons avec des artisans qualifiés.'
    },
    {
      title: 'Fiabilité',
      description: 'Respect des délais et engagement dans chaque projet que nous entreprenons.'
    },
    {
      title: 'Écoute',
      description: 'Nous prenons le temps de comprendre vos besoins pour vous proposer des solutions adaptées.'
    },
    {
      title: 'Expertise',
      description: 'Des années d\'expérience dans tous types de travaux de rénovation.'
    }
  ];

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
              À propos de nous
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9 }}>
              {companyInfo?.tagline || siteConfig.tagline}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* About Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography variant="h4" gutterBottom>
                Notre histoire
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                {companyInfo?.description || `Depuis plusieurs années, notre entreprise se consacre à 
                transformer vos espaces de vie. Que ce soit pour une rénovation complète, l'aménagement 
                d'une cuisine, la création d'une salle de bain ou tout autre projet, nous mettons notre 
                expertise à votre service.`}
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                Notre équipe de professionnels qualifiés travaille avec passion et rigueur pour garantir 
                des résultats exceptionnels. Nous croyons que chaque projet est unique et mérite une 
                attention particulière.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h5" gutterBottom>
                  Pourquoi nous choisir ?
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, mt: 0.5 }} />
                    <Typography>
                      Devis gratuit et sans engagement
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, mt: 0.5 }} />
                    <Typography>
                      Artisans qualifiés et expérimentés
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, mt: 0.5 }} />
                    <Typography>
                      Garanties sur nos travaux
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1, mt: 0.5 }} />
                    <Typography>
                      Respect des délais
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <CheckCircleIcon sx={{ mr: 1, mt: 0.5 }} />
                    <Typography>
                      Suivi personnalisé de votre projet
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Our Values */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Nos valeurs
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Ce qui guide notre travail au quotidien
          </Typography>

          {/* Responsive CSS grid: 1 column on xs, 2 columns on md+. Cards have varied min-heights for a staggered look. */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
              alignItems: 'start',
            }}
          >
            {values.map((value, index) => {
              // create some variation in card sizes for a staggered visual
              const isTall = index % 3 === 0; // make every 3rd card taller
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  style={{ width: '100%' }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      minHeight: isTall ? 220 : 150,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'left',
                      bgcolor: 'background.paper',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        transition: 'transform 0.25s ease-in-out',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </Paper>
                </motion.div>
              );
            })}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;

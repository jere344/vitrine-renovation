import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  Fab,
  Zoom,
  alpha,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCompanyInfo } from '../../services/api';
import { siteConfig } from '../../config/site';

// Motion components
const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionListItem = motion(ListItem);

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getCompanyInfo()
      .then(data => setCompanyInfo(data))
      .catch(() => console.log('Using fallback company name'));
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setScrolled(true);
        setShowScrollTop(true);
      } else {
        setScrolled(false);
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Réalisations', path: '/projets' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const drawer = (
    <Box 
      sx={{ 
        width: { xs: '70%', sm: 300 },
        maxWidth: 300,
        pt: 2,
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
        backdropFilter: 'blur(15px)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <MotionBox 
        sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          component="img"
          src="/src/assets/logo.jpg"
          alt={companyInfo?.company_name || siteConfig.siteName}
          sx={{
            maxWidth: '150px',
            height: 'auto',
            borderRadius: 2,
            boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
          }}
        />
      </MotionBox>

      <List>
        {navItems.map((item, index) => (
          <MotionListItem 
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={mobileMenuItemVariants}
            whileHover={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              x: 10,
            }}
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              backgroundColor: location.pathname === item.path ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
              mb: 1,
              borderRadius: 1,
              mx: 1,
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 700 : 500,
                sx: { 
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                }
              }}
            />
          </MotionListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{
            zIndex: theme.zIndex.appBar + 100, // Ensure it's above all content
            backgroundColor: scrolled 
              ? alpha(theme.palette.background.paper, 0.95)
              : alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
            borderBottom: scrolled 
              ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
              : '1px solid transparent',
            transition: 'all 0.3s ease-in-out',
            boxShadow: scrolled 
              ? `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}` 
              : 'none',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: scrolled ? 70 : 90, transition: 'height 0.3s ease' }}>
              <MotionBox
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={logoVariants}
              >
                <Box
                  component={Link}
                  to="/"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    gap: 1.5,
                  }}
                >
                  <Box
                    component="img"
                    src="/src/assets/logo.jpg"
                    alt={companyInfo?.company_name || siteConfig.siteName}
                    sx={{
                      height: scrolled ? 45 : 60,
                      width: 'auto',
                      borderRadius: 1.5,
                      transition: 'all 0.3s ease',
                      boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontFamily: '"Merriweather", serif',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px',
                      display: { xs: 'none', sm: 'block' },
                      fontSize: { sm: '1rem', md: '1.25rem' },
                    }}
                  >
                    {companyInfo?.company_name || siteConfig.siteName}
                  </Typography>
                </Box>
              </MotionBox>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
                {navItems.map((item, index) => (
                  <MotionButton
                    key={item.path}
                    component={Link}
                    to={item.path}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, color: theme.palette.primary.main }}
                    sx={{
                      mx: 1,
                      color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: location.pathname === item.path ? '80%' : '0%',
                        height: '2px',
                        bottom: 0,
                        left: '10%',
                        backgroundColor: theme.palette.primary.main,
                        transition: 'all 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '80%',
                      }
                    }}
                  >
                    {item.label}
                  </MotionButton>
                ))}
              </Box>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ 
                  display: { md: 'none' },
                  color: 'text.primary',
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Back to top button */}
      <Zoom in={showScrollTop}>
        <Box
          onClick={handleScrollToTop}
          role="presentation"
          sx={{
            position: 'fixed',
            bottom: { xs: 80, md: 100 },
            right: { xs: 20, md: 40 },
            zIndex: 2000,
          }}
        >
          <Fab 
            color="primary" 
            size="small" 
            aria-label="scroll back to top"
            sx={{ 
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease',
              }
            }}
          >
            <ArrowUpwardIcon />
          </Fab>
        </Box>
      </Zoom>
    </>
  );
};

export default Navbar;


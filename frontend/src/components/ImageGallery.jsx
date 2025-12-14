import { useState } from 'react';
import {
  Box,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images = [], getImageUrl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleClose = () => {
    setLightboxOpen(false);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious(e);
    if (e.key === 'ArrowRight') handleNext(e);
    if (e.key === 'Escape') handleClose();
  };

  // Filter only visible images
  const visibleImages = images.filter((img) => img.is_visible !== false);

  if (visibleImages.length === 0) return null;

  return (
    <>
      {/* Gallery Grid */}
      <ImageList
        variant="masonry"
        cols={isMobile ? 2 : 3}
        gap={16}
        sx={{
          '& .MuiImageListItem-root': {
            cursor: 'pointer',
            overflow: 'hidden',
            borderRadius: 2,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: theme.shadows[8],
            },
          },
        }}
      >
        {visibleImages.map((img, index) => (
          <ImageListItem key={img.id || index} onClick={() => handleImageClick(index)}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={getImageUrl(img.image_url || img.image)}
                alt={img.caption || `Image ${index + 1}`}
                loading="lazy"
                style={{
                  borderRadius: 8,
                  display: 'block',
                  width: '100%',
                }}
              />
              {img.caption && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.75) 100%)',
                    color: 'white',
                    p: 1.5,
                    borderRadius: '0 0 8px 8px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {img.caption}
                </Box>
              )}
            </Box>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox */}
      <Dialog
        open={lightboxOpen}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        onKeyDown={handleKeyDown}
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 0, 0, 0.95)',
            boxShadow: 'none',
            overflow: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
          onClick={handleClose}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              zIndex: 10,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Navigation Buttons */}
          {visibleImages.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: 'absolute',
                  left: 16,
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 10,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <NavigateBeforeIcon fontSize="large" />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 16,
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 10,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <NavigateNextIcon fontSize="large" />
              </IconButton>
            </>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={getImageUrl(visibleImages[currentIndex]?.image_url || visibleImages[currentIndex]?.image)}
              alt={visibleImages[currentIndex]?.caption || `Image ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: 8,
              }}
            />
          </AnimatePresence>

          {/* Caption and Counter */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              maxWidth: '90%',
            }}
          >
            {visibleImages[currentIndex]?.caption && (
              <Box
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  px: 3,
                  py: 1,
                  borderRadius: 20,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                {visibleImages[currentIndex].caption}
              </Box>
            )}
            {visibleImages.length > 1 && (
              <Box
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  px: 3,
                  py: 1,
                  borderRadius: 20,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {currentIndex + 1} / {visibleImages.length}
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ImageGallery;

import { useState } from 'react';
import { Box, Typography, Slider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const ComparisonContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[8],
}));

const ImageContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  display: 'block',
  objectFit: 'cover',
  objectPosition: 'center',
  userSelect: 'none',
  pointerEvents: 'none',
});

const Divider = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 4,
  backgroundColor: theme.palette.secondary.main,
  boxShadow: `0 0 20px ${theme.palette.secondary.main}`,
  cursor: 'ew-resize',
  zIndex: 10,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 48,
    height: 48,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    boxShadow: theme.shadows[4],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Label = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  padding: '8px 16px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  borderRadius: 20,
  fontWeight: 600,
  fontSize: '0.875rem',
  zIndex: 5,
  backdropFilter: 'blur(4px)',
}));

const BeforeAfterComparison = ({ beforeImage, afterImage, alt = 'Avant/Après' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);

  const handleImageLoad = (e) => {
    const img = e.target;
    const ratio = img.naturalWidth / img.naturalHeight;
    setAspectRatio(ratio);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleSliderChange = (_, newValue) => {
    setSliderPosition(newValue);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
        <CompareArrowsIcon sx={{ mr: 1, color: 'secondary.main' }} />
        <Typography variant="h5" fontWeight={700}>
          Transformation Avant / Après
        </Typography>
      </Box>

      {/* Comparison Container */}
      <ComparisonContainer
        elevation={4}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        sx={{ 
          cursor: isDragging ? 'ew-resize' : 'default',
          aspectRatio: aspectRatio || 'auto',
        }}
      >
        {/* After Image (Base Layer) */}
        <ImageContainer>
          <Image 
            src={afterImage} 
            alt={`${alt} - Après`}
            onLoad={handleImageLoad}
          />
        </ImageContainer>

        {/* Before Image (Clipped Layer) */}
        <ImageContainer
          sx={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            transition: isDragging ? 'none' : 'clip-path 0.1s ease',
          }}
        >
          <Image src={beforeImage} alt={`${alt} - Avant`} />
        </ImageContainer>

        {/* Slider Divider */}
        <Divider
          sx={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
            transition: isDragging ? 'none' : 'left 0.1s ease',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: 24,
            }}
          >
            ⟷
          </Box>
        </Divider>

        {/* Labels */}
        <Label sx={{ left: 20 }}>Avant</Label>
        <Label sx={{ right: 20 }}>Après</Label>
      </ComparisonContainer>

      {/* Mobile-friendly Slider */}
      <Box sx={{ mt: 3, px: 2 }}>
        <Slider
          value={sliderPosition}
          onChange={handleSliderChange}
          aria-label="Position de comparaison"
          sx={{
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Avant
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Après
          </Typography>
        </Box>
      </Box>

      {/* Help Text */}
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ display: 'block', textAlign: 'center', mt: 2 }}
      >
        Glissez le curseur ou cliquez sur l&apos;image pour comparer
      </Typography>
    </Box>
  );
};

export default BeforeAfterComparison;

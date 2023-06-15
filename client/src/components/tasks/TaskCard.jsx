import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import testImage from '../../assets/test.png';
const TaskCard = () => {
  const descriptionLength = 150;
  const testText =
    'Lizards are a widespread group of squamate reptiles, with over 6,000 Lizards are a widespread group of squamate reptiles, with over 6,000 Lizards are a widespread group of squamate reptiles, with over 6,000 Lizards are a widespread group of squamate reptiles, with over 6,000';
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 345, borderRadius: '15px' }}>
      <CardContent>
        <CardMedia
          component='img'
          height='140'
          src={testImage}
          alt='green iguana'
          sx={{ mb: 2, borderRadius: '15px' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant='h5' component='div'>
            Lizard
          </Typography>
          <IconButton size='small'>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Typography variant='body2' color='text.secondary'>
          {testText.length < descriptionLength
            ? testText
            : testText.slice(0, descriptionLength).concat('...')}
        </Typography>
        <AvatarGroup total={24}>
          <Avatar alt='Remy Sharp' />
        </AvatarGroup>
      </CardContent>
    </Card>
  );
};
export default TaskCard;

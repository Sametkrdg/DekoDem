// components/ContactForm.js
import React, { useState } from 'react';
import { Box, TextField, MenuItem, Alert } from '@mui/material';
import { Send } from '@mui/icons-material';
import { ServiceCard, SectionTitle, CTAButton } from '../styles/StyledComponents';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);

  const subjects = [
    'Genel Bilgi',
    'Proje Teklifi',
    'Teknik Destek',
    'İş Birliği',
    'Diğer'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submit logic burada olacak
    console.log('Form Data:', formData);
    setShowSuccess(true);
    
    // Success mesajını 3 saniye sonra gizle
    setTimeout(() => {
      setShowSuccess(false);
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <ServiceCard>
      <SectionTitle 
        variant="h5" 
        sx={{ 
          fontSize: '1.5rem', 
          marginBottom: '30px',
          color: '#2c3e50',
          textAlign: 'center'
        }}
      >
        Bize Ulaşın
      </SectionTitle>

      {showSuccess && (
        <Alert 
          severity="success" 
          sx={{ 
            marginBottom: '25px',
            '& .MuiAlert-message': {
              fontWeight: '500'
            }
          }}
        >
          Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TextField
          name="name"
          label="Ad Soyad"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#3498db',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3498db',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3498db',
            },
          }}
        />

        <TextField
          name="email"
          label="E-posta"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#3498db',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3498db',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3498db',
            },
          }}
        />

        <TextField
          name="phone"
          label="Telefon"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#3498db',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3498db',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3498db',
            },
          }}
        />

        <TextField
          name="subject"
          label="Konu"
          select
          value={formData.subject}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#3498db',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3498db',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3498db',
            },
          }}
        >
          {subjects.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="message"
          label="Mesajınız"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#3498db',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3498db',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3498db',
            },
          }}
        />

        <CTAButton
          type="submit"
          variant="contained"
          startIcon={<Send />}
          sx={{ alignSelf: 'center', minWidth: '200px' }}
        >
          Mesaj Gönder
        </CTAButton>
      </Box>
    </ServiceCard>
  );
};

export default ContactForm;
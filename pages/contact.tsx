import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., sending data to an API
        setSubmitted(true);
    };

    return (
        <Container maxWidth="md">
            <Box py={6}>
                <Typography variant="h1" gutterBottom>
                    Contact Us
                </Typography>
                {submitted ? (
                    <Typography variant="h6" color="success.main">
                        Thank you for your message! We will get back to you shortly.
                    </Typography>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            variant="outlined"
                            margin="normal"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Subject"
                            variant="outlined"
                            margin="normal"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Send Message
                        </Button>
                    </form>
                )}
            </Box>
        </Container>
    );
};

export default Contact;

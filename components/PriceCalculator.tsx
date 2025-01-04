"use client"; // Add this directive to mark the component as a client component

import React, { useState } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Button, Box, Paper, Grid } from '@mui/material';

// Define services array
const services = [
  {
    title: "Essay Writing",
    description: "Custom essays tailored to your specific requirements and academic level.",
    icon: "✏️", // Replace with actual icon component
    badge: "Popular"
  },
  {
    title: "Research Papers",
    description: "In-depth research papers on various topics with proper citations and references.",
    icon: "📖" // Replace with actual icon component
  },
  {
    title: "Thesis & Dissertations",
    description: "Comprehensive support for your thesis or dissertation project.",
    icon: "🎓" // Replace with actual icon component
  },
  {
    title: "Editing & Proofreading",
    description: "Polishing your academic work to ensure clarity, coherence, and correctness.",
    icon: "✨" // Replace with actual icon component
  },
  {
    title: "Math Problem Solving",
    description: "Step-by-step solutions for complex mathematical problems.",
    icon: "🧮" // Replace with actual icon component
  },
  {
    title: "Language Learning Support",
    description: "Assistance with language assignments and translations.",
    icon: "🌐" // Replace with actual icon component
  },
  {
    title: "Statistics & Data Analysis",
    description: "Expert help with statistical analysis and data interpretation.",
    icon: "📊" // Replace with actual icon component
  },
  {
    title: "Programming Assignments",
    description: "Coding help and explanations for various programming languages.",
    icon: "💻" // Replace with actual icon component
  },
  {
    title: "Literature Reviews",
    description: "Comprehensive literature reviews for research projects.",
    icon: "📚" // Replace with actual icon component
  },
  {
    title: "Case Studies",
    description: "In-depth analysis and writing of business and academic case studies.",
    icon: "🔍" // Replace with actual icon component
  },
  {
    title: "Lab Reports",
    description: "Detailed and accurate lab reports for science courses.",
    icon: "🔬" // Replace with actual icon component
  },
  {
    title: "Creative Writing",
    description: "Assistance with creative writing projects and storytelling.",
    icon: "💡" // Replace with actual icon component
  }
];

const PriceCalculator: React.FC = () => {
    const [academicLevel, setAcademicLevel] = useState('');
    const [paperType, setPaperType] = useState('');
    const [deadline, setDeadline] = useState('');
    const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

    const calculatePrice = () => {
        // Example pricing logic
        let basePrice = 20; // Base price
        if (academicLevel === 'Undergraduate') basePrice += 10;
        if (paperType) basePrice += 15; // Adjust based on paper type selection
        if (deadline === 'Urgent') basePrice += 20;

        setEstimatedCost(basePrice);
    };

    return (
        <Box maxWidth="sm" mx="auto" p={3}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom>Price Calculator</Typography>
                <form onSubmit={(e) => { e.preventDefault(); calculatePrice(); }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Academic Level</InputLabel>
                        <Select
                            value={academicLevel}
                            onChange={(e) => setAcademicLevel(e.target.value)}
                            label="Academic Level"
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                            <MenuItem value="Graduate">Graduate</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Type of Paper</InputLabel>
                        <Select
                            value={paperType}
                            onChange={(e) => setPaperType(e.target.value)}
                            label="Type of Paper"
                        >
                            <MenuItem value="">Select</MenuItem>
                            {services.map((service, index) => (
                                <MenuItem key={index} value={service.title}>
                                    {service.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Deadline</InputLabel>
                        <Select
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            label="Deadline"
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Standard">Standard</MenuItem>
                            <MenuItem value="Urgent">Urgent</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Calculate Price
                    </Button>
                </form>
                {estimatedCost !== null && (
                    <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
                        Estimated Cost: ${estimatedCost}
                    </Typography>
                )}
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    No hidden charges. First-time users get a discount!
                </Typography>
            </Paper>
        </Box>
    );
};

export default PriceCalculator;
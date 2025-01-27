"use client";

import { Button } from "components/ui/button";
import Link from 'next/link';
import { Grid, Paper, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

const Hero: React.FC = () => {
  return (
    <>
      <section className="relative py-20 md:py-40 h-screen text-center text-white overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          aria-label="Background video showcasing academic support"
        >
          <source src="/videos/9198351-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 flex flex-col justify-center h-full">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Empower Your Academic Journey with ScholarStream
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            From essays to dissertations, math problems to coding challenges - we&apos;re your all-in-one academic support system. Let our expert tutors guide you towards academic excellence.
          </p>
          <div className="flex justify-center">
<Link href="/login" target="_blank">
  <Button size="default" className="bg-blue-600 hover:bg-blue-700 transition duration-300">
  Start Excelling Today
  </Button>
</Link>
          </div>
          {/* Removed the Sign Up button */}
        </div>
      </section>

      <section className="py-20 bg-gray-100 text-center">
        <Typography variant="h4" className="font-bold mb-4">How It Works</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="p-4 rounded-lg shadow-lg bg-blue-200 hover:shadow-xl transition-shadow duration-300">
              <AssignmentIcon fontSize="large" />
              <Typography variant="h6">Place Order</Typography>
              <Typography>Fill out the order form with your requirements.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="p-4 rounded-lg shadow-lg bg-green-200 hover:shadow-xl transition-shadow duration-300">
              <CheckCircleIcon fontSize="large" />
              <Typography variant="h6">Submit Your Requirements and Instructions</Typography>
              <Typography>Provide detailed instructions for your paper.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="p-4 rounded-lg shadow-lg bg-yellow-200 hover:shadow-xl transition-shadow duration-300">
              <PersonIcon fontSize="large" />
              <Typography variant="h6">Expert Match</Typography>
              <Typography>We assign the best writer for your topic.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="p-4 rounded-lg shadow-lg bg-orange-200 hover:shadow-xl transition-shadow duration-300">
              <EditIcon fontSize="large" />
              <Typography variant="h6">Writing Process</Typography>
              <Typography>Your paper is written with precision.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="p-4 rounded-lg shadow-lg bg-red-200 hover:shadow-xl transition-shadow duration-300">
              <SendIcon fontSize="large" />
              <Typography variant="h6">Delivery</Typography>
              <Typography>Receive your polished paper on time.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </section>
    </>
  );
}

export default Hero;

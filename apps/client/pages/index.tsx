import React from 'react';
import Footer from '../components/UI/Footer';
import Navbar from '../components/UI/Navbar'
import Audio from '../components/Audio'



export function Index() {


  return (
    <div className="animated-background">
      <Navbar />

      <Audio />
      <Footer />
    </div>
  );
}

export default Index;

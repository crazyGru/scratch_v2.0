import React from 'react';
import LandingHeader from '../home/LandingHeader';
import Banner from '../home/Banner';
import ChoiceBar from '../home/ChoiceBar';
import MainSection from '../home/MainSection';
import FootBar from '../home/FootBar';
import './Landing.css';
// import Test from '../home/Test'

function Landing() {
    return(
      <div className='landing-wrapper'>
        <LandingHeader />
        <Banner />
        <ChoiceBar />
        <MainSection />
        <FootBar />
      </div>
    )
}

export default Landing;

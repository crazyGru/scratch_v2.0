import React from 'react';
import HeadBar from '../home/HeadBar';
import Banner from '../home/Banner';
import ChoiceBar from '../home/ChoiceBar';
import MainSection from '../home/MainSection';
import FootBar from '../home/FootBar';


function Dashboard() {
  return (
    <div>
        <HeadBar />
        <Banner />
        <ChoiceBar />
        <MainSection />
        <FootBar />
    </div>
  );
}

export default Dashboard;

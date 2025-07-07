import React, { useEffect, useState } from 'react';
import prayerTimes from './prayer_times.json';
import './App.css';

function App() {
  return <p>times unavailable for july</p>;

  const [todayTimes, setTodayTimes] = useState(null);
  const [activeTab, setActiveTab] = useState('iqama'); // 'iqama' or 'athan'
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const key = `${day}${month}`;

  useEffect(() => {
    if (prayerTimes[key]) {
      setTodayTimes({
        ...prayerTimes[key],
        fajr: prayerTimes[key]['athan-fajr'],
        dhuhr: prayerTimes[key]['athan-dhuhr'],
        maghrib: prayerTimes[key]['athan-maghrib'],
        asr: prayerTimes[key]['athan-asr'],
        isha: prayerTimes[key]['athan-isha'],
        iqama_fajr: prayerTimes[key]['iqama-fajr'],
        iqama_dhuhr: prayerTimes[key]['iqama-dhuhr'],
        iqama_asr: prayerTimes[key]['iqama-asr'],
        iqama_maghrib: prayerTimes[key]['iqama-maghrib'],
        iqama_isha: prayerTimes[key]['iqama-isha'],
      });
    }
  }, [key]);

  const handleTabClick = (e) => {
    const tabBar = e.currentTarget;
    const clickX = e.clientX - tabBar.getBoundingClientRect().left;
    const tabBarWidth = tabBar.offsetWidth;
    
    // If clicked on left half, go to iqama, otherwise athan
    setActiveTab(clickX < tabBarWidth / 2 ? 'iqama' : 'athan');
  };

  if (!todayTimes) {
    return <p>loading... (or broken)</p>;
  }

  const renderTimes = () => {
    return (
      <div className="container2">
        <div className='time'>
          <h1 className="big">Fajr</h1>
          <h1 className="big">{todayTimes[activeTab + '-fajr']}</h1>
        </div>
        <div className='time'>
          <h1 className="big">Dhuhr</h1>
          <h1 className="big">{todayTimes[activeTab + '-dhuhr']}</h1>
        </div>
        <div className='time'>
          <h1 className="big">Asr</h1>
          <h1 className="big">{todayTimes[activeTab + '-asr']}</h1>
        </div>
        <div className='time'>
          <h1 className="big">Maghrib</h1>
          <h1 className="big">{todayTimes[activeTab + '-maghrib']}</h1>
        </div>
        <div className='time'>
          <h1 className="big">Isha</h1>
          <h1 className="big">{todayTimes[activeTab + '-isha']}</h1>
        </div>
      </div>
    );
  };

  if (prayerTimes[key]) {
    return (
      <div>
        <div className="tabs" onClick={handleTabClick}>
          <div className={`tab ${activeTab === 'iqama' ? 'active' : ''}`}>
            Iqama
          </div>
          <div className={`tab ${activeTab === 'athan' ? 'active' : ''}`}>
            Athan
          </div>
        </div>
        <div className="container1">
          {renderTimes()}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>No prayer times for today</h1>
      </div>
    );
  }
}

export default App;

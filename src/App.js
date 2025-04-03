import React, { useEffect, useState } from 'react';
import prayerTimes from './prayer_times.json';
import './App.css';

function App() {
  const [todayTimes, setTodayTimes] = useState(null);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const key = `${day}${month}`;

  useEffect(() => {
    if (prayerTimes[key]) {
      setTodayTimes({
        ...prayerTimes[key],
        Fajr: prayerTimes[key].Fajr,
        Dhuhr: prayerTimes[key].Dhuhr,
        Asr: prayerTimes[key].Asr,
        Isha: prayerTimes[key].Isha,
      });
    }
  }, [key]);

  if (!todayTimes) {
    return <p>loading... (or broken)</p>;
  }

  if (prayerTimes[key]) {
  return (
  <div>
    <div className="container1">
      <div className="container2">
        <h1>Pray in Robert Hook till (including) 20th April 2025</h1>
        <div className='time'>
          <h1 className="big">Fajr</h1>
          <h1 className="big">{todayTimes.Fajr}</h1>
        </div>
        <div className='time'>
          <h1 className="big">Dhuhr</h1>
          <h1 className="big">{todayTimes.Dhuhr}</h1>
        </div>
        <div className='time'>
          <h1 className="big">Asr</h1>
          <h1 className="big">{todayTimes.Asr}</h1>
        </div>
        <div className='time'>
          <h1 className="big">Maghrib</h1>
          <h1 className="big">{todayTimes.Maghrib}</h1>
        </div>
        <div className='time'>
          <h1 className="big">Isha</h1>
          <h1 className="big">{todayTimes.Isha}</h1>
        </div>
      </div>
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

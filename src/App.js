import React, { useEffect, useState } from 'react';
import prayerTimes from './prayer_times.json';
import './App.css';

function App() {
  const [todayTimes, setTodayTimes] = useState(null);

  const roundToNearest15 = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const roundedMinutes = Math.ceil(minutes / 15) * 15;
    if (roundedMinutes === 60) {
      return `${String(hours + 1).padStart(2, '0')}:00`;
    }
    return `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`;
  };

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const key = `${day}${month}`;

    console.log("yeye");
    if (prayerTimes[key]) {
      setTodayTimes({
        ...prayerTimes[key],
        Fajr: roundToNearest15(prayerTimes[key].Fajr),
        Dhuhr: roundToNearest15(prayerTimes[key].Dhuhr),
        Asr: roundToNearest15(prayerTimes[key].Asr),
        Isha: roundToNearest15(prayerTimes[key].Isha),
      });
    }
  }, []);

  if (!todayTimes) {
    return <p>Loading prayer times...</p>;
  }

  return (
  <div>
    <div className="container1">
      <div className="container2">
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
    {/* <div className="spacer"/> */}
  </div>
  );
}

export default App;

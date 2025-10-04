import React, { useEffect, useState } from 'react';
import prayerTimes from './prayer_times.json';
import './App.css';

function App() {
  // return <p>times unavailable for july, please use the whats app chat</p>;

  const [todayTimes, setTodayTimes] = useState(null);
  const [activeTab, setActiveTab] = useState('iqama'); // 'iqama', 'athan', or 'month'
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

  const monthLabel = today.toLocaleString('default', { month: 'long' });

  const monthTimes = Object.entries(prayerTimes)
    .filter(([timeKey]) => timeKey.slice(2) === month)
    .sort((a, b) => a[0].slice(0, 2).localeCompare(b[0].slice(0, 2)))
    .map(([timeKey, times]) => ({
      day: timeKey.slice(0, 2),
      athanFajr: times['athan-fajr'] || '',
      iqamaFajr: times['iqama-fajr'] || '',
      athanDhuhr: times['athan-dhuhr'] || '',
      iqamaDhuhr: times['iqama-dhuhr'] || '',
      athanAsr: times['athan-asr'] || '',
      iqamaAsr: times['iqama-asr'] || '',
      athanMaghrib: times['athan-maghrib'] || '',
      iqamaMaghrib: times['iqama-maghrib'] || '',
      athanIsha: times['athan-isha'] || '',
      iqamaIsha: times['iqama-isha'] || '',
    }));

  if (!todayTimes) {
    return <p>loading... (or broken)</p>;
  }

  const renderTimes = () => {
    if (activeTab === 'month') {
      const handleDownloadPdf = async () => {
        if (!monthTimes.length) {
          return;
        }

        const { default: jsPDF } = await import('jspdf');
        const autoTable = (await import('jspdf-autotable')).default;

        const doc = new jsPDF();
        doc.text(`Prayer Times - ${monthLabel}`, 14, 15);

        const blankCell = ' ';

        const head = [[
          'Day',
          'Fajr Athan',
          'Dhuhr Athan',
          'Asr Athan',
          'Maghrib Athan',
          'Isha Athan',
          blankCell,
          'Fajr Iqama',
          'Dhuhr Iqama',
          'Asr Iqama',
          'Maghrib Iqama',
          'Isha Iqama',
        ]];

        const body = monthTimes.map((entry) => [
          entry.day,
          entry.athanFajr,
          entry.athanDhuhr,
          entry.athanAsr,
          entry.athanMaghrib,
          entry.athanIsha,
          blankCell,
          entry.iqamaFajr,
          entry.iqamaDhuhr,
          entry.iqamaAsr,
          entry.iqamaMaghrib,
          entry.iqamaIsha,
        ]);

        autoTable(doc, {
          head,
          body,
          startY: 20,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [0, 123, 255] },
          columnStyles: {
            6: {
              cellWidth: 10,
              lineWidth: 0,
              fillColor: [255, 255, 255],
              textColor: [255, 255, 255],
            },
          },
          didParseCell: (data) => {
            if (data.column.index === 6) {
              data.cell.styles.fillColor = [255, 255, 255];
              data.cell.styles.lineWidth = 0;
              data.cell.styles.textColor = [255, 255, 255];
            }
          },
        });

        doc.save(`prayer_times_${monthLabel.toLowerCase()}.pdf`);
      };

      return (
        <div className="month-view">
          <div className="month-actions">
            <button
              className="download-btn"
              type="button"
              onClick={handleDownloadPdf}
              disabled={!monthTimes.length}
            >
              Download PDF
            </button>
          </div>
          <div className="table-wrapper">
            <table className="month-table">
              <thead>
                <tr>
                  <th rowSpan="2">Day</th>
                  <th colSpan="5" className="athan-group">Athan</th>
                  <th rowSpan="2" className="section-gap" aria-hidden="true"></th>
                  <th colSpan="5" className="iqama-group">Iqama</th>
                </tr>
                <tr className="sub-header">
                  <th className="athan-col">Fajr</th>
                  <th className="athan-col">Dhuhr</th>
                  <th className="athan-col">Asr</th>
                  <th className="athan-col">Maghrib</th>
                  <th className="athan-col athan-last">Isha</th>
                  <th className="iqama-col iqama-first">Fajr</th>
                  <th className="iqama-col">Dhuhr</th>
                  <th className="iqama-col">Asr</th>
                  <th className="iqama-col">Maghrib</th>
                  <th className="iqama-col">Isha</th>
                </tr>
              </thead>
              <tbody>
                {monthTimes.length === 0 ? (
                  <tr>
                    <td colSpan="11">No data available for this month.</td>
                  </tr>
                ) : (
                  monthTimes.map((entry) => (
                    <tr key={entry.day}>
                      <td>{parseInt(entry.day, 10)}</td>
                      <td className="athan-col">{entry.athanFajr}</td>
                      <td className="athan-col">{entry.athanDhuhr}</td>
                      <td className="athan-col">{entry.athanAsr}</td>
                      <td className="athan-col">{entry.athanMaghrib}</td>
                      <td className="athan-col athan-last">{entry.athanIsha}</td>
                      <td className="section-gap" aria-hidden="true"></td>
                      <td className="iqama-col iqama-first">{entry.iqamaFajr}</td>
                      <td className="iqama-col">{entry.iqamaDhuhr}</td>
                      <td className="iqama-col">{entry.iqamaAsr}</td>
                      <td className="iqama-col">{entry.iqamaMaghrib}</td>
                      <td className="iqama-col">{entry.iqamaIsha}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
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
        <div className="tabs">
          <div className={`tab ${activeTab === 'iqama' ? 'active' : ''}`} onClick={() => setActiveTab('iqama')}>
            Iqama
          </div>
          <div className={`tab ${activeTab === 'athan' ? 'active' : ''}`} onClick={() => setActiveTab('athan')}>
            Athan
          </div>
          <div className={`tab ${activeTab === 'month' ? 'active' : ''}`} onClick={() => setActiveTab('month')}>
            Month
          </div>
        </div>
        <div className={`container1 ${activeTab === 'month' ? 'month-active' : ''}`}>
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

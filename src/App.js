import React, { useEffect, useState } from 'react';
import prayerTimes from './prayer_times.json';
import './App.css';

function App() {
  return <p>times unavailable for july, please use the whats app chat</p>;

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
  const currentYear = today.getFullYear();

  const monthTimes = Object.entries(prayerTimes)
    .filter(([timeKey]) => timeKey.slice(2) === month)
    .sort((a, b) => a[0].slice(0, 2).localeCompare(b[0].slice(0, 2)))
    .map(([timeKey, times]) => {
      const dayValue = timeKey.slice(0, 2);
      const dayNumber = parseInt(dayValue, 10);
      const targetDate = new Date(currentYear, parseInt(month, 10) - 1, dayNumber);
      const isFriday = targetDate.getDay() === 5;

      return {
        day: dayValue,
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
        isFriday,
      };
    });

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

        const body = monthTimes.map(({
          day,
          athanFajr,
          athanDhuhr,
          athanAsr,
          athanMaghrib,
          athanIsha,
          iqamaFajr,
          iqamaDhuhr,
          iqamaAsr,
          iqamaMaghrib,
          iqamaIsha,
        }) => [
          day,
          athanFajr,
          athanDhuhr,
          athanAsr,
          athanMaghrib,
          athanIsha,
          blankCell,
          iqamaFajr,
          iqamaDhuhr,
          iqamaAsr,
          iqamaMaghrib,
          iqamaIsha,
        ]);

        autoTable(doc, {
          head,
          body,
          startY: 20,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [255, 224, 102], textColor: [51, 51, 51] },
          margin: { left: 12, right: 12 },
          tableWidth: 'wrap',
          columnStyles: {
            0: { cellWidth: 13 },
            1: { cellWidth: 16 },
            2: { cellWidth: 16 },
            3: { cellWidth: 16 },
            4: { cellWidth: 16 },
            5: { cellWidth: 16 },
            6: {
              cellWidth: 6,
              lineWidth: 0,
              fillColor: [255, 255, 255],
              textColor: [255, 255, 255],
            },
            7: { cellWidth: 17 },
            8: { cellWidth: 17 },
            9: { cellWidth: 17 },
            10: { cellWidth: 17 },
            11: { cellWidth: 17 },
          },
          didParseCell: (data) => {
            if (data.column.index === 6) {
              data.cell.styles.fillColor = [255, 255, 255];
              data.cell.styles.lineWidth = 0;
              data.cell.styles.textColor = [255, 255, 255];
              return;
            }

            if (data.row.index < monthTimes.length && monthTimes[data.row.index].isFriday) {
              data.cell.styles.fillColor = [255, 224, 102];
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
                  <th rowSpan="2" className="day-header">Day</th>
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
                  monthTimes.map(({
                    day,
                    athanFajr,
                    athanDhuhr,
                    athanAsr,
                    athanMaghrib,
                    athanIsha,
                    iqamaFajr,
                    iqamaDhuhr,
                    iqamaAsr,
                    iqamaMaghrib,
                    iqamaIsha,
                    isFriday,
                  }) => (
                    <tr key={day} className={isFriday ? 'title-row' : undefined}>
                      <td>{parseInt(day, 10)}</td>
                      <td className="athan-col">{athanFajr}</td>
                      <td className="athan-col">{athanDhuhr}</td>
                      <td className="athan-col">{athanAsr}</td>
                      <td className="athan-col">{athanMaghrib}</td>
                      <td className="athan-col athan-last">{athanIsha}</td>
                      <td className="section-gap" aria-hidden="true"></td>
                      <td className="iqama-col iqama-first">{iqamaFajr}</td>
                      <td className="iqama-col">{iqamaDhuhr}</td>
                      <td className="iqama-col">{iqamaAsr}</td>
                      <td className="iqama-col">{iqamaMaghrib}</td>
                      <td className="iqama-col">{iqamaIsha}</td>
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

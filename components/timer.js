import React from 'react';

export default function Timer() {
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const deadline = 'December, 31, 2023';

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  React.useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer" role="timer">
<p id="day">{days < 10 ? '0' + days : days} Days - {hours < 10 ? '0' + hours : hours} Hours - {minutes < 10 ? '0' + minutes : minutes} Minutes - {seconds < 10 ? '0' + seconds : seconds} Seconds</p>
    </div>
  );
}

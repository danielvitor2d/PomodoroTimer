import { useEffect, useState, useMemo } from 'react';
import '../styles/global.scss';
import music from '../assets/music.mp3';

function Home() {
  let song = useMemo(() => {
    return new Audio(music);
  }, []);

  const [title, setTitle] = useState('Pomodoro');

  const [minutePomodoro, setMinutePomodoro] = useState(25);
  const [minuteBreak, setMinuteBreak] = useState(5);

  const [timerRunning, setTimerRunning] = useState(false);
  const [timerOn, setTimerOn] = useState(false);

  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    let interval:any = null;
    if (timerOn) {
      setTimerRunning(true);
      interval = setInterval(() => {
        if (second > 0) {
          setSecond(second - 1);
        } else {
          if (minute > 0) {
            setSecond(59);
            setMinute(minute - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (second === 0 && minute === 0) {
      // Play a song
      song.play();
      setTimeout(() => {
        song.pause()
      }, 4000);

      if (title !== "Break") {
        setTitle('Break');
        setMinute(minuteBreak);
        setSecond(0);
        setTimerOn(true);
      } else {
        setTitle('Pomodoro');
        setMinute(minutePomodoro);
        setSecond(0);
        setTimerOn(false);
        setTimerRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [minute, minuteBreak, minutePomodoro, second, song, timerOn, title]);

  return (
    <div className="page">
      <div>
        <strong>{title}</strong>
        <div className="clock">
          <p>{minute < 10 ? '0' + minute : minute}:{second < 10 ? '0' + second : second}</p>
        </div>
        <div className="buttons">
            <button id="playButton" onClick={() => setTimerOn(!timerOn)}>{timerOn ? "Pause" : "Play"}</button>
            <button id="resetButton" onClick={() => {
              setTimerOn(false);
              setMinute(minutePomodoro);
              setSecond(0);
              setTimerRunning(false);
            }}>Reset</button>
        </div>
      </div>
      <div>
        <div className="leftBox">
          <div className="pomodoro">
            <div>
              <div className="inc-button" onClick={() => {
                if (!timerRunning) {
                  setMinutePomodoro(minutePomodoro + 1);
                  setMinute(minutePomodoro + 1);
                }
              }}/>
              <div className="dec-button" onClick={() => {
                if (!timerRunning) {
                  setMinutePomodoro(Math.max(1, minutePomodoro - 1));
                  setMinute(Math.max(1, minutePomodoro - 1));
                }
              }}/>
            </div>
            <p>{minutePomodoro}:00</p>
          </div>
          <strong className="text">Pomodoro</strong>
        </div>
        <div className="rightBox">
          <div className="break">
            <div>
              <div className="inc-button" onClick={() => {
                if (!timerRunning) setMinuteBreak(minuteBreak + 1);
              }}/>
              <div className="dec-button" onClick={() => {
                if (!timerRunning) setMinuteBreak(Math.max(1, minuteBreak - 1));
              }}/>
            </div>
            <p>{minuteBreak}:00</p>
          </div>
          <strong className="text">Break</strong>
        </div>
      </div>
    </div>
  );
}

export default Home;
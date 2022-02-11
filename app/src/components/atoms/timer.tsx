import { IonProgressBar } from "@ionic/react";
import { useState, useEffect } from "react";

export interface TimerProps {
  onTimeout: () => void;
  timeoutMs: number;
  resolutionMs: number;
}

const Timer: React.FC<TimerProps> = ({
  onTimeout,
  timeoutMs,
  resolutionMs,
}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [deadline] = useState(Date.now() + timeoutMs);
  useEffect(() => {
    const timer = setTimeout(() => {
      const now = Date.now();
      if (deadline <= now) {
        onTimeout();
      } else {
        setCurrentTime(now);
      }
    }, resolutionMs);
    return () => clearTimeout(timer);
  }, [timeoutMs, resolutionMs, onTimeout, currentTime, deadline]);

  return <IonProgressBar value={(deadline - currentTime) / timeoutMs} />;
};

export default Timer;

// 实现倒计时效果
import { useState, useEffect } from "react";
export default function useCountdown(time) {
  const { day, hour, minute, second } = time;
  let dayS = Math.ceil(day * 24 * 60 * 60);
  let hourS = Math.ceil(hour * 60 * 60);
  let minuteS = Math.ceil(minute * 60);
  let allTime = dayS + hourS + minuteS + second;
  const [count, setCount] = useState(allTime * 1000);
  const formatMoment = (ms, type = "DD HH:mm:ss") => {
    let ele = <>0 0:0:0</>;
    if (ms <= 0) {
      ele = <>0 0:0:0</>;
    }
    let remainTs = ms;
    let day = 0;
    if (type.indexOf("DD") !== -1) {
      day = Math.floor(ms / 1000 / 3600 / 24);
      remainTs = ms % (24 * 60 * 60 * 1000);
    }
    const hour = Math.floor(remainTs / 60 / 60 / 1000);
    remainTs %= 60 * 60 * 1000;
    const minute = Math.floor(remainTs / 60 / 1000);
    remainTs %= 60 * 1000;
    const second = Math.floor(remainTs / 1000);
    ele = <>{`${day} ${hour}:${minute}:${second}`}</>;
    return ele;
  };
  useEffect(() => {
    if (!count) return false;
    let timer = setTimeout(() => {
      setCount(count - 1000);
      return () => clearTimeout(timer);
    }, 1000);
  }, [count]);
  return (
    <>
      {formatMoment(count)}
      {/* {count} */}
    </>
  );
}

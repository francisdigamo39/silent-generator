import { useEffect, useMemo, useRef, useState } from "react";
import type { Telemetry, HistoryDataPoint, ChartDataPoint } from "@/types";
import { clamp, randn } from "@/lib/telemetry-utils";

export function useFakeTelemetry(live: boolean) {
  const [tele, setTele] = useState<Telemetry>(() => ({
    ts: Date.now(),
    solarVoltage: 17.2,
    solarPower: 120,
    soundDb: 62,
    piezoVoltage: 2.6,
    batterySoc: 95,
    batteryTemp: 31,
    outputMode: "DC",
    outputOn: true,
    loadPower: 95,
    netCharge: -15,
  }));

  const history1MinRef = useRef<HistoryDataPoint[]>([]);
  const history1HourRef = useRef<HistoryDataPoint[]>([]);
  const history24HourRef = useRef<HistoryDataPoint[]>([]);
  const smoothedNetChargeRef = useRef<number>(-15);

  // Initialize multi-timeframe history
  useEffect(() => {
    if (history1MinRef.current.length) return;
    const now = Date.now();
    let soc = 95;

    // 1 minute: 60 seconds of data
    const arr1Min: HistoryDataPoint[] = [];
    for (let i = 59; i >= 0; i--) {
      const ts = now - i * 1000;
      const solar = clamp(120 + randn(0, 15), 0, 280);
      const sound = clamp(60 + randn(0, 3), 40, 85);
      const load = clamp(95 + randn(0, 8), 20, 180);
      soc = clamp(soc - 0.0008 + randn(0, 0.0002), 75, 100);
      arr1Min.push({ ts, solar, sound, soc, load });
    }
    history1MinRef.current = arr1Min;

    // 1 hour: 60 data points (1 per minute)
    const arr1Hour: HistoryDataPoint[] = [];
    soc = 95;
    for (let i = 59; i >= 0; i--) {
      const ts = now - i * 60 * 1000;
      const solar = clamp(120 + randn(0, 15), 0, 280);
      const sound = clamp(60 + randn(0, 3), 40, 85);
      const load = clamp(95 + randn(0, 8), 20, 180);
      soc = clamp(soc - 0.05 + randn(0, 0.01), 75, 100);
      arr1Hour.push({ ts, solar, sound, soc, load });
    }
    history1HourRef.current = arr1Hour;

    // 24 hours: 24 data points (1 per hour)
    const arr24Hour: HistoryDataPoint[] = [];
    soc = 95;
    for (let i = 23; i >= 0; i--) {
      const ts = now - i * 60 * 60 * 1000;
      const solar = clamp(120 + randn(0, 20), 0, 280);
      const sound = clamp(60 + randn(0, 5), 40, 85);
      const load = clamp(95 + randn(0, 10), 20, 180);
      soc = clamp(soc - 1.2 + randn(0, 0.2), 75, 100);
      arr24Hour.push({ ts, solar, sound, soc, load });
    }
    history24HourRef.current = arr24Hour;
  }, []);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      setTele((prev) => {
        const isDay = new Date().getHours() >= 7 && new Date().getHours() <= 17;
        const solarBase = isDay ? 140 : 10;
        const solarP = clamp(solarBase + randn(0, isDay ? 15 : 5), 0, 280);
        const solarV = clamp(16.5 + randn(0, 0.5), 10, 22);
        const soundDb = clamp(60 + randn(0, 3), 40, 85);
        const piezoV = clamp(2.3 + (soundDb - 50) * 0.03 + randn(0, 0.1), 0.3, 5.0);
        const load = clamp(prev.outputOn ? 95 + randn(0, 8) : 5, 0, 220);

        // Calculate instantaneous net charge
        const instantNet = clamp(solarP + soundDb * 0.6 - load, -200, 250);

        // Apply exponential smoothing for stable power flow (alpha = 0.1 for slow changes)
        smoothedNetChargeRef.current = smoothedNetChargeRef.current * 0.9 + instantNet * 0.1;
        const net = smoothedNetChargeRef.current;

        // Gradually decrease SOC with much smaller steps
        const nextSoc = clamp(prev.batterySoc - 0.002 + randn(0, 0.001), 75, 100);
        const temp = clamp(prev.batteryTemp + randn(0, 0.15) + (load > 150 ? 0.05 : 0), 20, 55);
        const next: Telemetry = {
          ts: Date.now(),
          solarVoltage: solarV,
          solarPower: solarP,
          soundDb,
          piezoVoltage: piezoV,
          batterySoc: nextSoc,
          batteryTemp: temp,
          outputMode: prev.outputMode,
          outputOn: prev.outputOn,
          loadPower: load,
          netCharge: net,
        };
        // Update all history buffers
        // 1 minute: every second
        history1MinRef.current.push({ ts: next.ts, solar: next.solarPower, sound: next.soundDb, soc: next.batterySoc, load: next.loadPower });
        if (history1MinRef.current.length > 60) history1MinRef.current.shift();

        // 1 hour: every 60 seconds
        if (history1HourRef.current.length === 0 || Date.now() - history1HourRef.current[history1HourRef.current.length - 1].ts >= 60000) {
          history1HourRef.current.push({ ts: next.ts, solar: next.solarPower, sound: next.soundDb, soc: next.batterySoc, load: next.loadPower });
          if (history1HourRef.current.length > 60) history1HourRef.current.shift();
        }

        // 24 hours: every 3600 seconds
        if (history24HourRef.current.length === 0 || Date.now() - history24HourRef.current[history24HourRef.current.length - 1].ts >= 3600000) {
          history24HourRef.current.push({ ts: next.ts, solar: next.solarPower, sound: next.soundDb, soc: next.batterySoc, load: next.loadPower });
          if (history24HourRef.current.length > 24) history24HourRef.current.shift();
        }

        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [live]);

  const charts = useMemo(() => {
    const data1Min: ChartDataPoint[] = history1MinRef.current.map((d) => ({
      time: new Date(d.ts).toLocaleTimeString([], { minute: "2-digit", second: "2-digit" }),
      Solar: Math.round(d.solar),
      Sound: Math.round(d.sound),
      Load: Math.round(d.load),
      SOC: d.soc,
    }));

    const data1Hour: ChartDataPoint[] = history1HourRef.current.map((d) => ({
      time: new Date(d.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      Solar: Math.round(d.solar),
      Sound: Math.round(d.sound),
      Load: Math.round(d.load),
      SOC: d.soc,
    }));

    const data24Hour: ChartDataPoint[] = history24HourRef.current.map((d) => ({
      time: new Date(d.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      Solar: Math.round(d.solar),
      Sound: Math.round(d.sound),
      Load: Math.round(d.load),
      SOC: d.soc,
    }));

    return { data1Min, data1Hour, data24Hour };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tele.ts]);

  return { tele, charts } as const;
}

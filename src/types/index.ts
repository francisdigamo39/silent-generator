export type Telemetry = {
  ts: number;
  solarVoltage: number; // V
  solarPower: number; // W
  soundDb: number; // dB
  piezoVoltage: number; // V
  batterySoc: number; // %
  batteryTemp: number; // °C
  outputMode: "DC" | "AC";
  outputOn: boolean;
  loadPower: number; // W
  netCharge: number; // W (positive charging, negative discharging)
};

export type HistoryDataPoint = {
  ts: number;
  solar: number;
  sound: number;
  soc: number;
  load: number;
};

export type ChartDataPoint = {
  time: string;
  Solar: number;
  Sound: number;
  Load: number;
  SOC: number;
};

export type ChartData = {
  data1Min: ChartDataPoint[];
  data1Hour: ChartDataPoint[];
  data24Hour: ChartDataPoint[];
};

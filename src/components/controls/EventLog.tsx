import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Telemetry } from "@/types";

type EventLogProps = {
  tele: Telemetry;
};

export function EventLog({ tele }: EventLogProps) {
  const events = [
    { t: "13:10:05", e: `Net ${tele.netCharge >= 0 ? "+" : "-"}${Math.abs(Math.round(tele.netCharge))}W`, s: "Info" },
    { t: "13:09:50", e: `Sound ${Math.round(tele.soundDb)} dB`, s: "Info" },
    { t: "13:09:10", e: `Solar ${Math.round(tele.solarPower)} W @ ${tele.solarVoltage.toFixed(1)} V`, s: "Info" },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Event Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Time</TableHead>
              <TableHead>Event</TableHead>
              <TableHead className="w-[100px]">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-mono text-xs">{row.t}</TableCell>
                <TableCell className="text-sm">{row.e}</TableCell>
                <TableCell>
                  <Badge variant={row.s === "Warn" ? "destructive" : "secondary"}>{row.s}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

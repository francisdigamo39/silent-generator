// src/components/stats/SimpleStatCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

type SimpleStatCardProps = {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status?: 'good' | 'warning' | 'error' | 'neutral';
  subtitle?: string;
};

export function SimpleStatCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  status = 'neutral',
  subtitle 
}: SimpleStatCardProps) {
  const statusColors = {
    good: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    neutral: 'text-blue-600 dark:text-blue-400'
  };

  const bgColors = {
    good: 'bg-green-100 dark:bg-green-900/20',
    warning: 'bg-yellow-100 dark:bg-yellow-900/20',
    error: 'bg-red-100 dark:bg-red-900/20',
    neutral: 'bg-blue-100 dark:bg-blue-900/20'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${bgColors[status]}`}>
          <Icon className={`h-4 w-4 ${statusColors[status]}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className={`text-2xl font-bold ${statusColors[status]}`}>
            {value}
          </div>
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
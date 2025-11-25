// src/components/ai/AIInsights.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';
import GeminiAIService, { type EnergyData, type AIInsight } from '@/services/gemini-ai';

type AIInsightsProps = {
  energyData: EnergyData[];
  apiKey: string;
};

export function AIInsights({ energyData, apiKey }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    if (!apiKey) {
      setError('API key not configured');
      return;
    }

    if (energyData.length === 0) {
      setError('No data available for analysis');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const service = new GeminiAIService(apiKey);
      const result = await service.generateInsights(energyData);
      setInsights(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate insights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (energyData.length > 0 && apiKey) {
      generateInsights();
    }
  }, []);

  const getTrendIcon = () => {
    if (!insights) return null;
    
    switch (insights.efficiency.trend) {
      case 'improving':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'declining':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <CardTitle>AI-Generated Insights</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateInsights}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Analyzing...' : 'Refresh'}
          </Button>
        </div>
        <CardDescription>
          Powered by Google Gemini AI
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw className="h-8 w-8 animate-spin text-purple-500" />
              <p className="text-sm text-muted-foreground">Analyzing energy data...</p>
            </div>
          </div>
        )}

        {insights && !loading && (
          <>
            {/* Efficiency Score */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Efficiency Score</span>
                {getTrendIcon()}
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${getScoreColor(insights.efficiency.score)}`}>
                  {insights.efficiency.score}
                </span>
                <span className="text-muted-foreground">/100</span>
              </div>
              <Badge 
                variant="secondary" 
                className="mt-2"
              >
                {insights.efficiency.trend}
              </Badge>
            </div>

            {/* Summary */}
            <div>
              <h3 className="font-semibold mb-2">Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {insights.summary}
              </p>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-semibold mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {insights.recommendations.map((rec, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Predictions */}
            <div>
              <h3 className="font-semibold mb-3">Predictions</h3>
              <ul className="space-y-2">
                {insights.predictions.map((pred, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-blue-500 mt-0.5">▸</span>
                    <span className="text-muted-foreground">{pred}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
// src/services/gemini-ai.ts

export type EnergyData = {
    piezoVoltage: number;
    solarStatus: 'HIGH' | 'LOW';
    timestamp: Date;
    energyHarvested: number;
  };
  
  export type AIInsight = {
    summary: string;
    recommendations: string[];
    predictions: string[];
    efficiency: {
      score: number;
      trend: 'improving' | 'declining' | 'stable';
    };
  };
  
  // System prompt for Gemini AI
  const SYSTEM_PROMPT = `You are an AI assistant specialized in analyzing renewable energy data from a silent generator system. 
  
  The system collects:
  - Piezo Voltage: Voltage readings from piezoelectric transducer (in volts)
  - Solar Status: HIGH (producing) or LOW (not producing)
  - Energy Harvested: Total energy collected from both sources
  
  Analyze the provided data and generate insights including:
  1. A brief summary of current energy production
  2. Actionable recommendations for optimization
  3. Predictions based on patterns
  4. An efficiency score (0-100) and trend assessment
  
  Respond ONLY with valid JSON in this exact format:
  {
    "summary": "Brief overview of energy production",
    "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
    "predictions": ["prediction 1", "prediction 2"],
    "efficiency": {
      "score": 85,
      "trend": "improving"
    }
  }`;
  
  class GeminiAIService {
    private apiKey: string;
    private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
    }
  
    async generateInsights(energyData: EnergyData[]): Promise<AIInsight> {
      if (!this.apiKey) {
        throw new Error('Gemini API key not configured');
      }
  
      // Prepare data summary
      const dataSummary = this.prepareDataSummary(energyData);
  
      try {
        const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${SYSTEM_PROMPT}\n\nAnalyze this energy data:\n${dataSummary}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        });
  
        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`);
        }
  
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
        if (!text) {
          throw new Error('No response from Gemini API');
        }
  
        // Parse JSON response
        const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
        const insights: AIInsight = JSON.parse(cleanText);
  
        return insights;
      } catch (error) {
        console.error('Error generating AI insights:', error);
        
        // Return fallback insights
        return this.generateFallbackInsights(energyData);
      }
    }
  
    private prepareDataSummary(energyData: EnergyData[]): string {
      if (energyData.length === 0) {
        return 'No data available';
      }
  
      const avgPiezoVoltage = energyData.reduce((sum, d) => sum + d.piezoVoltage, 0) / energyData.length;
      const solarHighCount = energyData.filter(d => d.solarStatus === 'HIGH').length;
      const solarHighPercentage = (solarHighCount / energyData.length) * 100;
      const totalEnergyHarvested = energyData.reduce((sum, d) => sum + d.energyHarvested, 0);
      const latestReading = energyData[energyData.length - 1];
  
      return `
  Data Points: ${energyData.length}
  Time Range: ${energyData[0].timestamp.toISOString()} to ${latestReading.timestamp.toISOString()}
  
  Piezoelectric Transducer:
  - Average Voltage: ${avgPiezoVoltage.toFixed(2)}V
  - Latest Reading: ${latestReading.piezoVoltage.toFixed(2)}V
  
  Solar Panel:
  - Status Uptime: ${solarHighPercentage.toFixed(1)}% HIGH
  - Current Status: ${latestReading.solarStatus}
  
  Energy Production:
  - Total Harvested: ${totalEnergyHarvested.toFixed(2)} units
  - Latest Production Rate: ${latestReading.energyHarvested.toFixed(2)} units
  `;
    }
  
    private generateFallbackInsights(energyData: EnergyData[]): AIInsight {
      const avgPiezo = energyData.reduce((sum, d) => sum + d.piezoVoltage, 0) / energyData.length;
      const solarHighPercentage = (energyData.filter(d => d.solarStatus === 'HIGH').length / energyData.length) * 100;
      
      const score = Math.min(100, Math.round((avgPiezo / 5) * 50 + (solarHighPercentage / 2)));
      
      return {
        summary: `System is operating with ${avgPiezo.toFixed(2)}V average piezo voltage and ${solarHighPercentage.toFixed(1)}% solar uptime.`,
        recommendations: [
          'Monitor piezo voltage trends for optimal positioning',
          'Check solar panel alignment for maximum exposure',
          'Review energy consumption patterns'
        ],
        predictions: [
          'Energy production expected to remain stable',
          'Consider battery capacity optimization'
        ],
        efficiency: {
          score,
          trend: score >= 75 ? 'improving' : score >= 50 ? 'stable' : 'declining'
        }
      };
    }
  }
  
  export default GeminiAIService;
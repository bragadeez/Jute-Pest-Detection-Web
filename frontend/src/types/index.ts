export interface PredictionResponse {
  pest: string;
  confidence: number;
  explanation: string; // Base64 encoded PNG data URL from LIME
  status: string;
}

export type SeverityType = 'Low' | 'Medium' | 'High';

export interface PestDetails {
  name: string;
  severity: SeverityType;
  description: string;
  symptoms: string;
  treatment: string;
}

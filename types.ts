export enum DecayMode {
  Alpha = "Alpha",
  Beta = "Beta",
  Gamma = "Gamma",
  SpontaneousFission = "Spontaneous Fission",
}

export interface RadioactiveIsotope {
  id: string;
  elementSymbol: string;    // e.g., "U", "C", "Th"
  massNumber: number;       // e.g., 238, 14
  halfLifeInYears: number;  // Decay half-life
  decayMode: DecayMode;
  isStable: boolean;
  notes?: string;
}

export type FullyConfiguredIsotope = Required<RadioactiveIsotope>;

export interface TelemetryPayload<T> {
  timestamp: number;
  sensorId: string;
  data: T;
}

export interface StorageRepository<T extends { id: string }> {
  save(item: T): void;
  findById(id: string): T | undefined;
  findAll(): readonly T[];
}

export type IsotopeUpdateDTO = Partial<RadioactiveIsotope>;

export type CreateIsotopeDTO = Omit<RadioactiveIsotope, "id" | "isStable">;

export type IsotopeSummary = Pick<RadioactiveIsotope, "elementSymbol" | "massNumber" | "halfLifeInYears">;

export type SeverityLevel = "Low" | "Medium" | "High" | "Critical";
export type HazardCatalog = Record<DecayMode, { hazardLevel: SeverityLevel; shieldingRequired: string }>;

export type ShieldingGuide = Record<SeverityLevel, {leadThicknessCm: number, requiresWaterBarrier: boolean}>;
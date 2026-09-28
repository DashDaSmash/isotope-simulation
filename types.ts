export interface RadioactiveIsotope {
  id: string;
  elementSymbol: string;    // e.g., "U", "C", "Th"
  massNumber: number;       // e.g., 238, 14
  halfLifeInYears: number;  // Decay half-life
  decayMode: "Alpha" | "Beta" | "Gamma" | "Spontaneous Fission";
  isStable: boolean;
  notes?: string;
}

export interface TelemetryPayload<T> {
  timestamp: number;
  sensorId: string;
  data: T;
}

export interface StorageRepository<T extends { id: string }> {
  save(item: T): void;
  findById(id: string): T | undefined;
  findAll(): T[];
}

export type IsotopeUpdateDTO = Partial<RadioactiveIsotope>;

export type CreateIsotopeDTO = Omit<RadioactiveIsotope, "id" | "isStable">;

export type IsotopeSummary = Pick<RadioactiveIsotope, "elementSymbol" | "massNumber" | "halfLifeInYears">;

export type DecayMode = RadioactiveIsotope["decayMode"];
export type HazardCatalog = Record<DecayMode, { hazardLevel: "Low" | "Medium" | "High"; shieldingRequired: string }>;
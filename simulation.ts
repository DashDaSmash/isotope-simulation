import {
  RadioactiveIsotope,
  TelemetryPayload,
  CreateIsotopeDTO,
  IsotopeSummary,
  HazardCatalog,
} from "./types";
import { InMemoryRepository } from "./repository";

const isotopeRepo = new InMemoryRepository<RadioactiveIsotope>();

function registerIsotope(dto: CreateIsotopeDTO): RadioactiveIsotope {
  const newIsotope: RadioactiveIsotope = {
    ...dto,
    id: `iso_${Math.random().toString(36).substring(2, 7)}`,
    isStable: dto.halfLifeInYears > 1e10,
  };
  isotopeRepo.save(newIsotope);
  return newIsotope;
}

const uranium = registerIsotope({
  elementSymbol: "U",
  massNumber: 238,
  halfLifeInYears: 4468000000,
  decayMode: "Alpha",
  notes: "Primary natural uranium isotope",
});

isotopeRepo.update(uranium.id, {
  notes: "Updated with recalibrated decay half-life assessment",
});

const hazardCatalog: HazardCatalog = {
  Alpha: { hazardLevel: "Medium", shieldingRequired: "Paper or skin surface layer" },
  Beta: { hazardLevel: "Medium", shieldingRequired: "Aluminum plate or Plexiglas" },
  Gamma: { hazardLevel: "High", shieldingRequired: "Dense lead block or concrete walls" },
  "Spontaneous Fission": { hazardLevel: "High", shieldingRequired: "Heavy water, paraffin, and thick concrete" },
};

function captureTelemetry<T>(sensorId: string, data: T): TelemetryPayload<T> {
  return {
    timestamp: Date.now(),
    sensorId,
    data,
  };
}

const uraniumSummary: IsotopeSummary = {
  elementSymbol: uranium.elementSymbol,
  massNumber: uranium.massNumber,
  halfLifeInYears: uranium.halfLifeInYears,
};

const telemetryEvent = captureTelemetry("GEIGER_COUNTER_01", uraniumSummary);

console.log("Registered Isotope:", isotopeRepo.findById(uranium.id));
console.log("Decay Hazard Rating:", hazardCatalog[uranium.decayMode]);
console.log("Emitted Telemetry Packet:", telemetryEvent);

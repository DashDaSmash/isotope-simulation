import {
  RadioactiveIsotope,
  TelemetryPayload,
  CreateIsotopeDTO,
  IsotopeSummary,
  HazardCatalog,
  FullyConfiguredIsotope,
  ShieldingGuide,
  DecayMode,
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
  decayMode: DecayMode.Alpha,
  notes: "Primary natural uranium isotope",
});

const cobalt = registerIsotope({
  elementSymbol: "Co",
  massNumber: 60,
  halfLifeInYears: 5.27,
  decayMode: DecayMode.Beta,
});

isotopeRepo.update(uranium.id, {
  notes: "Updated with recalibrated decay half-life assessment",
});

// Repository Readonly Collections
const allIsotopes = isotopeRepo.findAll();
console.log("All Repository Isotopes (Read Only List)");
console.log(allIsotopes);

// Uncommenting the line below will trigger a Compiler Error
// allIsotopes.push(uranium);

// All fields, including optional ones like notes MUST be present
const publishedIsotopeRecord: FullyConfiguredIsotope = {
  id: cobalt.id,
  elementSymbol: cobalt.elementSymbol,
  massNumber: cobalt.massNumber,
  halfLifeInYears: cobalt.halfLifeInYears,
  decayMode: cobalt.decayMode,
  isStable: cobalt.isStable,
  notes: "Verified by National Nuclear Laboratory",
};

console.log("\nFully Configured Isotope Record");
console.log(publishedIsotopeRecord);

const hazardCatalog: HazardCatalog = {
  Alpha: {
    hazardLevel: "Medium",
    shieldingRequired: "Paper or skin surface layer",
  },
  Beta: {
    hazardLevel: "Medium",
    shieldingRequired: "Aluminum plate or Plexiglas",
  },
  Gamma: {
    hazardLevel: "High",
    shieldingRequired: "Dense lead block or concrete walls",
  },
  "Spontaneous Fission": {
    hazardLevel: "Critical",
    shieldingRequired: "Heavy water, paraffin, and thick concrete",
  },
};

// Mapped using Record
const shieldingGuide: ShieldingGuide = {
  Low: { leadThicknessCm: 0.1, requiresWaterBarrier: false },
  Medium: { leadThicknessCm: 1.5, requiresWaterBarrier: false },
  High: { leadThicknessCm: 10.0, requiresWaterBarrier: true },
  Critical: { leadThicknessCm: 30.0, requiresWaterBarrier: true },
};

console.log("\nShielding Engineering Specifications");
console.log(
  "Alpha Hazard Level:",
  hazardCatalog[uranium.decayMode].hazardLevel,
);
console.log(
  "Corresponding Shielding Specs:",
  shieldingGuide[hazardCatalog[uranium.decayMode].hazardLevel],
);

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

console.log("\nGeneric Telemetry Event");
console.log(telemetryEvent);

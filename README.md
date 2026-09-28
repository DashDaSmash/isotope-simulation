# A Simple Isotope Simulation

A Simple TypeScript engine built to demonstrate core language features, specifically **Generics**, **Generic Constraints**, and **Utility Types** (`Partial`, `Pick`, `Omit`, `Record`). 

The engine models radioactive isotope entities, decay hazard safety levels, and generic telemetry data streams.

---

## Key TypeScript Concepts Demonstrated

* **Generics (`<T>`)**: Flexible wrapper interfaces like `TelemetryPayload<T>` transmit typed payload structures without losing type safety.
* **Generic Constraints (`T extends { id: string }`)**: Enforces that stored items inside `InMemoryRepository<T>` possess a unique string `id`.
* **Omit<Type, Keys>**: Used in `CreateIsotopeDTO` to strip out system-generated fields (`id`, `isStable`) prior to record creation.
* **Partial<Type>**: Used in `IsotopeUpdateDTO` and repository updates to allow partial entity modifications.
* **Pick<Type, Keys>**: Used in `IsotopeSummary` to select a subset of entity properties for lightweight reporting.
* **Record<Keys, Type>**: Used in `HazardCatalog` to map decay modes directly to structured radiation safety metadata.

---

## Repository Structure

```text
.
├── types.ts        # Domain models, generic interfaces, and derived utility types
├── repository.ts   # Generic repository implementation with updates
└── simulation.ts   # Execution script demonstrating type-safe workflows
```

---

## Getting Started

Run the simulation directly
```Bash
npx tsx simulation.ts
```

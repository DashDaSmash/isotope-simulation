import { StorageRepository } from "./types";

export class InMemoryRepository<T extends { id: string }> implements StorageRepository<T> {
  private items = new Map<string, T>();

  save(item: T): void {
    this.items.set(item.id, item);
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  update(id: string, updates: Partial<T>): T {
    const existing = this.findById(id);
    if (!existing) {
      throw new Error(`Item with id ${id} not found.`);
    }
    const updated = { ...existing, ...updates };
    this.items.set(id, updated);
    return updated;
  }
}
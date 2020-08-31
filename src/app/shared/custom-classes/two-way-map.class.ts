// Classe Map One-to-one para tuplas de valores e chaves exclusivos
// Não pode ser utilizada com valores iguais para múltiplas chaves
// ou chaves iguais para múltiplos valores
export class TwoWayMap<T1, T2> {
  private mapTo: Map<T1, T2>;
  private mapFrom: Map<T2, T1>;

  constructor(options?: [T1, T2][]) {
    this.mapTo = new Map<T1, T2>(options || []);
    this.mapFrom = new Map<T2, T1>(
      (options || []).map(([key, value]) => {
        return [value, key];
      })
    );
  }

  getValue(key: T1): T2 {
    return this.mapTo.get(key);
  }

  getKey(value: T2): T1 {
    return this.mapFrom.get(value);
  }

  setKeyValue(key: T1, value: T2): void {
    const previousValue = this.mapTo.get(key);
    const previousKey = this.mapFrom.get(value);
    this.mapTo.delete(previousKey);
    this.mapFrom.delete(previousValue);
    this.mapTo.set(key, value);
    this.mapFrom.set(value, key);
  }

  setValueKey(value: T2, key: T1): void {
    const previousValue = this.mapTo.get(key);
    const previousKey = this.mapFrom.get(value);
    this.mapTo.delete(previousKey);
    this.mapFrom.delete(previousValue);
    this.mapTo.set(key, value);
    this.mapFrom.set(value, key);
  }
}

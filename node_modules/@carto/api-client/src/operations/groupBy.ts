import {aggregationFunctions, aggregate} from './aggregation.js';
import {AggregationType} from '../types.js';
import {FeatureData} from '../types-internal.js';

/** @privateRemarks Source: @carto/react-core */
export type GroupByFeature = {
  name: string;
  value: number;
}[];

/** @privateRemarks Source: @carto/react-core */
export function groupValuesByColumn({
  data,
  valuesColumns,
  joinOperation,
  keysColumn,
  operation,
}: {
  data: FeatureData[];
  valuesColumns?: string[];
  joinOperation?: AggregationType;
  keysColumn: string;
  operation: AggregationType;
}): GroupByFeature | null {
  if (Array.isArray(data) && data.length === 0) {
    return null;
  }
  const groups = data.reduce((accumulator, item) => {
    const group = item[keysColumn];

    const values = accumulator.get(group) || [];
    accumulator.set(group, values);

    const aggregatedValue = aggregate(item, valuesColumns, joinOperation);

    const isValid =
      (operation === 'count' ? true : aggregatedValue !== null) &&
      aggregatedValue !== undefined;

    if (isValid) {
      values.push(aggregatedValue);
      accumulator.set(group, values);
    }

    return accumulator;
  }, new Map()); // We use a map to be able to maintain the type in the key value

  const targetOperation =
    aggregationFunctions[operation as Exclude<AggregationType, 'custom'>];

  if (targetOperation) {
    return Array.from(groups).map(([name, value]) => ({
      name,
      value: targetOperation(value),
    }));
  }

  return [];
}

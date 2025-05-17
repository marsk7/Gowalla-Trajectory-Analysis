import {aggregate, aggregationFunctions} from './aggregation.js';
import {AggregationType} from '../types.js';
import {FeatureData} from '../types-internal.js';

/**
 * Histogram computation.
 * @privateRemarks Source: @carto/react-core
 */
export function histogram({
  data,
  valuesColumns,
  joinOperation,
  ticks,
  operation,
}: {
  data: FeatureData[];
  valuesColumns?: string[];
  joinOperation?: Exclude<AggregationType, 'custom'>;
  ticks: number[];
  operation: Exclude<AggregationType, 'custom'>;
}): number[] {
  if (Array.isArray(data) && data.length === 0) {
    return [];
  }

  const binsContainer = [Number.MIN_SAFE_INTEGER, ...ticks].map(
    (tick, index, arr) => ({
      bin: index,
      start: tick,
      end: index === arr.length - 1 ? Number.MAX_SAFE_INTEGER : arr[index + 1],
      values: [] as number[],
    })
  );

  data.forEach((feature) => {
    const featureValue = aggregate(
      feature,
      valuesColumns,
      joinOperation
    ) as number;

    const isValid = featureValue !== null && featureValue !== undefined;

    if (!isValid) {
      return;
    }

    const binContainer = binsContainer.find(
      (bin) => bin.start <= featureValue && bin.end > featureValue
    );

    if (!binContainer) {
      return;
    }

    binContainer.values.push(featureValue);
  });

  const targetOperation = aggregationFunctions[operation];
  const transformedBins = binsContainer.map(
    (binContainer) => binContainer.values
  );
  return transformedBins.map((values) =>
    values.length ? targetOperation(values) : 0
  );
}

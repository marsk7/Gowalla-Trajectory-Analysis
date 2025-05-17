import {AggregationType, GroupDateType} from '../types.js';
import {getUTCMonday} from '../utils/dateUtils.js';
import {aggregate, aggregationFunctions} from './aggregation.js';
import {GroupByFeature} from './groupBy.js';

const GROUP_KEY_FN_MAPPING: Record<GroupDateType, (date: Date) => number> = {
  year: (date: Date) => Date.UTC(date.getUTCFullYear()),
  month: (date: Date) => Date.UTC(date.getUTCFullYear(), date.getUTCMonth()),
  week: (date: Date) => getUTCMonday(date),
  day: (date: Date) =>
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  hour: (date: Date) =>
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours()
    ),
  minute: (date: Date) =>
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes()
    ),
  second: (date: Date) =>
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    ),
};

/** @privateRemarks Source: @carto/react-core */
export function groupValuesByDateColumn({
  data,
  valuesColumns,
  joinOperation,
  keysColumn,
  groupType,
  operation,
}: {
  data: Record<string, unknown>[];
  valuesColumns?: string[];
  joinOperation?: Exclude<AggregationType, 'custom'>;
  keysColumn: string;
  groupType: GroupDateType;
  operation?: Exclude<AggregationType, 'custom'>;
}): GroupByFeature | null {
  if (Array.isArray(data) && data.length === 0) {
    return null;
  }

  const groupKeyFn = GROUP_KEY_FN_MAPPING[groupType];

  if (!groupKeyFn) {
    return null;
  }

  const groups = data.reduce((acc, item) => {
    const value = item[keysColumn];
    const formattedValue = new Date(value as number);
    const groupKey = groupKeyFn(formattedValue);

    if (!isNaN(groupKey)) {
      let groupedValues = acc.get(groupKey);
      if (!groupedValues) {
        groupedValues = [];
        acc.set(groupKey, groupedValues);
      }

      const aggregatedValue = aggregate(item, valuesColumns, joinOperation);

      const isValid = aggregatedValue !== null && aggregatedValue !== undefined;

      if (isValid) {
        groupedValues.push(aggregatedValue);
        acc.set(groupKey, groupedValues);
      }
    }

    return acc;
  }, new Map());

  const targetOperation =
    aggregationFunctions[operation as Exclude<AggregationType, 'custom'>];

  return [...groups.entries()]
    .map(([name, value]) => ({
      name,
      value: targetOperation(value),
    }))
    .sort((a, b) => a.name - b.name);
}

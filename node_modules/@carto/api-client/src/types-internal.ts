/******************************************************************************
 * COMMON
 */

import {Format} from './types.js';

/** @internal */
export type $TODO = any;

/** @internal */
export type $IntentionalAny = any;

/******************************************************************************
 * MAP INSTANTIATION
 */

/**
 * @privateRemarks Source: @deck.gl/carto
 * @internal
 */
export enum SchemaFieldType {
  Number = 'number',
  Bigint = 'bigint',
  String = 'string',
  Geometry = 'geometry',
  Timestamp = 'timestamp',
  Object = 'object',
  Boolean = 'boolean',
  Variant = 'variant',
  Unknown = 'unknown',
}

/**
 * @privateRemarks Source: @deck.gl/carto
 * @internal
 */
export interface SchemaField {
  name: string;
  type: SchemaFieldType; // Field type in the CARTO stack, common for all providers
}

/**
 * @privateRemarks Source: @deck.gl/carto
 * @internal
 */
export interface MapInstantiation extends MapInstantiationFormats {
  nrows: number;
  size?: number;
  schema: SchemaField[];
}

/**
 * @privateRemarks Source: @deck.gl/carto
 * @internal
 */
type MapInstantiationFormats = Record<
  Format,
  {
    url: string[];
    error?: any;
  }
>;

/******************************************************************************
 * LOCAL CALCULATIONS
 */

export type FeatureData = Record<string, unknown>;

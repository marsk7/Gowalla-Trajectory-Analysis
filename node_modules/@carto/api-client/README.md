# `@carto/api-client`

JavaScript (and TypeScript) client library for [CARTO](https://carto.com/) APIs and framework-agnostic [CARTO + deck.gl](https://docs.carto.com/carto-for-developers/carto-for-deck.gl) applications.

Includes:

- [Widget](https://docs.carto.com/carto-for-developers/carto-for-react/guides/widgets) APIs
- &hellip; TBD

## Installation

Install `@carto/api-client`:

```bash
npm install --save @carto/api-client
```

## Documentation

### Fetching data

Import `vectorTableSource`, `vectorQuerySource`, and other data source functions
from the `@carto/api-client` package. These are drop-in replacements for the equivalent functions from the `@deck.gl/carto` package, and the same data source may be used with any number of layers or widgets. Tileset sources are not yet supported.

```javascript
import { vectorTableSource } from '@carto/api-client';

const data = await vectorTableSource({
  accessToken: '••••',
  connectionName: 'carto_dw',
  tableName: 'carto-demo-data.demo_tables.retail_stores'
});

// → {name: string; value: number}[]
const categories = await data.widgetSource.getCategories({
  column: 'store_type',
  operation: 'count',
});

// → {value: number}
const formula = await data.widgetSource.getFormula({operation: 'count'});

// → {totalCount: number; rows: Record<string, number | string>[]}
const table = await data.widgetSource.getTable({
  columns: ['a', 'b', 'c'],
  sortBy: ['a'],
  rowsPerPage: 20
});

...
```

### Column filter

To filter the widget source by a non-geospatial column, pass a `filters`
property to the source factory function.

```javascript
import {vectorTableSource} from '@carto/api-client';

const data = await vectorTableSource({
  accessToken: '••••',
  connectionName: 'carto_dw',
  tableName: 'carto-demo-data.demo_tables.retail_stores',
  filters: {
    store_type: {owner: 'widget-id', values: ['retail']},
  },
});
```

By default, filters affect all layers and widgets using a given data source. To
exclude a particular widget from the filter, pass a `filterOwner` parameter
matching the filters from which it should be excluded. In some cases, a widget's
results should not be affected by a filter that the widget itself created.

```javascript
// → {name: string; value: number}[]
const categories = await data.widgetSource.getCategories({
  filterOwner: 'widget-id',
  column: 'store_type',
  operation: 'count',
});
```

### Spatial filter

To filter the widget source to a spatial region, pass a `spatialFilter` parameter (GeoJSON Polygon or MultiPolygon geometry) to any data fetching function.

```javascript
// → {name: string; value: number}[]
const categories = await data.widgetSource.getCategories({
  column: 'store_type',
  operation: 'count',
  spatialFilter: {
    type: "Polygon"
    coordinates: [
      [
        [-74.0562, 40.8331],
        [-74.0562, 40.6933],
        [-73.8734, 40.6933],
        [-73.8734, 40.8331],
        [-74.0562, 40.8331]
      ]
    ],
  }
});
```

To create a spatial filter from the current [deck.gl `viewState`](https://deck.gl/docs/developer-guide/views#using-a-view-with-view-state):

```javascript
import {WebMercatorViewport} from '@deck.gl/core';
import {createViewportSpatialFilter} from '@carto/api-client';

const viewport = new WebMercatorViewport(viewState);
const spatialFilter = createViewportSpatialFilter(viewport.getBounds());
```

### Specifying columns to fetch

Factory functions, like `vectorTableSource`, support both layers
and widgets. While reusing the same sources has advantages, including simplicity, it's important to understand which columns are fetched, which
depends on the source type.

- **Table sources:** Layers fetch only columns specified by the `columns`
  parameter. Widgets fetch only the columns they need, and are unaffected by
  the `columns` parameter.
- **Query sources:** Source SQL query must include all columns needed by any
  layers or widgets using the source. Layers fetch only the subset specified
  by the `columns` parameter. Widgets fetch only the subset they need, and are unaffected by the `columns` parameter.
- **Tileset sources:** Not yet supported.

## Versioning

Package versioning follows [Semantic Versioning 2.0.0](https://semver.org/).

## License

Provided as open source under [MIT License](./LICENSE.md).

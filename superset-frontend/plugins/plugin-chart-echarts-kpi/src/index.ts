import { ChartPlugin, ChartMetadata } from '@superset-ui/core';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import buildQuery from './buildQuery';

export default class EchartsKpiPlugin extends ChartPlugin {
  constructor() {
    super({
      metadata: new ChartMetadata({
        // ✅ Unique name
        name: 'ECharts KPI',

        description: 'Custom KPI card visualization',
        category: 'Custom Charts',

        // ✅ Tags
        tags: ['kpi', 'metric', 'card', 'custom'],

        // ✅ FIX: Use static path instead of import
        thumbnail: '/static/assets/images/kpi.png',

        // ✅ Clean behavior
        behaviors: [],

        // ✅ Optional icon
        icon: 'fa-chart-line',
      }),

      controlPanel,
      buildQuery,
      transformProps,

      // ✅ Lazy load
      loadChart: () => import('./EchartsKpi'),
    });
  }
}
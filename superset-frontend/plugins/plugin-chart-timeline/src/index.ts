import { ChartPlugin, ChartMetadata } from '@superset-ui/core';
import transformProps from './transformProps';
import controlPanel from './controlPanel';
import buildQuery from './buildQuery';

// ✅ IMPORT THUMBNAIL (IMPORTANT)
import thumbnail from './images/timeline.png';

export default class TimelinePlugin extends ChartPlugin {
  constructor() {
    super({
      metadata: new ChartMetadata({
        name: 'Timeline Chart',
        description: 'Vertical journey timeline',
        category: 'Other',
        tags: ['timeline', 'journey'],

        // ✅ ADD THIS LINE
        thumbnail,
      }),

      loadChart: () => import('./Timeline'),
      transformProps,
      buildQuery,
      controlPanel,
    });
  }
}
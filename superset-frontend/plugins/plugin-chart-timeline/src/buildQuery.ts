import { buildQueryContext } from '@superset-ui/core';

export default function buildQuery(formData: any) {
  const timeCol = formData?.time_column || 'event_time';
  const stepCol = formData?.title_column || 'step';
  const sessionCol = formData?.session_column || 'user_id';

  return buildQueryContext(formData, baseQueryObject => {
    return [
      {
        ...baseQueryObject,

        columns: [sessionCol, timeCol, stepCol],
        groupby: [sessionCol, timeCol, stepCol],

        metrics: [],
        orderby: [[timeCol, true]],
        row_limit: 1000,
      },
    ];
  });
}
import { buildQueryContext, QueryFormData } from '@superset-ui/core';

export default function buildQuery(formData: QueryFormData) {
  const baseQuery = buildQueryContext(formData);

  const queries = baseQuery.queries || [];

  if (queries.length === 0) return baseQuery;

  const mainQuery = queries[0];

  // 🔥 clone for previous period
  const prevQuery = {
    ...mainQuery,
    time_range: 'previous period',
  };

  return {
    ...baseQuery,
    queries: [mainQuery, prevQuery],
  };
}
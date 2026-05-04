export default function transformProps(chartProps: any) {
  const { formData, queriesData } = chartProps;

  const data = queriesData?.[0]?.data || [];

  // Default fallback
  let value = 0;
  let prevValue = 0;

  if (data.length > 0) {
    const row = data[0];

    // Convert all numeric values from the row
    const numericValues = Object.values(row)
      .map(v => Number(v))
      .filter(v => !Number.isNaN(v));

    if (numericValues.length >= 1) {
      value = numericValues[0];
    }

    if (numericValues.length >= 2) {
      prevValue = numericValues[1];
    }
  }

  return {
    // KPI values
    value,
    prevValue,

    // 🔥 REQUIRED for your UI controls
    title: formData?.title || 'KPI',
    icon: formData?.icon || 'up',
    searchText: formData?.search_text || '',
  };
}
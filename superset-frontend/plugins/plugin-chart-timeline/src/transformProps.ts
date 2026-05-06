export default function transformProps(chartProps: any) {
  const { queriesData, formData } = chartProps;

  const data = queriesData?.[0]?.data || [];

  const timeCol = formData?.time_column || 'event_time';
  const stepCol = formData?.title_column || 'step';
  const sessionCol = formData?.session_column || 'user_id';

  if (!data.length) {
    return {
      journeys: [],
      summary: {
        totalJourneys: 0,
        avgConversion: 0,
      },

      heading: formData.heading,
      description: formData.description,
      sideText: formData.side_text,
    };
  }

  const grouped: Record<string, any[]> = {};

  // ✅ GROUP BY SESSION / USER
  data.forEach((row: any) => {
    const key = row?.[sessionCol];

    if (!key) return;

    if (!grouped[key]) grouped[key] = [];

    grouped[key].push(row);
  });

  const journeys = Object.values(grouped).map(rows => {
    const sorted = [...rows].sort(
      (a, b) =>
        new Date(a[timeCol]).getTime() -
        new Date(b[timeCol]).getTime(),
    );

    const steps = sorted.map(r => r[stepCol]).filter(Boolean);

    let total = 0;

    for (let i = 1; i < sorted.length; i++) {
      const t1 = new Date(sorted[i - 1][timeCol]).getTime();
      const t2 = new Date(sorted[i][timeCol]).getTime();

      if (!isNaN(t1) && !isNaN(t2) && t2 > t1) {
        total += t2 - t1;
      }
    }

    const avgMs =
      steps.length > 1 ? total / (steps.length - 1) : 0;

    const min = Math.floor(avgMs / 60000);
    const sec = Math.floor((avgMs % 60000) / 1000);

    return {
      steps,
      users: 1,
      avgTime: `${min}m ${sec}s`,
      conversion: steps.includes('completed') ? 100 : 0,
    };
  });

  return {
    journeys,

    summary: {
      totalJourneys: journeys.length,

      avgConversion:
        journeys.reduce((s, j) => s + j.conversion, 0) /
        (journeys.length || 1),
    },

    // 🔥 Dynamic Text
    heading: formData.heading,
    description: formData.description,
    sideText: formData.side_text,
  };
}
import { useEffect, useState } from 'react';

export const useDailySummary = (data) => {
  const [summaryGenerated, setSummaryGenerated] = useState(false);

  useEffect(() => {
    const now = new Date();
    const isAfter1030 =
      now.getHours() > 22 ||
      (now.getHours() === 22 && now.getMinutes() >= 30);

    const today = now.toISOString().split('T')[0];
    const summaries = JSON.parse(localStorage.getItem('iron-summaries') || '[]');
    const alreadyExists = summaries.some((s) => s.date === today);

    if (isAfter1030 && !alreadyExists) {
      const todayViolations = data.violations.filter((v) => {
        const entryDate = v.timestamp.split('T')[0];
        return entryDate === today;
      });

      const criticalCount = todayViolations.filter(
        (v) => v.severity === 'critical'
      ).length;

      const summary = {
        date: today,
        violations: todayViolations.length,
        critical: criticalCount,
        cleanDay: todayViolations.length === 0
      };

      const updated = [summary, ...summaries].slice(0, 10);
      localStorage.setItem('iron-summaries', JSON.stringify(updated));
      setSummaryGenerated(true);
    }
  }, [data]);

  return summaryGenerated;
};

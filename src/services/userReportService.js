import { useState, useCallback } from 'react';

export function useReportService() {
  const [data, setData] = useState(null);
  const [reviewers, setReviewers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchReport = useCallback(async ({ url, startDate, endDate }) => {
    setLoading(true);
    setError(null);
    setHasFetched(false); // Start fresh
    try {
      const queryParams = new URLSearchParams();
      if (url) queryParams.append('repo', url);
      if (startDate) queryParams.append('from', startDate.toISOString());
      if (endDate) queryParams.append('to', endDate.toISOString());
      queryParams.append('t', Date.now()); // Cache bust

      const res = await fetch(`http://localhost:3001/api/report?${queryParams.toString()}`, {
        method: 'GET'
      });
      if (!res.ok) throw new Error(`API error: ${res.statusText}`);
      const json = await res.json();

      if (json.topReviewers === undefined) {
        setError("No data found for this time frame")
        return
      }
      var data = metricCreator(json)

      setData(data || []);

      var reviewers = reviewDataCreator(json)
      setReviewers(reviewers || []);
    }
    catch (err) {
      setError(err.message || 'Unknown error');
      setData([]);
      setReviewers([]);
    } finally {
      setHasFetched(true);
      setLoading(false);
    }
  }, []);

  return { data, reviewers, loading, error, hasFetched, fetchReport };
}

function metricCreator(res) {
  const fmt = (val, suffix = "") => (val === "0.00" || val === 0) ? "-" : `${val}${suffix}`;

  return [
    metricDataFormatter(1, "Total Throughput", "📦", res.totalPRs ?? 0,
      "Total Pull Requests analyzed."),

    metricDataFormatter(2, "Merged PRs", "✅", res.mergedPRs ?? 0,
      "PRs successfully merged."),

    metricDataFormatter(3, "Open Work Items", "🔥", res.openPRs ?? 0,
      "Current open work item count (WIP)."),

    metricDataFormatter(4, "Avg Cycle Time (Time-to-Merge)", "⏳", fmt(res.avgTimeToMerge, "h"),
      "Average time taken to merge PRs (Engineering Velocity)."),

    metricDataFormatter(5, "PR Bottleneck Identifier", "🕒", fmt(res.avgOpenPrAge, "h"),
      "Average age of currently open PRs (Stale work detection)."),

    metricDataFormatter(6, "Avg Reviews/PR", "🔍", fmt(res.avgReviewsPerPR),
      "Mean number of review comments per Merged PR (Code Quality metric).")
  ];
}
function metricDataFormatter(id, title, icon, value, desc) {
  return {
    id: id,
    desc: desc,
    icon: icon,
    value: value,
    title: title
  }
}

function reviewDataCreator(res) {
  var reviewers = [];
  const reviewerDataArray = res.topReviewers || [];
  console.log("diuhnus", res, reviewerDataArray)
  reviewerDataArray.forEach((reviewer, index) => {
    reviewers.push(
      reviewDataFormatter(
        index,
        reviewer.user,
        reviewer.avatar_url,
        reviewer.reviews
      )
    );
  });


  return reviewers;
}

function reviewDataFormatter(id, name, avatar_url, totalreviews) {
  return {
    id: id,
    name: name,
    avatar: avatar_url,
    totalreviews: totalreviews
  };
}

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
      
      var data = metricCreator(json)
      var reviewers = reviewDataCreator(json)
      
      setData(data || []);
      setReviewers(reviewers || []);
    } catch (err) {
      setError(err.message || 'Unknown error');
      setData([]);
      setReviewers([]);
    } finally {
      setHasFetched(true); 
      // setData(res)
      setLoading(false);
    }
  }, []);

  return { data, reviewers, loading, error, hasFetched, fetchReport };
}

function metricCreator(res) {
  var data = []

  data.push(metricDataFormatter(1, "	Total PRs", "📦", res.totalPRs, "Total PRs raised during selected time frame."), metricDataFormatter(2, "Merged PRs", "✅", res.mergedPRs, "PRs that were merged during selected timeframe"), metricDataFormatter(3, "Average Merge Time", "⏳", res.avgTimeToMerge, "Average time taken to merge PRs (in hours)"), metricDataFormatter(4, "Average Reviews per PR", "🔍", res.avgReviewsPerPR, "Mean number of review comments per PR"))
  return data
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
  const reviewerDataArray = res.topReviewers; 
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

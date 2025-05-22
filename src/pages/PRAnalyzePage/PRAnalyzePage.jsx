import { useReportService } from '../../services/userReportService';
import InlineForm from '../../components/InlineForm/InlineForm';
import ResultsComponent from '../../components/ResultsComponent/ResultsComponent';
import styles from './PRAnalyzePage.module.css';

export default function PRAnalyzerPage() {
  const report = useReportService();

  return (
    <>
      <div className={styles.page}>
        <section className={styles.heroSection}>

          <h1 className={styles.title}>GitHub PR Performance Tool</h1>
          <p className={styles.subtitle}>
            Analyze, optimize, and track your team's pull request performance to improve delivery speed and code quality.
          </p>
          <InlineForm fetchReport={report.fetchReport} />
        </section>
        <section className = {styles.resultSection}>

          <ResultsComponent
            data={report.data}
            reviewers={report.reviewers}
            loading={report.loading}
            error={report.error}
            hasFetched={report.hasFetched}
          />
        </section>
      </div>
    </>
  );
}

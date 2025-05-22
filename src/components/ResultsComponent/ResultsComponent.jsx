import { Tooltip, Spin, Alert, Empty, Divider, Typography, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './ResultsComponent.module.css';

const { Text } = Typography;

const defaultMessage = "Please enter repo URL and date range, then click 'Analyze Pull Requests' to see results.";

export default function ResultsComponent({ data, reviewers, loading, error, hasFetched }) {
    if (loading) {
        return (
            <footer className={styles.footer}>
                <div className={styles.containerBox}>
                    <Spin
                        indicator={<LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />}
                        tip={<Text strong style={{ color: '#1890ff' }}>Analyzing pull requests...</Text>}
                        size="large"
                        style={{ padding: '64px 0' }}
                    />
                </div>
            </footer>
        );
    }

    if (error) {
        return (
            <footer className={styles.footer}>
                <div className={styles.containerBox}>
                    <Alert
                        message="An error occurred"
                        description={error}
                        type="error"
                        showIcon
                        style={{ width: '100%', maxWidth: 600, margin: '48px auto' }}
                    />
                </div>
            </footer>
        );
    }

    if (!hasFetched) {
        return (
            <footer className={styles.footer}>
                <div className={styles.containerBox} style={{ justifyContent: 'center' }}>
                    <Empty
                        description={
                            <Text type="secondary" italic>
                                {defaultMessage}
                            </Text>
                        }
                        style={{ padding: '64px 0' }}
                    />
                </div>
            </footer>
        );
    }

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <footer className={styles.footer}>
                <div className={styles.containerBox}>
                    <Empty
                        description={
                            <Text style={{ color: '#444' }}>
                                No data available for the selected parameters.
                            </Text>
                        }
                        style={{ padding: '64px 0' }}
                    />
                </div>
            </footer>
        );
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.containerBox}>
                <div className={styles.metricsGrid}>
                    {data.map(({ id, title, desc, icon, value }) => (
                        <Tooltip key={id} title={desc} placement="top">
                            <div className={styles.metricBox}>
                                <span className={styles.icon}>{icon}</span>
                                <div className={styles.textBlock}>
                                    <span className={styles.value}>{value}</span>
                                    <span className={styles.label}>{title}</span>
                                </div>
                            </div>
                        </Tooltip>
                    ))}
                </div>
                <div className={styles.reviewerSection}>
                    <div className={styles.reviewerHeader}>
                        <span>Top Reviewers</span>
                    </div>
                    <div className={styles.reviewerList}>
                        {reviewers?.map(({ name, avatar }, i) => (
                            <Tooltip key={i} title={name} placement="bottom">
                                <img src={avatar} alt={name} className={styles.avatar} />
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
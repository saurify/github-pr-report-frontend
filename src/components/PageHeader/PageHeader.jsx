import styles from './PageHeader.module.css';
import { Button } from 'antd'
import { useState } from 'react';
import InlineForm from '../InlineForm/InlineForm';

export default function PageHeader() {
    const [hover, setHover] = useState(false);
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>GitHub PR Performance Tool</h1>
            <p className={styles.subtitle}>
                Analyze, optimize, and track your team's pull request performance to improve delivery speed and code quality.
            </p>

            <InlineForm />
        </header>
    );
}

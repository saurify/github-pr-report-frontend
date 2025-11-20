import React from 'react';
import styles from './CodeBackground.module.css';

export default function CodeBackground() {
  const sampleCode = `
function fetchData() {
  console.log("Hello from the background!");
  return fetch('/api/data')
    .then(res => res.json())
    .then(data => console.log(data));
}

function saveData() {
  console.log("Saving...");
  return fetch('/api/save', { method: 'POST' });
}

function archiveData() {
  console.log("Archiving...");
  return fetch('/api/archive');
}
`.repeat(20);

  return (
    <pre className={styles.codeBackground}>
      <code>{sampleCode}</code>
    </pre>
  );
}

import { ConfigProvider, Input, DatePicker, Button, theme } from 'antd';
import { useState } from 'react';

const { darkAlgorithm } = theme;

const InlineForm = ({ fetchReport }) => {
  const [url, setUrl] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hover, setHover] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  function validate() {
    const errors = {};
    if (!url.trim()) errors.url = 'Repository URL is required';
    if (startDate && endDate && startDate > endDate) errors.date = 'Start date must be before end date';
    return errors;
  }

  const onAnalyzeClick = () => {
    const errors = validate();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    fetchReport({ url: url.trim(), startDate, endDate });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
        token: {
          borderRadius: 12,
          colorPrimary: '#ffffff',
          colorBgContainer: '#1a1a1a',
          colorText: '#ffffff',
          colorTextPlaceholder: '#bbbbbb',
          colorBorder: '#333333',
          fontSize: 16,
          controlHeight: 48,
        },
        components: {
          Input: { activeShadow: '0 0 0 1px #555' },
          DatePicker: { activeShadow: '0 0 0 1px #555', colorPrimary: '#ffffff' },
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          <div style={{ flex: 2, minWidth: '250px' }}>
            <Input
              placeholder="Enter GitHub Repo URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              status={validationErrors.url ? 'error' : ''}
            />
            {validationErrors.url && (
              <div style={{ color: 'red', marginTop: 4, fontSize: 12 }}>{validationErrors.url}</div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: '180px' }}>
            <DatePicker
              placeholder="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date || null)}
              status={validationErrors.date ? 'error' : ''}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ flex: 1, minWidth: '180px' }}>
            <DatePicker
              placeholder="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date || null)}
              status={validationErrors.date ? 'error' : ''}
              style={{ width: '100%' }}
            />
            {validationErrors.date && (
              <div style={{ color: 'red', marginTop: 4, fontSize: 12 }}>{validationErrors.date}</div>
            )}
          </div>
        </div>

        <Button
          onClick={onAnalyzeClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundColor: hover ? 'white' : 'black',
            color: hover ? 'black' : 'white',
            border: '1px solid white',
            borderRadius: '12px',
            padding: '0 24px',
            height: '48px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Analyze Pull Requests
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default InlineForm;

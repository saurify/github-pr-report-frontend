import { ConfigProvider, Input, DatePicker, Button, theme } from 'antd';
import { useState } from 'react';

const { darkAlgorithm } = theme;

const InlineForm = () => {
  const [url, setUrl] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hover, setHover] = useState(false);

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
          Input: {
            activeShadow: '0 0 0 1px #555',
          },
          DatePicker: {
            activeShadow: '0 0 0 1px #555',
            colorPrimary: '#ffffff',
          },
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
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Input
            placeholder="Enter GitHub Repo URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ flex: 2, minWidth: '250px' }}
          />
          <DatePicker
            placeholder="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            style={{ flex: 1, minWidth: '180px' }}
          />
          <DatePicker
            placeholder="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            style={{ flex: 1, minWidth: '180px' }}
          />
        </div>

        {/* CTA Button below input group */}
        <Button
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

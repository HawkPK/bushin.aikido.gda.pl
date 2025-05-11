import React from 'react';

const Map: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '400px', border: 'none', borderRadius: '8px', overflow: 'hidden' }}>
      <iframe
        title="Lokalizacja Bushin Dojo"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src="https://www.openstreetmap.org/export/embed.html?bbox=18.5641%2C54.3541%2C18.5741%2C54.3591&amp;layer=mapnik&amp;marker=54.3566%2C18.5691"
        style={{ border: 0 }}
      />
    </div>
  );
};

export default Map;

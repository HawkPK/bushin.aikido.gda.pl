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
        src="https://www.openstreetmap.org/export/embed.html?bbox=18.572685420513157%2C54.37788450207575%2C18.575195968151096%2C54.37889680631828&amp;layer=mapnik&amp;marker=54.3783906573173%2C18.573940694332123"
        style={{ border: 0 }}
      />
    </div>
  );
};

export default Map;
import React from 'react';

const EmbeddedVideo = ({ url }) => {
  return (
    <div className="embedded-video">
      <div className="video-wrapper">
        <iframe
          className="video-iframe"
          src={url}
          title="YouTube video player"
          allow="accelerometer; autoplay; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default EmbeddedVideo;

import React from 'react';

interface GoogleMapProps {
  src?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d543.0498032845675!2d106.179894382236!3d20.241296322176535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31360be3f46a9e9b%3A0xb6acc423f7f93c38!2zWMaw4bufbmcgYuG6o28gaMOgbmggVOG6pW4gTOG7pWE!5e0!3m2!1svi!2s!4v1767893586386!5m2!1svi!2s",
  width = "100%",
  height = "450",
  style = { border: '0' }
}) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      style={style}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default GoogleMap;

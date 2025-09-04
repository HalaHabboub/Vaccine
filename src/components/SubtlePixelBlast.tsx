import React from 'react';
import PixelBlast from './PixelBlast';

interface SubtlePixelBlastProps {
  className?: string;
  primaryColor?: 'orange' | 'purple';
}

const SubtlePixelBlast: React.FC<SubtlePixelBlastProps> = ({ 
  className = '', 
  primaryColor = 'orange' 
}) => {
  return (
    <div className={`absolute inset-0 ${className} pointer-events-none`} style={{ opacity: 0.1 }}>
      <PixelBlast
        variant="circle"
        color={primaryColor === 'orange' ? '#FF6F00' : '#4B0082'}
        pixelSize={5}
        patternScale={3}
        patternDensity={0.4}
        speed={0.3}
        transparent={true}
        edgeFade={0.9}
        enableRipples={true}
        rippleIntensityScale={0.5}
        rippleThickness={0.2}
        rippleSpeed={0.4}
        pixelSizeJitter={0.3}
        autoPauseOffscreen={true}
        liquid={false}
        className="w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default SubtlePixelBlast;
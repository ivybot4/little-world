import './WaterEffect.css';

export interface WaterEffectProps {
  /** Path to the alpha mask image that defines the water shape */
  maskSrc?: string;
}

export function WaterEffect({
  maskSrc = '/images/river-mask.png',
}: WaterEffectProps) {
  return (
    <div
      className="water-effect"
      aria-hidden="true"
      style={{
        WebkitMaskImage: `url(${maskSrc})`,
        maskImage: `url(${maskSrc})`,
      }}
    >
      <div className="water-flow water-flow--primary" />
      <div className="water-flow water-flow--secondary" />
    </div>
  );
}

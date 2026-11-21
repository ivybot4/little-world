import { assetUrl } from '../../utils/asset';
import './TreeWindEffect.css';

export function TreeWindEffect() {
  return (
    <div className="tree-wind-effect" aria-hidden="true">
      <img
        className="tree-wind-layer tree-wind-layer--a"
        src={assetUrl('/images/trees-wind-a.png?v=3')}
        alt=""
        draggable={false}
      />
      <img
        className="tree-wind-layer tree-wind-layer--b"
        src={assetUrl('/images/trees-wind-b.png?v=3')}
        alt=""
        draggable={false}
      />
    </div>
  );
}

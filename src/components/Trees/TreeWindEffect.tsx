import './TreeWindEffect.css';

export function TreeWindEffect() {
  return (
    <div className="tree-wind-effect" aria-hidden="true">
      <img
        className="tree-wind-layer tree-wind-layer--a"
        src="/images/trees-wind-a.png?v=3"
        alt=""
        draggable={false}
      />
      <img
        className="tree-wind-layer tree-wind-layer--b"
        src="/images/trees-wind-b.png?v=3"
        alt=""
        draggable={false}
      />
    </div>
  );
}

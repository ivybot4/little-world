import type { ReactNode } from 'react';

export interface SceneLayerProps {
  /** Identifies the layer purpose (e.g. "water", "paths", "flowers", "buildings") */
  name: string;
  /** Stacking order inside the scene container */
  zIndex: number;
  /** Whether the layer itself captures pointer events */
  interactive?: boolean;
  children?: ReactNode;
}

export function SceneLayer({
  name,
  zIndex,
  interactive = false,
  children,
}: SceneLayerProps) {
  return (
    <div
      className={`scene-layer ${interactive ? 'scene-layer--interactive' : ''}`}
      data-layer={name}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
}

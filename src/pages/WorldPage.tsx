import { Building } from '../components/Building/Building';
import { SceneContainer } from '../components/Scene/SceneContainer';
import { SceneLayer } from '../components/Scene/SceneLayer';
import { TreeWindEffect } from '../components/Trees/TreeWindEffect';
import { WaterEffect } from '../components/Water/WaterEffect';
import { buildings } from '../config/buildings';
import { assetUrl } from '../utils/asset';

export function WorldPage() {
  return (
    <SceneContainer
      baseImageSrc={assetUrl('/images/base-ground.png?v=7')}
      baseImageAlt="Little World landscape with rolling green hills, mountains, and a winding river"
    >
      {/* Layer 1: Water effect using a mask image */}
      <SceneLayer name="water" zIndex={1}>
        <WaterEffect />
      </SceneLayer>

      {/* Layer 2: Subtle tree foliage breeze */}
      <SceneLayer name="trees" zIndex={2}>
        <TreeWindEffect />
      </SceneLayer>

      {/* Layer 3: Paths slot (ready for config-driven paths) */}
      <SceneLayer name="paths" zIndex={3} />

      {/* Layer 4: Flowers slot (ready for animated flower sprites) */}
      <SceneLayer name="flowers" zIndex={4} />

      {/* Layer 5: Interactive buildings rendered from config */}
      <SceneLayer name="buildings" zIndex={5} interactive>
        {buildings.map((building) => (
          <Building key={building.id} {...building} />
        ))}
      </SceneLayer>
    </SceneContainer>
  );
}

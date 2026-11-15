import { Link } from 'react-router-dom';
import type { BuildingConfig } from '../../config/buildings';
import './Building.css';

export type BuildingProps = BuildingConfig;

export function Building({ id, name, image, x, y, width, route }: BuildingProps) {
  return (
    <Link
      to={route}
      className="building-link"
      data-building-id={id}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
      }}
    >
      <span className="sr-only">{name}</span>
      <img
        className="building-image"
        src={image}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
    </Link>
  );
}

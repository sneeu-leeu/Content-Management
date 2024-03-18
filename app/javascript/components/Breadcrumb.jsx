import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ pathSegments }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          return (
            <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
              {isLast ? (
                segment.name
              ) : (
                <Link to={segment.path}>{segment.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
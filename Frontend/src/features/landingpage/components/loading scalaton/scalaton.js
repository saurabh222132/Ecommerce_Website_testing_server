import React from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
const ProductCardSkeleton = () => {
  return (
    <div className="cards w-72 h-72 ">
      <SkeletonTheme color="#202020" highlightColor="#444">
        <Skeleton height={300} duration={20} />
      </SkeletonTheme>
    </div>
  );
};

export default ProductCardSkeleton;

import React, { useRef } from "react";
import { useGesture } from "@use-gesture/react";

export const CollectionViewport = ({
  setCollectionViewport,
  collectionViewport,
  content,
  cellHeight,
  cellWidth,
  handleCellClick,
}) => {
  let collectionRef = useRef<HTMLTableElement>(null);
  let collectionContainerRef = useRef<HTMLDivElement>(null);
  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        setCollectionViewport((viewport) => ({ ...viewport, x: dx, y: dy }));
      },
      onPinch: ({
        memo,
        origin: [pinchOriginX, pinchOriginY],
        movement: [md],
        offset: [d],
      }) => {
        if (d > 8) {
          setCollectionViewport((viewport) => ({ ...viewport, scale: 8 }));
        } else if (d < 0.1) {
          setCollectionViewport((viewport) => ({ ...viewport, scale: 0.1 }));
        } else {
          setCollectionViewport((viewport) => ({ ...viewport, scale: d }));
        }
      },
    },
    {
      drag: {
        from: () => [collectionViewport.x, collectionViewport.y],
      },
      target: collectionRef,
      eventOptions: { passive: false },
    }
  );
  return (
    <div
      className="flex h-full items-center justify-center overflow-hidden"
      ref={collectionContainerRef}>
      <table
        ref={collectionRef}
        className={`relative table-fixed w-[100vh] border border-green border-collapse`}
        style={{
          left: collectionViewport.x,
          top: collectionViewport.y,
          transform: `scale(${collectionViewport.scale})`,
          touchAction: "none",
        }}>
        <tbody className="border border-green border-collapse">
          {content.map((item, i) => {
            return (
              <tr key={i}>
                {item?.map((asset, index) => {
                  return (
                    <td
                    key={index}
                      tabIndex={1}
                      className={`p-0 relative border border-green bg-no-repeat bg-cover focus:border-2 focus:border-blue focus:outline-none duration-150`}
                      style={{
                        width: `${cellWidth}vh`,
                        height: `${cellHeight}vh`,
                      }}
                      onClick={() => {
                        handleCellClick(i, index, asset);
                      }}>
                      {asset.name ? (
                        <img
                          src={asset.file}
                          className="w-full h-full object-cover"
                          draggable={false}
                          alt={asset.name}
                        />
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="w-full h-full">
      {children}
    </div>
  );
};

import * as Types from "@/types";

type CollectionViewportHintsProps = {
  hint: boolean;
  swapHint: boolean;
  filled: boolean;
};

export const CollectionViewportHints: React.FC<
  CollectionViewportHintsProps
> = ({ hint, swapHint, filled }) => {
  return (
    <>
      {hint && !swapHint && filled ? (
        <div className={"absolute bg-green text-xs text-black bottom-10"}>
          S to swap cell content
          <br />
        </div>
      ) : null}
      {swapHint ? (
        <div className="absolute bg-green text-xs text-black translate-y-[-1rem] bottom-10">
          Select a second cell to swap content
        </div>
      ) : null}
    </>
  );
};

import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

type SliderProps = {
    value: number[];
    setValue: (value: number[]) => void;
    min: number;
    max: number;
    step: number;
}

export const Slider: React.FC<SliderProps> = ({value, setValue, min, max, step}) => {

    return (
        <SliderPrimitive.Root
        value={value}
        onValueChange={setValue}
        min={min}
        max={max}
        step={step}
        aria-label="value"
        className="relative flex w-20 touch-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full border border-green">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-green"/>
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={"block h-3 w-3 rounded-full bg-green focus:outline-none"}
        />
      </SliderPrimitive.Root>
    )
}
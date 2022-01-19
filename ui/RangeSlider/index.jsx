import { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 0.01;

const RangeSlider = ({ min, max, values, setValues }) => {
  const [range, setRange] = useState([min, max])

  useEffect(() => {
    setRange(values)
  }, [values])
  return (
    <Range
      values={range}
      step={STEP}
      min={min}
      max={max}
      onChange={items => {
        setRange(items);
      }}
      onFinalChange={items => {
        setValues(items);
      }}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%"
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: range,
                colors: ["#ccc", "#548BF4", "#ccc"],
                min: min,
                max: max
              }),
              alignSelf: "center"
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "42px",
            width: "42px",
            borderRadius: "4px",
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 2px 6px #AAA"
          }}
        >
          <div
            style={{
              height: "16px",
              width: "5px",
              backgroundColor: isDragged ? "#548BF4" : "#CCC"
            }}
          />
          <output style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: "70px" }} id="output">
            {props['aria-valuenow']}
          </output>
        </div>
      )}
    />
  )
}

export default RangeSlider
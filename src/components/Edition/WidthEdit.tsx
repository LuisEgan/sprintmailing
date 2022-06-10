import { MouseEvent } from "react";
import SVG from "components/SVG";
import { useEffect, useRef, useState } from "react";

let initX = 0;
const WidthEdit = () => {
  const wRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(600);

  useEffect(() => {
    if (wRef?.current) {
      // * Every time the user clicks on the arrows, fire onMouseDown
      wRef.current.addEventListener("mousedown", onMouseDown, false);

      // * Every time the user stops clicking, remove the mouse move event
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", resize, false);
      });

      return () => {
        wRef.current.removeEventListener("mousedown", onMouseDown);
      };
    }
  }, [wRef]);

  const onMouseDown = (mouse: globalThis.MouseEvent) => {
    initX = mouse.pageX;
    document.addEventListener("mousemove", resize, false);
  };

  const resize = (mouse: globalThis.MouseEvent) => {
    const newWidth = initX - mouse.x;
    initX = mouse.x;
    setWidth((width) => width - newWidth);
  };

  return (
    <div className="flex flex-col select-none">
      <b className="mb-2">Container Width</b>

      <div className="p-3 rounded-lg border-2 border-gray-200 flex items-center dark:border-gray-700">
        <div ref={wRef} className="mr-2 cursor-resize-w">
          <SVG src="/images/svg/icons/arrows-h.svg" size={20} fill="white" />
        </div>
        <div className="flex-1">{width}</div>
        <span className="opacity-50 px-2">px</span>
      </div>
    </div>
  );
};

export default WidthEdit;

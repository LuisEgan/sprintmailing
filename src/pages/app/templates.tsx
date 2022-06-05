import { useState } from "react";
import { useDrop } from "react-dnd";

const Templates = () => {
  const [text, setText] = useState("Oli");

  const [{ isOverCurrent }, drop] = useDrop(
    () => ({
      accept: "template",
      drop(item: { name: string }) {
        setText(item.name);
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [],
  );

  return (
    <div>
      Templates
      <div
        ref={drop}
        className={`ml-10 mt-20 p-10 border-dashed border-2 border-red-500 ${
          isOverCurrent ? "bg-red-300" : ""
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Templates;

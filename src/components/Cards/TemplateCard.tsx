import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd/dist/hooks/useDrag/useDrag";
import { ITemplate } from "types/Template.types";

interface ITemplateCard
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "onDrag" | "onDrop"
  > {
  template: ITemplate;
  isDropping?: boolean;
  onHover?: (hovered: ITemplate, dragged: ITemplate) => void;
  onDrag?: (template: ITemplate) => void;
  onDrop?: (newDropped: ITemplate, droppedOn: ITemplate) => void;
}

const TemplateCard = (props: ITemplateCard) => {
  const {
    template,
    isDropping: isDroppingProp,
    onHover,
    onDrag,
    onDrop,
    ...elemProps
  } = props;

  const [{ isDragging }, drag] = useDrag<
    ITemplate,
    {},
    { isDragging: boolean }
  >(() => ({
    type: "template",
    item: template,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(
    () => ({
      accept: "template",
      drop(newDropped: ITemplate) {
        console.log("newDropped: ", newDropped);
        if (onDrop) onDrop(newDropped, template);
        setIsDropping(false);
      },
      hover(dragged: ITemplate) {
        if (onHover && dragged.name !== template.name) {
          onHover(template, dragged);
        }
      },
    }),
    [onHover, onDrop],
  );

  const [isDropping, setIsDropping] = useState<boolean>(isDroppingProp);

  useEffect(() => {
    if (isDragging) {
      if (onDrag) onDrag(template);
      setIsDropping(true);
    }
  }, [isDragging]);

  return (
    <div
      ref={(node) => drag(drop(node))}
      {...elemProps}
      className={`p-5 cursor-grab hover:bg-gray-600 ${
        isDropping ? "border-dashed border-2 border-red-500" : ""
      }`}
    >
      {isDropping ? "Drop here" : template.name}
    </div>
  );
};

export default TemplateCard;

import TemplateCard from "components/Cards/TemplateCard";
import WidthEdit from "components/Edition/WidthEdit";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { ITemplate } from "types/Template.types";

const Templates = () => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const [, dropContainer] = useDrop(
    () => ({
      accept: "template",
      hover(template: ITemplate, monitor) {
        const isDropOutsideOfList = monitor.isOver({ shallow: true });

        if (isDropOutsideOfList) {
          setTemplates((templates) =>
            templates.filter((t) => t.name !== template.name),
          );
        }
      },
    }),
    [],
  );

  const [{ isOverEmptyList }, dropEmptyList] = useDrop(
    () => ({
      accept: "template",
      drop(template: ITemplate) {
        setTemplates((currentTemplates) => {
          return [...currentTemplates, template];
        });
      },

      collect: (monitor) => ({
        isOverEmptyList: monitor.isOver({ shallow: true }),
      }),
    }),
    [],
  );

  const findTemplate = (search: ITemplate) => {
    let index = -1;

    const found = templates.find((t, i) => {
      if (t.name === search.name) {
        index = i;
        return true;
      }

      return false;
    });

    return { index, template: found };
  };

  const onTemplateHover = (hovered: ITemplate, dragged: ITemplate) => {
    const newTemplates = [...templates];

    // * Get hovered index to know where to position new template
    const { index: hoveredIndex } = findTemplate(hovered);

    // * Get dragged index to verify if it already exists
    const { index: draggedIndex } = findTemplate(dragged);

    if (draggedIndex > -1) {
      // * If it already existed, swap values
      const a = newTemplates[hoveredIndex];
      newTemplates[hoveredIndex] = newTemplates[draggedIndex];
      newTemplates[draggedIndex] = a;
    } else {
      // * If not, add it just before the hovered template
      newTemplates.splice(hoveredIndex, 0, dragged);
    }

    setTemplates(newTemplates);
  };

  return (
    <div ref={dropContainer} className="h-full">
      {templates.length ? (
        <div className="flex h-full">
          <div className="flex-1 px-40">
            {templates.map((t) => (
              <TemplateCard
                template={t}
                key={t.name}
                onHover={onTemplateHover}
                isDropping={templates.length > 1}
              />
            ))}
          </div>

          <div
            className="bg-white dark:bg-gray-800 h-full flex flex-col p-5"
            style={{ width: "25%" }}
          >
            <WidthEdit />
          </div>
        </div>
      ) : (
        <div
          ref={dropEmptyList}
          className={`ml-10 mt-20 p-10 border-dashed border-2 border-red-500 ${
            isOverEmptyList ? "bg-red-300" : ""
          }`}
        >
          Drop here
        </div>
      )}
    </div>
  );
};

export default Templates;

import arrayMove from "array-move";
import React, { useEffect, useState } from "react";

import SortableContainer from "./SortableContainer";
import { SortableGridContainer } from "./SortableGrid.style";
import { ISortableGrid, ISortableItem } from "./types";

const SortableGrid = (props: ISortableGrid) => {
  const {
    items: itemsProp,
    onChange: onChangeProp,
    renderItem,
    deletable,
    style,
  } = props;

  const [items, setItems] = useState<ISortableItem[]>([]);

  useEffect(() => {
    if (itemsProp?.length) {
      setItems(itemsProp.map((item, index) => ({ item, sortId: index })));
    }
  }, [itemsProp]);

  const onChange = (newItems: ISortableItem[]) => {
    setItems(newItems);

    if (onChangeProp) {
      onChangeProp(newItems.map(({ item }) => item));
    }
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMove(items, oldIndex, newIndex);
    onChange(newItems);
  };

  if (!items?.length) return null;

  return (
    <SortableGridContainer style={style}>
      <SortableContainer
        helperClass="sortableHelper"
        shouldUseDragHandle
        useDragHandle
        axis="xy"
        items={items}
        onChange={onChange}
        onSortEnd={onSortEnd}
        renderItem={renderItem}
        deletable={deletable}
      />
    </SortableGridContainer>
  );
};

export default SortableGrid;

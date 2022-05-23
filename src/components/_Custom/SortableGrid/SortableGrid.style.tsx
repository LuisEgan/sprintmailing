import styled from "styled-components";

export const SortableGridContainer = styled.div`
  width: 100%;
  overflow: hidden;
  .sortableHelper {
    z-index: 10;

    &:focus {
      cursor: grabbing;
    }
    img {
      width: 3rem;
      height: 3rem;
    }
  }
`;

export const SortableContainerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Element = styled.div`
  margin: 0.5rem;
  position: relative;

  &:hover {
    cursor: grab;
  }
  &:focus-within {
    cursor: grabbing;
  }
`;

export const Handle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const DeleteItemContainer = styled.div`
  height: 2rem;
  width: 2rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  &:hover {
    cursor: pointer;

    i {
      transition: 0.5seg;
      transform: scale(1.2);
    }
  }
`;

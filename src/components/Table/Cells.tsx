import React from "react";
import { Button, Icon, Table } from "rsuite";
import { ITableData } from "./Table";
import {
  IButtonCell,
  ICustomCell,
  INormalCell,
  TRowBuilder,
} from "./Table.types";

const { Cell } = Table;

const getCellClassName = (
  cellClassName: TRowBuilder<ITableData, string> | string,
  rowData: ITableData
): string => {
  //   let newTableRow =
  //     secondsBetweenDates(rowData.tableTimestamp) < 3 ? "newTableRow" : "";

  if (!cellClassName) return "";

  if (typeof cellClassName === "string") return `${cellClassName}`;

  return `${cellClassName({ rowData })}`;
};

export const CustomCell = <TData extends {}>(params: ICustomCell<TData>) => {
  const {
    customCell: Component,
    dataKey,
    rowData,
    cellStyle,
    cellClassName,
    ...props
  } = params;

  const className = getCellClassName(
    cellClassName as string,
    rowData as ITableData
  );

  return (
    <Cell {...props} className={className} style={cellStyle}>
      <Component {...{ rowData }} />
    </Cell>
  );
};

export const ButtonCell = <TData extends {}>(params: IButtonCell<TData>) => {
  const {
    formatter,
    dataKey,
    rowData,
    cellStyle,
    buttonProps,
    buttonIcon,
    buttonLabel,
    buttonAppearance = "primary",
    cellClassName,
    ...props
  } = params;

  const className = getCellClassName(cellClassName, rowData);

  const { onClick: onClickProp, ...defaultProps } = buttonProps;

  const onClick = () => {
    onClickProp({ rowData });
  };

  return (
    <Cell {...props} className={className} style={cellStyle}>
      <Button appearance={buttonAppearance} {...defaultProps} onClick={onClick}>
        {buttonIcon && (
          <>
            <Icon icon={buttonIcon} /> &nbsp;
          </>
        )}
        {buttonLabel}
      </Button>
    </Cell>
  );
};

export const NormalCell = <TData extends {}>(params: INormalCell<TData>) => {
  const {
    formatter,
    dataKey,
    rowData,
    cellStyle,
    cellClassName,
    ...props
  } = params;

  const data = `${rowData[dataKey]}`;

  const className = getCellClassName(cellClassName, rowData);

  return (
    <Cell {...props} className={className} style={cellStyle}>
      {formatter ? formatter(data) : data}
    </Cell>
  );
};

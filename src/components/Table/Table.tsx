import NoResult from "components/NoResult/NoResult";
import React, { useEffect, useState } from "react";
import { Table as RSTable, TableProps } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { ButtonCell, CustomCell, NormalCell } from "./Cells";
import { Container } from "./Table.styles";
import { TTable } from "./Table.types";

const { Column, HeaderCell } = RSTable;

const cellDefaultStyle = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
};

export interface ITableData {
  tableTimestamp?: string;
}

const Table = <TData extends {}>(props: TTable<TData>) => {
  const {
    data,
    columns,
    columnsSameProps,
    containerStyle,
    containerClassname,
    ...RSTableProps
  } = props;

  const [tableData, setTableData] = useState<ITableData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  // const [xScroll, setXScroll] = useState<number>(0);
  // const [yScroll, setYScroll] = useState<number>(0);

  const [displayLength, setDisplayLength] = useState(10);
  const [page, setPage] = useState(1);

  const [sortColumn, setSortColumn] = useState<string>();
  const [sortType, setSortType] = useState<TableProps["sortType"]>();

  // * Little hack needed for the table width to adjust
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (data) {
      let newTableData: ITableData[] = [...data];

      // * Check if any new row was added
      // * to make give the newRow animation
      // if (data.length === tableData.length) {
      //   newTableData = [...tableData];
      // } else if(data.length > tableData.length){

      //   // TODO improve way of checking which row was added
      //   newTableData = [...tableData, ...data.splice(0, data.length - tableData.length)]
      // } else {

      //   // TODO find a way of checking which row was removed
      // }

      if (sortColumn && sortType) {
        newTableData.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];

          return sortType === "asc" ? (x > y ? 1 : -1) : x > y ? -1 : 1;
        });
      }

      newTableData = newTableData.filter((v, i) => {
        const start = displayLength * (page - 1);
        const end = start + displayLength;
        return i >= start && i < end;
      });

      // * Add a timestamp for when of each row was added to the table
      // newTableData = newTableData.map((d) => {
      //   if (d.tableTimestamp) return d;

      //   return { ...d, tableTimestamp: new Date().toISOString() };
      // });

      setTableData(newTableData);
    }
  }, [data, sortColumn, sortType, page, displayLength]);

  // * Set page=1 when change data

  useEffect(() => {
    if (data) {
      setPage(1);
    }
  }, [data]);

  // * HANDLERS

  const handleChangeLength = (length: number) => {
    setPage(1);
    setDisplayLength(length);
  };

  const handleSortColumn = (dataKey: string) => {
    setSortColumn(dataKey);
    setSortType(sortType === "asc" ? "desc" : "asc");
  };

  const handleScroll = (x: number, y: number) => {
    // setXScroll(x);
    // setYScroll(y);
  };

  // const handleDataUpdate = (
  //   nextData: TData[],
  //   scrollTo: (coord: { x: number; y: number }) => void
  // ) => {
  //   scrollTo({
  //     x: 200,
  //     y: yScroll,
  //   });
  // };

  if (!data) return null;

  return (
    <Container style={containerStyle} className={containerClassname}>
      <RSTable
        onScroll={handleScroll}
        onSortColumn={handleSortColumn}
        // onDataUpdated={handleDataUpdate}
        renderEmpty={() => <NoResult />}
        data={tableData}
        shouldUpdateScroll
        wordWrap
        affixHorizontalScrollbar
        height={500}
        headerHeight={50}
        rowHeight={55}
        loading={loading}
        {...RSTableProps}
      >
        {columns?.map((column) => {
          const {
            dataKey,
            header,
            width = 150,
            isButton,
            buttonProps,
            buttonIcon,
            buttonLabel = "Click me",
            buttonAppearance,
            cellStyle: cellStyleProp,
            cellClassName,
            customCell,
            formatter,
            ...columnProps
          } = column;

          const cellStyle = { ...cellDefaultStyle, ...cellStyleProp };
          const cellProps = { dataKey, cellStyle, cellClassName };

          return (
            <Column
              key={dataKey as string}
              {...{ width, ...columnProps, ...columnsSameProps }}
            >
              <HeaderCell style={{ fontSize: "1.1rem" }}>{header}</HeaderCell>

              {customCell ? (
                <CustomCell<TData>
                  {...{
                    ...cellProps,
                    customCell,
                  }}
                />
              ) : isButton ? (
                <ButtonCell<TData>
                  {...{
                    ...cellProps,
                    buttonProps,
                    buttonIcon,
                    buttonLabel,
                    buttonAppearance,
                  }}
                />
              ) : (
                <NormalCell<TData>
                  {...{
                    ...cellProps,
                    formatter,
                  }}
                />
              )}
            </Column>
          );
        })}
      </RSTable>

      <TablePagination
        lengthMenu={[
          {
            value: 10,
            label: 10,
          },
          {
            value: 20,
            label: 20,
          },
        ]}
        activePage={page}
        displayLength={displayLength}
        total={data?.length}
        onChangePage={setPage}
        onChangeLength={handleChangeLength}
      />
    </Container>
  );
};

export default Table;

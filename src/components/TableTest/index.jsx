import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Card } from "antd";
import { Resizable } from "react-resizable";
import "./index.css";

// 调整table表头
const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const TableTest = () => {
  const [dataAmount, setDataAmount] = useState(500);

  const onDataChange = (e) => {
    setDataAmount(Number(e.target.value) || 500);
  };

  // table 数据
  const dataSource = () => {
    const data = [];
    for (let i = 0; i <= dataAmount; i++) {
      data.push({
        key: i,
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      });
    }
    return data;
  };

  // 表格列
  const [cols, setCols] = useState([
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ]);
  const [columns, setColumns] = useState([]);

  // 定义头部组件
  const components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  // 处理拖拽
  const handleResize =
    (index) =>
    (e, { size }) => {
      const nextColumns = [...cols];
      // 拖拽是调整宽度
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };

      setCols(nextColumns);
    };

  useEffect(() => {
    setColumns(
      (cols || []).map((col, index) => ({
        ...col,
        onHeaderCell: (column) => ({
          width: column.width,
          onResize: handleResize(index),
        }),
      }))
    );
  }, [cols]);

  return (
    <div className="components-table-resizable-column">
      <Card bordered={false}>
        <Input
          onBlur={onDataChange}
          onPressEnter={onDataChange}
          placeholder="Amount of data"
        />
        <Table
          size="small"
          bordered
          scroll={{ x: 1800 }}
          components={components}
          columns={columns}
          dataSource={dataSource()}
        />
      </Card>
    </div>
  );
};

export default TableTest;

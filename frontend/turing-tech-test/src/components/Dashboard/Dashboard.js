import { Button, Pagination, Table, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import callsActions from "../../modules/calls/actions";
import PaginationComp from "../Common/Pagination/PaginationComp";
import "./Dashboard.scss";
const Dashboard = () => {
  const { calls } = useSelector((state) => state.callsReducer);
  const pageRef = useRef(1);
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      callsActions.getCalls.request({
        sortBy: "desc",
        page: 1,
      })
    );
  }, []);

  useEffect(() => {
    if (calls) {
      setData(calls[0].results);
      setNumberOfPages(calls[0].totalPages);
    }
  }, [calls]);
  useEffect(() => {
    if (pageNumber > 1) {
      dispatch(
        callsActions.getCalls.request({
          sortBy: "desc",
          page: pageNumber,
        })
      );
    }
  }, [pageNumber]);

  const columns = [
    {
      title: "CALL TYPE",
      dataIndex: "call_type",
      render: (text, record) => {
        return (
          <>
            <span>{text}</span>
          </>
        );
      },
    },
    {
      title: "DIRECTION",
      dataIndex: "direction",
      render: (text, record) => {
        return (
          <>
            <span>{text}</span>
          </>
        );
      },
    },
    {
      title: "DURATION",
      dataIndex: "duration",
      sorter: false,
      render: (text, record) => {
        return (
          <>
            <span>{text}</span>
          </>
        );
      },
    },
    {
      title: "FROM",
      dataIndex: "from",
      sorter: false,
      render: (text, record) => {
        return (
          <>
            <span>{text}</span>
          </>
        );
      },
    },
    {
      title: "TO",
      dataIndex: "to",
      sorter: false,
      render: (text, record) => {
        return (
          <>
            <span>{text}</span>
          </>
        );
      },
    },
    {
      title: "VIA",
      dataIndex: "via",
      sortDirections: ["descend"],
      render: (text, record) => {
        return (
          <>
            <span>{text}</span>
          </>
        );
      },
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      sortDirections: ["descend"],
      align:"center",
      render: (text, record) => {
        return <>{moment(text).format("DD MM YYYY")}</>;
      },
    },
    {
      title: "STATUS",
      dataIndex: "is_archived",
      sortDirections: ["descend"],
      render: (text, record) => {
        let color = record.is_archived === true ? "geekblue" : "green";
        if (record.is_archived === false) {
          color = "volcano";
        }
        return (
          <>
            <span>
              <Tag
                style={
                  record.is_archived === true
                    ? { backgroundColor: "#EDFBFA", color: "#25D1C2" }
                    : { backgroundColor: "#EEEEEE", color: "#D5D5D5" }
                }
              >
                {record.is_archived === true ? "Archived" : "Unarchive"}
              </Tag>
            </span>
          </>
        );
      },
    },
    {
      title: "ACTIONS",
      dataIndex: "priority",
      sortDirections: ["descend"],
      render: (text, record) => {
        return (
          <>
            <Button>Add Note</Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="dashboard_wrap">
        <div style={{ fontFamily: "cursive", fontSize: "larger" }}>
          Turing Technologies Frontend Test
        </div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <PaginationComp
          currentPage={pageNumber}
          totalCount={numberOfPages}
          onPageChange={(page) => {
            pageRef.current = page;
            setPageNumber(page);
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;

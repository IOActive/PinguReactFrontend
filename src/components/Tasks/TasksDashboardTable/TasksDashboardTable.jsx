import React, { useEffect } from "react";
import { connect } from "react-redux";
import { readAllTasks } from "../../../actions/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import DashboardTable from "../../DashBoardTable/DashBoardTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const TasksDashboardTable = (props) => {

  const { isFetching, payload } = useSelector(state => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(readAllTasks())
  }, [dispatch]);


  return (
        <DashboardTable
          objectName={"Tasks"}
          glyph={<FontAwesomeIcon icon={faTasks} />}
          retrieveData={props.retrieveBots}
          findObjectByName={null}
          colums={["job_id", "platform", "command", "argument"]}
          list_path={null}
          data={payload}
          isFetching={isFetching}
        />
  );
};


const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    bots: state.tasks,
    user,
  };
};

export default connect(mapStateToProps, {
  readAllTasks,
})(TasksDashboardTable);

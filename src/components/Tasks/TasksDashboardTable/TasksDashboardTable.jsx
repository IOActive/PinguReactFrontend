import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { readAllTasks } from "../../../actions/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import DashboardTable from "../../DashBoardTable/DashBoardTable";


const TasksDashboardTable = (props) => {

  const { isFetching, payload } = useSelector(state => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(readAllTasks())
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(readAllTasks())
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch])



  return (
        <DashboardTable
          objectName={"Tasks"}
          glyph={<FontAwesomeIcon icon={faTasks} />}
          retrieveData={props.readAllTasks}
          findObjectByName={props.readAllTasks}
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

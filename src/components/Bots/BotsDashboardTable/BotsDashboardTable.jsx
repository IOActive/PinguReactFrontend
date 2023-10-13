import React, { useEffect } from "react";
import { connect } from "react-redux";
import { retrieveBots, findBotsByName } from "../../../actions/bot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import DashboardTable from "../../DashBoardTable/DashBoardTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const BotsDashboardTable = (props) => {

  const { isFetching, payload } = useSelector(state => state.bots);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveBots(1))
  }, [dispatch]);


  return (
        <DashboardTable
          objectName={"Bots"}
          glyph={<FontAwesomeIcon icon={faRobot} />}
          retrieveData={props.retrieveBots}
          findObjectByName={props.findBotsByName}
          colums={["name", "last_beat_time", "platform", "task_payload", "task_status"]}
          list_path={"/app/bot/list"}
          data={payload}
          isFetching={isFetching}
        />
  );
};


const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    bots: state.bots,
    user,
  };
};

export default connect(mapStateToProps, {
  retrieveBots,
  findBotsByName,
})(BotsDashboardTable);

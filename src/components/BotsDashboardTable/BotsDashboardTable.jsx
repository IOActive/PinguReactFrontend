import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { retrieveBots, findBotsByName } from "../../actions/bot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import DashboardTable from "../DashBoardTable/DashBoardTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const BotsDashboardTable = (props) => {

  const { isFetching, payload } = useSelector(state => state.bots);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveBots(1))
  }, [dispatch]);


  return (
    <div>
      {payload && (
        <DashboardTable
          objectName={"Bots"}
          glyph={<FontAwesomeIcon icon={faRobot} />}
          retrieveData={retrieveBots}
          findObjectByName={findBotsByName}
          colums={["ID", "Bot Name", "Last Beat Time", "Task Payload", "Task End Time", "Task Status", "Platform"]}
          list_path={"/app/bot/list"}
          data={payload}
          isFetching={isFetching}
        />
      )}
    </div>
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

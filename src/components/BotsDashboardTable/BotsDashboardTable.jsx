import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { retrieveBots, findBotsByName } from "../../actions/bot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import DashboardTable from "../DashBoardTable/DashBoardTable";


const BotsDashboardTable = (props) => {

  const {isFetching, payload } = useSelector(state => state.bots);

  return (
    <DashboardTable
      objectName={"Bots"}
      glyph={<FontAwesomeIcon icon={faRobot} />}
      isFetching={isFetching}
      retrieveData={retrieveBots}
      findObjectByName={findBotsByName}
      payload={payload}
      colums={[ "ID", "Bot Name", "Last Beat Time", "Task Payload", "Task End Time", "Task Status", "Platform"]}
      list_path={"/app/bot/list"}
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

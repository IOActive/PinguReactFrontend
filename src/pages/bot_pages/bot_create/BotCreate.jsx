import { connect } from "react-redux";
import { createBot } from "../../../actions/bot";
import { useSelector } from "react-redux";
import { Bot } from "../../../models/Bot";
import CreateObject from "../../../components/CreateObject/CreateObject";

function AddBot(props) {

  const newBot = Bot({
    id: null,
    name: "",
    last_beat_time: null,
    task_payload: "",
    task_end_time: null,
    task_status: "NA",
    platform: "",
    validated: false,
    submitted: false,
  });

  const { errorMessage } = useSelector(
    (state) => state.bots
  );

  return (
    <CreateObject
      object={newBot}
      createObject={props.createBot}
      errorMessage={errorMessage}
      />
  );
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps, { createBot })(AddBot);

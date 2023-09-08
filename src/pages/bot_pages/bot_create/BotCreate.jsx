import { connect } from "react-redux";
import { createBot } from "../../../actions/bot";
import { Bot } from "../../../models/Bot";
import CreateObject from "../../../components/CreateObject/CreateObject";
import { useSelector } from "react-redux";


function CreateBot() {

  const bot = Bot();

  const { errorMessage } = useSelector(
    (state) => state.bots
  );

  return (
    <CreateObject
      object={bot}
      object_name="Bot"
      createObject={createBot}
      errorMessage={errorMessage}
    />
  );
}

const mapStateToProps = (state) => {

};

export default connect(mapStateToProps, {
  createBot,
})(CreateBot);

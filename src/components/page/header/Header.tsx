import "server-only"
import AddTemplate from "../addTemplate/AddTemplate";
import Title from "./Title";

const Header = () => {
  return (
    <div className="flex justify-between pb-5 border-b sm:border-b-2 sm:pb-5">
      <Title />
      {/* <div>
        <AddTemplate />
      </div> */}
    </div>
  );
};

export default Header;

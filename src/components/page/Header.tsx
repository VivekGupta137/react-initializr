import AddTemplate from "./addTemplate/AddTemplate";

const Header = () => {
  return (
    <div className="my-10 flex justify-between">
      <div>
        <h1 className="text-5xl font-bold">React Initializr</h1>
        <p>You want to build something I got the perfect starter for u.</p>
      </div>
      <div>
        <AddTemplate />
      </div>
    </div>
  );
};

export default Header;

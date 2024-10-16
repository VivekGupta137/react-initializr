import { FaReact } from "react-icons/fa";

const Title = () => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex text-4xl gap-2 items-center pt-5">
        <FaReact strokeWidth={5} color="#58C4DC" className="text-5xl animate-[spin_5s_linear_infinite] "/>
        <h1 className="font-bold">
            <span>React Initializr</span>
        </h1>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground">You want to build something awesome I got the perfect starter for u.</p>
    </div>
  );
};

export default Title;

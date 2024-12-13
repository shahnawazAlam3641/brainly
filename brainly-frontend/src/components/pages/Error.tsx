import ErrorGraphic from "../../assets/ErrorGraphic.svg";

const Error = () => {
  return (
    <div className="min-h-[90vh] w-full flex justify-center items-center">
      <img src={ErrorGraphic} className=" max-w-[700px]" />
    </div>
  );
};

export default Error;

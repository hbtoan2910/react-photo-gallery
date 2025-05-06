import "./Spinner.css";

type SpinnerProps = {
  type?: "api-load" | "preload";
};

const Spinner = ({ type }: SpinnerProps) => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner"></div>
      {type === "api-load" ? (
        <p>Loading data from API...</p>
      ) : (
        <p style={{ color: "green" }}>Images are being preloaded...</p>
      )}
    </div>
  );
};

export default Spinner;

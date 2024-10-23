const Head = () => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        border: "10px solid black",
        position: "absolute",
        top: "50px",
        right: "-30px",
      }}
    ></div>
  );
};
const Body = () => {
  return (
    <div
      style={{
        width: "10px",
        height: "100px",
        background: "black",
        position: "absolute",
        top: "120px",
        right: 0,
      }}
    ></div>
  );
};
const LeftArm = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "10px",
        rotate: "30deg",
        transformOrigin: "right bottom",
      }}
    ></div>
  );
};
const RightArm = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "-100px",
        rotate: "-30deg",
        transformOrigin: "left bottom",
      }}
    ></div>
  );
};
const LeftLeg = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "210px",
        right: 0,
        rotate: "-60deg",
        transformOrigin: "right bottom",
      }}
    ></div>
  );
};
const RightLeg = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "210px",
        right: "-90px",
        rotate: "60deg",
        transformOrigin: "left bottom",
      }}
    ></div>
  );
};

const Body_Arr = [Head, Body, LeftArm, RightArm, LeftLeg, RightLeg];

type HangManProps = {
  numberOfGuesses: number;
  isActive: boolean;
};

function HangMan({ numberOfGuesses, isActive }: HangManProps) {
  return (
    <div style={{ position: "relative" }}>
      {isActive
        ? Body_Arr.slice(0, numberOfGuesses).map((Component, index) => (
            <Component key={index} />
          ))
        : Body_Arr.map((Component, index) => <Component key={index} />)}
      {/* {Body_Arr.slice(0, numberOfGuesses).map((Component, index) => (
        <Component key={index} />
      ))} */}
      <div
        style={{
          height: "50px",
          width: "10px",
          background: "black",
          top: "0px",
          right: "0px",
          position: "absolute",
        }}
      ></div>
      <div
        style={{
          height: "10px",
          width: "200px",
          background: "black",
          marginLeft: "120px",
        }}
      ></div>
      <div
        style={{
          height: "400px",
          width: "10px",
          background: "black",
          marginLeft: "120px",
        }}
      ></div>
      <div
        style={{ height: "10px", width: "250px", background: "black" }}
      ></div>
    </div>
  );
}

export default HangMan;

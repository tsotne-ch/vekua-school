const Banner = ({ heading }) => {
  const imageUrl = require("./images/last_bell_2022.jpeg");

  return (
    <section
      className={`py-36 bg-center bg-fixed bg-cover`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundColor: "#00000073",
        backgroundBlendMode: "overlay",
      }}
    >
      <h1 className="font-alk text-7xl py-12 text-center text-white bg-[#00000076]">
        <div className="animate-floatIn">{heading}</div>
      </h1>
    </section>
  );
};

export default Banner;

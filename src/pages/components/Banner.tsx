const Banner = ({ heading }: { heading: string }) => {
  return (
    <section
      className={`py-36 bg-center bg-fixed bg-cover`}
      style={{
        backgroundImage: `url(/images/last_bell_2022.jpeg)`,
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

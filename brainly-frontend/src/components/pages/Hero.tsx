import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router";
import HeroSS from "../../assets/HeroSS.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] bg-slate-50 flex flex-col items-center gap-3 md:gap-6">
      <h1 className="text-2xl  md:text-5xl font-extrabold text-slate-800 text-center mt-16 max-w-[90vw] md:max-w-[65vw] lg:max-w-[55vw]">
        Your Digital Vault for Important Links and Notes
      </h1>
      <p className="text-sm  md:text-lg  text-slate-500 text-center  max-w-[75vw] md:max-w-[55vw] lg:max-w-[45vw]">
        Store and organize important content like videos, tweets, documents, and
        notes. Access them anytime, and easily share with friends via link
      </p>
      <div className="flex gap-4">
        <Button
          isPrimary={true}
          onPress={() => navigate("/signin")}
          text="Get Started"
        />
      </div>
      <img
        src={HeroSS}
        className="w-[80vw] max-w-[95vw] rounded-lg border shadow-slate-200 shadow-xl mb-10 grayscale  transition-all duration-500 hover:grayscale-0"
      />
    </div>
  );
};

export default Hero;

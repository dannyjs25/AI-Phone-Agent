import React from 'react';
import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "../src/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight">
          Transform Text into Natural Speech
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          AI Voice Agent brings your words to life with advanced AI voice synthesis. 
          Create professional-grade audio content instantly with natural-sounding 
          voices, real-time customization, and enterprise-grade security.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#demo"
            className="btn btn-primary btn-lg hover:btn-gradient"
          >
            Try Demo
          </a>
          <a
            href="#features"
            className="btn btn-outline btn-lg"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="lg:w-full">
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
          alt="FeNAgO product demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;

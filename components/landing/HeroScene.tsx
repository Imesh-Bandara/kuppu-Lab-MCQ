import Image from "next/image";

export function HeroScene() {
  return (
    <div className="relative mx-auto flex w-full max-w-[540px] items-center justify-center lg:justify-end">
      <div className="relative w-full max-w-[500px]">
        <Image
          src="/hero-character-clean@2x.png"
          alt="KUPPI LAB Student mascot with diploma and laptop"
          width={668}
          height={624}
          priority
          className="h-auto w-full object-contain drop-shadow-[0_12px_28px_rgba(6,43,80,0.06)]"
        />
      </div>
    </div>
  );
}


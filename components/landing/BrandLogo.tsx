import Image from "next/image";

type BrandLogoProps = {
  size?: "nav" | "footer";
};

export function BrandLogo({ size = "nav" }: BrandLogoProps) {
  const height = size === "nav" ? 56 : 62;
  const width = size === "nav" ? 56 : 62;

  return (
    <a href="/" className="flex items-center shrink-0 select-none group">
      <Image
        src="/kuppi-lab-logo.png"
        alt="KUPPI LAB"
        width={width}
        height={height}
        className="object-contain transition-transform group-hover:scale-105"
        priority
      />
    </a>
  );
}

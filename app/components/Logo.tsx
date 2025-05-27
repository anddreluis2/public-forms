import Link from "next/link";
import NextImage from "next/image";

export function Logo({ className = "h-[50px]" }: { className?: string }) {
  return (
    <Link href="/app">
      <NextImage
        src="/logo.svg"
        className={className}
        alt="Logo"
        width={100}
        height={100}
      />
    </Link>
  );
}

export function IconOnly({ className = "h-7" }: { className?: string }) {
  return (
    <Link href="/app">
      <NextImage
        src="/icon.svg"
        className={className}
        alt="HumanTrack Icon"
        width={28}
        height={28}
      />
    </Link>
  );
}

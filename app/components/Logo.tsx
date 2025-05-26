import Link from "next/link";

export function Logo({ className = "h-[50px]" }: { className?: string }) {
  return (
    <Link href="/app">
      <img src="/logo.svg" className={className} alt="Logo" />
    </Link>
  );
}

export function IconOnly({ className = "h-7" }: { className?: string }) {
  return (
    <Link href="/app">
      <img src="/icon.svg" className={className} alt="HumanTrack Icon" />
    </Link>
  );
}

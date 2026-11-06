import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="font-display flex min-h-11 items-center gap-2 text-xl font-bold tracking-tight"
      aria-label="Emplyify home"
    >
      <Image src="/brand/logo-mark.png" alt="" width={35} height={32} />
      <span>Emplyify</span>
    </Link>
  );
}

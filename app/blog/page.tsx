import Link from "next/link";

export default function Blog() {
  return (
    <div>
      <p>Blog</p>
      <ul>
        <li>
          <Link href="/blog/SCHA">SCHA</Link>
        </li>
        <li>
          <Link href="/blog/Mieszkania">Mieszkania</Link>
        </li>
      </ul>
    </div>
  );
}

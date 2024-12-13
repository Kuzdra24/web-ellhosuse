"use client";
export default function Button({
  children,
  type = "button",
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      type={type}
      className="bg-transparent border-2 border-primary text-primary px-4 py-2 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
    >
      {children}
    </button>
  );
}

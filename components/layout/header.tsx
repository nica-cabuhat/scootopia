import Image from "next/image";

const header = () => {
  return (
    <div className="flex items-center gap-2 p-4">
      <Image src="/logo.png" alt="Scootopia Logo" width={50} height={50} />
      <h1 className="uppercase tracking-widest text-[20px]">Scootopia</h1>
    </div>
  );
};

export default header;

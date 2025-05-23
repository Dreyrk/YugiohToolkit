export default async function Page() {
  return (
    <>
      <h1 className="mx-auto w-fit mt-4 font-bold text-slate-100 text-4xl">Collections</h1>
      <div className="grid grid-cols-6 place-items-center gap-8">{/* map des Collections */}</div>
    </>
  );
}

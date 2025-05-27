import CreateCardForm from "@/components/cards/CreateCardForm";

export default async function Page() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <CreateCardForm />;
    </div>
  );
}

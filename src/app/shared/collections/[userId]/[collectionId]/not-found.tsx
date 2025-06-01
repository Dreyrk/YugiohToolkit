import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <FileQuestion className="h-24 w-24 mx-auto text-muted-foreground" color="#f4f4f4" />

        <h1 className="text-secondary text-4xl font-extrabold tracking-tight lg:text-5xl">404</h1>

        <h2 className="text-secondary text-2xl font-semibold tracking-tight">Page non trouvé</h2>

        <p className="text-secondary">Désolé cette page n&apos;existe pas...</p>

        <Button asChild size="lg">
          <Link className="font-semibold text-2xl" href="/">
            Accueil
          </Link>
        </Button>
      </div>
    </div>
  );
}

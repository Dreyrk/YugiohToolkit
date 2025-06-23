import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SectionMenu as SectionMenuType, SessionUser } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SectionMenu({ section, user }: { section: SectionMenuType; user: SessionUser }) {
  return (
    <Card className="w-full" key={section.title}>
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {section.links.map((link) => (
            <Link key={link.title} href={`/profile/${user.id}/${link.href}`}>
              <Card className="transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-gray-100 ${link.color}`}>
                      <link.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{link.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

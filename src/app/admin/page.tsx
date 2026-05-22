import { prisma } from "@/lib/prisma";
import ImportForm from "./ImportForm";
import AddPlantForm from "./AddPlantForm";
import PlantTable from "./PlantTable";
import { 
  Card, 
  Title, 
  Text,
  Button
} from "@tremor/react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

import CollapsibleSection from "./CollapsibleSection";

export const metadata = {
  title: 'Admin Dashboard',
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="max-w-md text-center">
          <Title>Zaloguj się</Title>
          <Text className="mt-2 mb-6">Musisz być zalogowany przez GitHub, aby uzyskać dostęp do panelu administratora.</Text>
          <Link href="/api/auth/signin">
            <Button size="lg" className="w-full">Zaloguj się przez GitHub</Button>
          </Link>
        </Card>
      </main>
    );
  }

  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="p-4 md:p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title className="text-3xl font-bold">Panel Właściciela</Title>
          <Text>Zalogowano jako {session.user?.name || 'Administrator'} • Zarządzaj asortymentem szkółki i cennikiem.</Text>
        </div>
        <Link href="/api/auth/signout">
          <Button variant="secondary" size="sm">Wyloguj się</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <CollapsibleSection title="Dodaj / Importuj rosliny">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImportForm />
            <AddPlantForm />
          </div>
        </CollapsibleSection>
        
        <Card>
          <PlantTable plants={plants} />
        </Card>
      </div>
    </main>
  );
}

import { prisma } from "@/lib/prisma";
import ImportForm from "./ImportForm";
import AddPlantForm from "./AddPlantForm";
import { 
  Card, 
  Title, 
  Text, 
  Table, 
  TableHead, 
  TableRow, 
  TableHeaderCell, 
  TableBody, 
  TableCell, 
  Badge,
  Button
} from "@tremor/react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

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
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title className="text-3xl font-bold">Panel Właściciela</Title>
          <Text>Zalogowano jako {session.user?.name || 'Administrator'} • Zarządzaj asortymentem szkółki i cennikiem.</Text>
        </div>
        <Link href="/api/auth/signout">
          <Button variant="secondary" size="sm">Wyloguj się</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ImportForm />
          <AddPlantForm />
        </div>
        
        <div className="lg:col-span-2">
          <Card className="mt-6 lg:mt-0">
            <Title>Aktualny Asortyment ({plants.length})</Title>
            <Table className="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Nazwa</TableHeaderCell>
                  <TableHeaderCell>Kategoria</TableHeaderCell>
                  <TableHeaderCell>Wys / Poj</TableHeaderCell>
                  <TableHeaderCell>Cena</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plants.map((plant) => (
                  <TableRow key={plant.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{plant.name}</div>
                      <div className="text-xs text-gray-500">{plant.latinName}</div>
                    </TableCell>
                    <TableCell>
                      <Badge color="emerald">{plant.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {plant.height ? `${plant.height} cm` : '-'} / {plant.container ? `${plant.container} dm³` : '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{plant.price}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </main>
  );
}

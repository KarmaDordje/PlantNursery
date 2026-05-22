"use client";

import { useState } from "react";
import { 
  Table, TableHead, TableRow, TableHeaderCell, 
  TableBody, TableCell, Badge 
} from "@tremor/react";
import ToggleAvailability from "./ToggleAvailability";

type Plant = {
  id: number;
  name: string;
  latinName: string | null;
  price: string | null;
  category: string;
  height: string | null;
  container: string | null;
  isAvailable: boolean;
};

export default function PlantTable({ plants }: { plants: Plant[] }) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? plants.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.latinName && p.latinName.toLowerCase().includes(search.toLowerCase())) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      )
    : plants;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Aktualny Asortyment ({filtered.length} z {plants.length})
        </h3>
        <input
          type="text"
          placeholder="Szukaj po nazwie, lacinie, kategorii..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[350px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Nazwa</TableHeaderCell>
              <TableHeaderCell>Kategoria</TableHeaderCell>
              <TableHeaderCell>Cena</TableHeaderCell>
              <TableHeaderCell>Wys / Poj</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((plant) => (
              <TableRow key={plant.id} className={plant.isAvailable ? '' : 'opacity-50'}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ToggleAvailability plantId={plant.id} isAvailable={plant.isAvailable} />
                    <span className={`text-xs font-medium ${plant.isAvailable ? 'text-emerald-600' : 'text-red-400'}`}>
                      {plant.isAvailable ? 'Aktywna' : 'Ukryta'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900">{plant.name}</div>
                  <div className="text-xs text-gray-500">{plant.latinName}</div>
                </TableCell>
                <TableCell>
                  <Badge color="emerald">{plant.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{plant.price}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {plant.height ? `${plant.height} cm` : '-'} / {plant.container ? `${plant.container} dm3` : '-'}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="text-center text-gray-400 py-8">Brak wynikow dla &quot;{search}&quot;</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

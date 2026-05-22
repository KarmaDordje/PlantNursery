"use client";

import { useRef, useState } from "react";
import { addPlantAction } from "./actions";
import { Card, Title, Text, Button, TextInput, Select, SelectItem } from "@tremor/react";
import { Camera, CheckCircle, Sparkles } from "lucide-react";

export default function AddPlantForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState("Drzewa Liściaste");

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    formData.append("category", category);
    await addPlantAction(formData);
    setIsSubmitting(false);
    setSuccess(true);
    formRef.current?.reset();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Card className="mt-6">
      <Title>Dodaj Pojedynczą Roślinę</Title>
      <Text>Wprowadź szczegóły nowej rośliny. System automatycznie pobierze wymagania po nazwie łacińskiej.</Text>
      
      {success && (
        <div className="mt-4 p-4 bg-emerald-50 text-emerald-700 rounded-md flex items-center gap-2 font-medium">
          <CheckCircle size={20} /> Roślina została dodana pomyślnie!
        </div>
      )}

      <form ref={formRef} action={handleSubmit} className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="latinName" className="block text-sm font-medium text-gray-700 mb-1">Nazwa Łacińska (Auto-uzupełnianie API)</label>
          <TextInput id="latinName" name="latinName" required placeholder="np. Acer palmatum" />
          <div className="mt-1 flex items-center gap-1 text-xs text-blue-600">
            <Sparkles size={12} /> System automatycznie pobierze wymagania.
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nazwa Polska</label>
          <TextInput id="name" name="name" required placeholder="np. Klon Palmowy 'Garnet'" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectItem value="Drzewa Liściaste">Drzewa Liściaste</SelectItem>
              <SelectItem value="Drzewa Iglaste">Drzewa Iglaste</SelectItem>
              <SelectItem value="Krzewy Ozdobne">Krzewy Ozdobne</SelectItem>
              <SelectItem value="Róże">Róże</SelectItem>
              <SelectItem value="Trawy i Byliny">Trawy i Byliny</SelectItem>
            </Select>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Cena (PLN)</label>
            <TextInput id="price" name="price" required placeholder="np. 120 PLN" />
          </div>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL Zdjęcia (Z telefonu)</label>
          <div className="flex gap-2">
            <TextInput id="imageUrl" name="imageUrl" className="flex-1" placeholder="Wklej link lub zostaw puste dla domyślnego" />
            <Button type="button" variant="secondary" icon={Camera}>Wgraj</Button>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          loading={isSubmitting}
          loadingText="Dodawanie..."
          className="mt-2 w-full sm:w-auto"
        >
          Dodaj Roślinę
        </Button>
      </form>
    </Card>
  );
}

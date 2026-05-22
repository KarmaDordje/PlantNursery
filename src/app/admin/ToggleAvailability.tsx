"use client";

import { togglePlantAvailability } from "./actions";
import { useTransition } from "react";

export default function ToggleAvailability({ plantId, isAvailable }: { plantId: number; isAvailable: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await togglePlantAvailability(plantId);
        });
      }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
        isPending ? 'opacity-50 cursor-wait' : 'cursor-pointer'
      } ${isAvailable ? 'bg-emerald-500' : 'bg-gray-300'}`}
      title={isAvailable ? 'Aktywna - kliknij aby ukryc' : 'Ukryta - kliknij aby aktywowac'}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          isAvailable ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

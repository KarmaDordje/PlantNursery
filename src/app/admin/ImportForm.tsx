"use client";

import { useRef, useState } from "react";
import { uploadFileAction } from "./actions";
import { Card, Title, Text, Button } from "@tremor/react";
import { Upload, CheckCircle } from "lucide-react";

export default function ImportForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCsvSubmitting, setIsCsvSubmitting] = useState(false);
  const [csvSuccess, setCsvSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const name = file.name.toLowerCase();
      if (name.endsWith('.csv') || name.endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        alert("Proszę wgrać plik .csv lub .pdf");
      }
    }
  };

  const handleCsvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsCsvSubmitting(true);
    const formData = new FormData();
    formData.append("csvFile", selectedFile);
    
    try {
      const result = await uploadFileAction(formData);
      setCsvSuccess(`Pomyślnie zaimportowano ${result.count} roślin!`);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      alert("Błąd podczas importu. Sprawdź format pliku.");
    }
    
    setIsCsvSubmitting(false);
    setTimeout(() => setCsvSuccess(null), 5000);
  };

  return (
    <Card className="mt-6">
      <Title>Masowy Import (CSV / PDF)</Title>
      <Text>Wgraj plik .csv lub .pdf. W przypadku PDF, system spróbuje automatycznie odczytać strukturę cennika.</Text>
      
      <form onSubmit={handleCsvSubmit} className="mt-4 flex flex-col gap-4">
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors flex flex-col items-center gap-3 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'
          }`}
        >
          <Upload size={32} className={isDragging ? 'text-blue-500' : 'text-gray-400'} />
          {selectedFile ? (
            <span className="font-medium text-gray-900">{selectedFile.name}</span>
          ) : (
            <span className="text-gray-500">Przeciągnij i upuść plik tutaj lub kliknij, aby wybrać</span>
          )}
        </div>

        <input 
          type="file" 
          name="csvFile" 
          accept=".csv, .pdf" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
        />
        
        <Button 
          type="submit" 
          disabled={isCsvSubmitting ? true : (selectedFile === null ? true : false)} 
          loading={isCsvSubmitting}
          loadingText="Importowanie..."
          className="mt-2 w-full sm:w-auto"
        >
          Zaimportuj Cennik
        </Button>
        
        {csvSuccess && (
          <div className="mt-2 p-3 bg-emerald-50 text-emerald-700 rounded-md flex items-center gap-2">
            <CheckCircle size={20} /> {csvSuccess}
          </div>
        )}
      </form>
    </Card>
  );
}

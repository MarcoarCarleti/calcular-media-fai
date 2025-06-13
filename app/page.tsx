"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import Image from "next/image"; // Import não utilizado
import AdUnit from "@/components/ui/ad-unit"; // Importe o novo componente
import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState({
    firstNote: undefined,
    secondNote: undefined,
  });
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const mediumNote = (notes.firstNote! + notes.secondNote!) / 2;

  const finalNote = (mediumNote * 6 - 500) / 4;

  const handleSubmitButtonClick = () => {
    if (!notes.firstNote || !notes.secondNote) return;

    setIsButtonClicked(true);
  };

  return (
    <main className="bg-black flex bg-background min-h-screen flex-col items-center justify-center p-24 gap-4">
      {/* Exemplo de Bloco de Anúncio no Topo */}
      <AdUnit
        adClient="ca-pub-3195296029072717" // Seu ID de Editor
        adSlot="SEU_ID_DE_BLOCO_DE_ANUNCIO_1" // SUBSTITUA pelo ID do seu bloco de anúncio
        adFormat="auto" // ou "leaderboard", "banner", etc.
        fullWidthResponsive={true}
        // Estilo opcional para o contêiner do anúncio
        style={{ width: '100%', maxWidth: '728px', height: '90px' }}
      />

      <Card className="w-[350px] bg-black h-[350px">
        <CardHeader>
          <CardTitle className="text-white">Calcular nota final FAI</CardTitle>
          <CardDescription>Insira as notas dos dois bimestres</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex  flex-col gap-4 justify-center items-center">
            <div className="flex flex-col w-full gap-2 text-start">
              <span>Nota do primeiro bimestre</span>
              <Input
                className="text-white"
                type="number"
                value={notes.firstNote}
                onChange={(e) =>
                  setNotes({
                    firstNote: Number(e.target.value) as any,
                    secondNote: notes.secondNote,
                  })
                }
              />
            </div>

            <div className="flex flex-col w-full gap-2 text-start">
              <span>Nota do segundo bimestre</span>
              <Input
                className="text-white"
                value={notes.secondNote}
                onChange={(e) =>
                  setNotes({
                    firstNote: notes.firstNote,
                    secondNote: Number(e.target.value) as any,
                  })
                }
              />
            </div>

            {isButtonClicked && (
              <div className="flex flex-col w-full pt-4 text-start">
                Nota necessária: {Math.abs(finalNote)}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex items-end justify-end">
          <Button onClick={handleSubmitButtonClick}>Enviar</Button>
        </CardFooter>
      </Card>

      {/* Exemplo de Bloco de Anúncio Abaixo do Card */}
      <AdUnit
        adClient="ca-pub-3195296029072717" // Seu ID de Editor
        adSlot="SEU_ID_DE_BLOCO_DE_ANUNCIO_2" // SUBSTITUA por outro ID de bloco de anúncio
        adFormat="auto" // ou "rectangle", etc.
        // Estilo opcional para um anúncio retangular
        style={{ width: '300px', height: '250px' }}
      />
    </main>
  );
}

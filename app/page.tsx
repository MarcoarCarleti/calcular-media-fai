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
import AdUnit from "@/components/ui/ad-unit";
import { useMemo, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState({
    firstNote: "",
    secondNote: "",
  });
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const { mediumNote, requiredNote } = useMemo(() => {
    const first = parseFloat(notes.firstNote);
    const second = parseFloat(notes.secondNote);

    if (Number.isNaN(first) || Number.isNaN(second)) {
      return { mediumNote: undefined, requiredNote: undefined };
    }

    const medium = (first + second) / 2;
    const finalNote = (medium * 6 - 500) / 4;

    return {
      mediumNote: medium,
      requiredNote: Math.max(0, Math.abs(finalNote)),
    };
  }, [notes.firstNote, notes.secondNote]);

  const handleSubmitButtonClick = () => {
    if (!notes.firstNote || !notes.secondNote) return;

    setIsButtonClicked(true);
  };

  const formatNumber = (value?: number) =>
    value !== undefined && !Number.isNaN(value)
      ? value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })
      : "--";

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_40%),_radial-gradient(circle_at_bottom,_rgba(99,102,241,0.12),_transparent_35%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-10 px-6 py-12">
        <header className="text-center space-y-4">
          <p className="inline-flex items-center rounded-full bg-slate-800/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-200">
            Simulador FAI
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Descubra rapidamente sua nota final
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Insira as notas dos dois bimestres para calcular a média parcial e entender
            qual é a nota necessária na avaliação final integradora (FAI).
          </p>
        </header>

        <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card className="border-slate-800/70 bg-slate-900/70 shadow-2xl shadow-cyan-500/10 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Calcular nota final</CardTitle>
              <CardDescription className="text-slate-300">
                Preencha as notas bimestrais abaixo para visualizar seu resultado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-200">
                    Nota do primeiro bimestre
                  </label>
                  <Input
                    inputMode="decimal"
                    placeholder="Ex.: 75"
                    value={notes.firstNote}
                    onChange={(e) =>
                      setNotes({
                        firstNote: e.target.value,
                        secondNote: notes.secondNote,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-200">
                    Nota do segundo bimestre
                  </label>
                  <Input
                    inputMode="decimal"
                    placeholder="Ex.: 82"
                    value={notes.secondNote}
                    onChange={(e) =>
                      setNotes({
                        firstNote: notes.firstNote,
                        secondNote: e.target.value,
                      })
                    }
                  />
                </div>

                <p className="rounded-lg bg-slate-800/70 px-4 py-3 text-sm text-slate-200">
                  Dica: utilize valores de 0 a 100. Nós mostraremos a média parcial e
                  a nota mínima sugerida para alcançar o objetivo na FAI.
                </p>
              </form>
            </CardContent>
            <CardFooter className="flex items-center justify-end">
              <Button
                className="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                onClick={handleSubmitButtonClick}
              >
                Calcular
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-slate-800/70 bg-slate-900/80 shadow-2xl shadow-indigo-500/10 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">Resultados</CardTitle>
              <CardDescription className="text-slate-300">
                Visualize sua média parcial e a nota estimada para a FAI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 rounded-xl bg-slate-800/60 p-4">
                <p className="text-sm text-slate-300">Média dos bimestres</p>
                <p className="text-4xl font-semibold text-white">{formatNumber(mediumNote)}</p>
              </div>
              <div className="mt-4 space-y-3 rounded-xl bg-slate-800/60 p-4">
                <p className="text-sm text-slate-300">Nota sugerida para a FAI</p>
                <p className="text-4xl font-semibold text-cyan-400">
                  {formatNumber(requiredNote)}
                </p>
                <p className="text-sm text-slate-300">
                  {isButtonClicked
                    ? "Use essa referência para planejar seus estudos."
                    : "Clique em calcular para ver o resultado."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative grid w-full max-w-5xl gap-6 md:grid-cols-2">
          <Card className="border-slate-800/70 bg-slate-900/80 shadow-lg shadow-cyan-500/5">
            <CardHeader>
              <CardTitle>Por que calcular antes?</CardTitle>
              <CardDescription className="text-slate-300">
                Planeje-se com antecedência e saiba exatamente onde focar.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-slate-200">
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
                <li>Entenda sua situação atual sem perder tempo com contas manuais.</li>
                <li>Defina metas reais para a prova final e organize seu cronograma.</li>
                <li>Evite surpresas: visualize a média parcial e a nota mínima necessária.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-800/70 bg-slate-900/80 shadow-lg shadow-indigo-500/5">
            <CardHeader>
              <CardTitle>Dúvidas comuns</CardTitle>
              <CardDescription className="text-slate-300">
                Informações rápidas para você consultar sempre que precisar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-200 text-sm leading-relaxed">
              <p>
                As notas devem ser inseridas no formato de 0 a 100. O cálculo considera a
                média simples entre os dois bimestres e a fórmula de referência utilizada
                pela instituição para a FAI.
              </p>
              <p>
                O resultado apresentado é uma estimativa para ajudar no planejamento. Sempre
                confirme as regras oficiais com sua coordenação ou manual acadêmico.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Exemplo de Bloco de Anúncio no Rodapé */}
        <div className="w-full max-w-5xl">
          <AdUnit
            adClient="ca-pub-3195296029072717"
            adSlot="SEU_ID_DE_BLOCO_DE_ANUNCIO_2"
            adFormat="auto"
            style={{ width: "100%", height: "120px" }}
          />
        </div>
      </div>
    </main>
  );
}

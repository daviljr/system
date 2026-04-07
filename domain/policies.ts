import { ConfirmarExecucaoInput } from './contracts';
import { ParceiroState } from './state';

export function selecionarParceiro(
  input: ConfirmarExecucaoInput
): string | null {
  const disponiveis = input.parceiros
    .filter(p => p.estado === ParceiroState.DISPONIVEL)
    .sort((a, b) => b.confianca - a.confianca);

  if (disponiveis.length === 0) return null;

  return disponiveis[0].id;
}

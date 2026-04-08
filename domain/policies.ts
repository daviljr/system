import { ConfirmarExecucaoInput } from './contracts';
import { ParceiroState } from './state';

export function selecionarParceiro(
  input: ConfirmarExecucaoInput
): string | null {
  try {
    // 🔒 Proteção contra undefined/null
    const parceiros = input?.parceiros ?? [];

    // 🔍 Validação estrutural mínima
    if (!Array.isArray(parceiros)) {
      console.error('parceiros não é um array válido:', parceiros);
      return null;
    }

    // 🔹 Filtro + ordenação segura
    const disponiveis = parceiros
      .filter((p) => {
        return (
          p &&
          p.estado === ParceiroState.DISPONIVEL &&
          typeof p.confianca === 'number'
        );
      })
      .sort((a, b) => b.confianca - a.confianca);

    // 🔹 Nenhum parceiro elegível
    if (disponiveis.length === 0) {
      return null;
    }

    // 🔹 Retorna o melhor parceiro
    return disponiveis[0].id;

  } catch (error) {
    // 💥 Nunca deixa quebrar a aplicação
    console.error('Erro em selecionarParceiro:', error);
    return null;
  }
}

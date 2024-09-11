export class AtendimentoService {
  async obterHorarioAtendimento(): Promise<any> {
    const json = `
      {
        "nomeDoProfessor": "Professor X",
        "horarioDeAtendimento": "14:00 - 16:00",
        "periodo": "integral",
        "sala": "4",
        "predio": [1, 2, 3, 4, 6]
      }
    `;
    return JSON.parse(json);
  }

  determinarPredio(sala: number): number {
    if (sala >= 1 && sala <= 5) {
      return 1;
    } else if (sala >= 6 && sala <= 10) {
      return 2;
    } else {
      throw new Error('Sala inválida');
    }
  }
}

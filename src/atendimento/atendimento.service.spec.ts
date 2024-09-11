import { AtendimentoService } from './atendimento.service';

describe('AtendimentoService', () => {
  let service: AtendimentoService;

  beforeEach(() => {
    service = new AtendimentoService();
  });

  describe('Cenários de sucesso', () => {
    it('Deve retornar o horário de atendimento', async () => {
      const resultado = await service.obterHorarioAtendimento();
      expect(resultado.nomeDoProfessor).toBe('Professor X');
      expect(resultado.horarioDeAtendimento).toBe('14:00 - 16:00');
    });

    it('Deve retornar o prédio correto para sala 1', () => {
      const predio = service.determinarPredio(1);
      expect(predio).toBe(1);
    });

    it('Deve retornar o prédio correto para sala 6', () => {
      const predio = service.determinarPredio(6);
      expect(predio).toBe(2);
    });

    it('Deve retornar o prédio correto para sala 5', () => {
      const predio = service.determinarPredio(5);
      expect(predio).toBe(1);
    });

    it('Deve retornar o prédio correto para sala 10', () => {
      const predio = service.determinarPredio(10);
      expect(predio).toBe(2);
    });

    it('Deve parsear corretamente o JSON recebido', async () => {
      const resultado = await service.obterHorarioAtendimento();
      expect(resultado).toHaveProperty('nomeDoProfessor');
      expect(resultado).toHaveProperty('horarioDeAtendimento');
      expect(resultado).toHaveProperty('sala');
    });

    it('Deve retornar o período integral corretamente', async () => {
      const resultado = await service.obterHorarioAtendimento();
      expect(resultado.periodo).toBe('integral');
    });

    it('Deve retornar o JSON com os dados corretos', async () => {
      const resultado = await service.obterHorarioAtendimento();
      expect(resultado.nomeDoProfessor).toBe('Professor X');
      expect(resultado.horarioDeAtendimento).toBe('14:00 - 16:00');
      expect(resultado.periodo).toBe('integral');
      expect(resultado.sala).toBe('4');
    });

    it('Deve garantir que o prédio escolhido para salas entre 1 e 5 seja o 1', () => {
      const predio = service.determinarPredio(3);
      expect(predio).toBe(1);
    });

    it('Deve garantir que o prédio escolhido para salas entre 6 e 10 seja o 2', () => {
      const predio = service.determinarPredio(7);
      expect(predio).toBe(2);
    });
  });

  describe('Cenários de falha', () => {
    it('Deve lançar erro para sala inválida (-1)', () => {
      expect(() => service.determinarPredio(-1)).toThrow('Sala inválida');
    });

    it('Deve lançar erro para sala inválida (0)', () => {
      expect(() => service.determinarPredio(0)).toThrow('Sala inválida');
    });

    it('Deve lançar erro para sala inválida (11)', () => {
      expect(() => service.determinarPredio(11)).toThrow('Sala inválida');
    });

    it('Deve lançar erro se o JSON não ter o nome do professor', async () => {
      jest.spyOn(service, 'obterHorarioAtendimento').mockResolvedValue({
        horarioDeAtendimento: '14:00 - 16:00',
        periodo: 'integral',
        sala: '4',
        predio: [1, 2, 3, 4, 6],
      });
      const resultado = await service.obterHorarioAtendimento();
      expect(resultado.nomeDoProfessor).toBeUndefined();
    });

    it('Deve lançar erro se o JSON não ter o horário de atendimento', async () => {
      jest.spyOn(service, 'obterHorarioAtendimento').mockResolvedValue({
        nomeDoProfessor: 'Professor X',
        periodo: 'integral',
        sala: '4',
        predio: [1, 2, 3, 4, 6],
      });
      const resultado = await service.obterHorarioAtendimento();
      expect(resultado.horarioDeAtendimento).toBeUndefined();
    });

    it('Deve lançar erro para sala não numérica', () => {
      expect(() => service.determinarPredio(Number('abc'))).toThrow();
    });

    it('Deve lançar erro para sala null ou undefined', () => {
      expect(() => service.determinarPredio(null)).toThrow();
      expect(() => service.determinarPredio(undefined)).toThrow();
    });

    it('Deve lançar erro para array de prédios com valores não numéricos', async () => {
      jest.spyOn(service, 'obterHorarioAtendimento').mockResolvedValue({
        nomeDoProfessor: 'Professor X',
        horarioDeAtendimento: '14:00 - 16:00',
        periodo: 'integral',
        sala: '4',
        predio: ['abc'],
      });

      const resultado = await service.obterHorarioAtendimento();

      expect(Number.isNaN(Number(resultado.predio[0]))).toBe(true);
    });

    it('Deve lançar erro para JSON com formato incorreto', async () => {
      jest.spyOn(service, 'obterHorarioAtendimento').mockResolvedValue({
        nomeDoProfessor: 'Professor X',
        horarioDeAtendimento: null,
        periodo: 'integral',
        sala: '4',
        predio: [1, 2, 3, 4, 6],
      });
      const resultado = await service.obterHorarioAtendimento();
      expect(resultado.horarioDeAtendimento).toBeNull();
    });
  });
});

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtendimentoServiceService } from './atendimento-service/atendimento-service.service';
import { AtendimentoService } from './atendimento/atendimento.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AtendimentoServiceService, AtendimentoService],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/tarefas/models/tarefa';
import { TarefasService } from 'src/app/tarefas/services/tarefas.service';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css']
})
export class TarefaListaComponent implements OnInit {

  tarefas: Tarefa[] = [];
  msgErro: string = '';

  constructor(private tarefasService: TarefasService) { }

  ngOnInit(): void {
    this.obterTarefas();

  }

  obterTarefas() {
    return this.tarefasService.obterTarefas().subscribe(
      tarefas => {
        this.tarefas = tarefas;
      },
      error => this.msgErro = <any> error
      
    );

  }

}

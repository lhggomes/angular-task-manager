import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tarefa } from '../../models/tarefa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefasService } from '../../services/tarefas.service';

@Component({
  selector: 'app-tarefa-cadastro',
  templateUrl: './tarefa-cadastro.component.html',
  styleUrls: ['./tarefa-cadastro.component.css']
})
export class TarefaCadastroComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  pageTitle: string = 'Cadastro de Tarefas';
  formMode: string = '';
  tarefa!: Tarefa;
  tarefaForm!: FormGroup;
  validationMessages!: { [Key: string]: { [key: string]: string } }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefasService

  ) {

    this.validationMessages = {
      nome: {
        required: 'Nome é obrigatório',
        minlenght: 'Nome deve ter ao menos 3 caracteres',
        maxlenght: 'Nome não pode exceder mais de 70 caracteres',
      },
      detalhes: {
        minlenght: 'Nome deve ter ao menos 3 caracteres',
        maxlenght: 'Nome não pode exceder mais de 1000 caracteres',
      },
    }

  }


  obterTarefa(id: string): void {
    this.tarefaService.obterTarefa(id)
      .subscribe(
        (tarefa: Tarefa) => this.exibirTarefa(tarefa),
        (error: any) => this.errorMessage = <any>error
      )
  }

  exibirTarefa(tarefa: Tarefa): void {

    if (this.tarefaForm) {
      this.tarefaForm.reset();
    }

    this.tarefa = tarefa;

    if (this.tarefa.id == '') {
      this.pageTitle = 'Adicionar tarefa';
    } else {
      this.pageTitle = `Editar tarefa: ${this.tarefa.nome}`;
    }

    this.tarefaForm.patchValue({
      nome: this.tarefa.nome,
      detalhes: this.tarefa.detalhes
    })

  }

  excuirTarefa(tarefa: Tarefa): void {
    if (this.tarefa.id == ''){
      this.onSaveComplete();
    }
    else {
      if (confirm(`Tem certeza que deseja excluir a tarefa: ${this.tarefa.nome}?`)){
        this.tarefaService.excluirTarefa(this.tarefa.id!).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  salvar(): void {
    if (this.tarefaForm.valid){
      if (this.tarefaForm.dirty){

        const t = {...this.tarefa, ...this.tarefaForm.value};

        if (t.id === ''){
          this.tarefaService.criarTarefa(t)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        } else {
          this.tarefaService.atualizarTarefa(t)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        } 

      }else {
        this.onSaveComplete();
      }
    }else {
      this.errorMessage = "Por favor corriga os erros de validação. ";
    }
  }

  onSaveComplete(): void {

    this.tarefaForm.reset();
    this.router.navigate(['/tarefas']);

  }

  ngOnInit(): void {
    this.formMode = 'new';
    this.tarefaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
      detalhes: ['', [Validators.minLength(3), Validators.maxLength(1000)]],

    })
  }

  ngOnDestroy(): void {

  }

}

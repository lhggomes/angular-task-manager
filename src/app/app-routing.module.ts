import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefaListaComponent } from './tarefas/tarefas/components/tarefa-lista/tarefa-lista.component';
import { TarefaCadastroComponent } from './tarefas/tarefas/components/tarefa-cadastro/tarefa-cadastro.component';

const routes: Routes = [
  { path: '', component: TarefaListaComponent },
  { path: 'tarefas', component: TarefaListaComponent },
  { path: 'tarefas/cadastrar', component: TarefaCadastroComponent },
  { path: 'tarefas/:id/editar', component: TarefaCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/componenets/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TarefaCadastroComponent } from './tarefas/components/tarefa-cadastro/tarefa-cadastro.component';
import { TarefaListaComponent } from './tarefas/components/tarefa-lista/tarefa-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    TarefaCadastroComponent,
    TarefaListaComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';

import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { TodoProvider } from "../../providers/todo/todo";

import { ArchivedTodosPage } from "../archived-todos/archived-todos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;
  public archivedTodosPage = ArchivedTodosPage;
  constructor(private toastController: ToastController, private todoProvider: TodoProvider, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoProvider.getTodos();
  }

  archivedTodo(todoIndex){
    this.todoProvider.archivedTodo(todoIndex);
  }

  goToArchivedPage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter Your Todo",
      inputs : [
        {
           type: "text",
           name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {
                let toast = this.toastController.create({
                  message: "Todo Added",
                  duration: 2000, // 2seconds
                });
    
                toast.present();
            });

            
          }
        }
      ]
    });

    addTodoAlert.present()

  }

  editTodo(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: "Edit A Todo",
      message: "Edit your todo",
      inputs : [
        {
           type: "text",
           name: "editTodoInput",
           value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoProvider.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(() => {
                let toast = this.toastController.create({
                  message: "Todo Updated",
                  duration: 2000, // 2seconds
                });
    
                toast.present();
            });

            
          }
        }
      ]
    });
    editTodoAlert.present();
  }

}

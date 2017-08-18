import { Todo } from './../../app/todo';
import { TodoServiceProvider } from './../../providers/todo-service/todo-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TodoEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-edit',
  templateUrl: 'todo-edit.html',
})
export class TodoEditPage {
  public todo: Todo;
  public todos: Todo[];
  public index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public todoService:TodoServiceProvider) {
    this.todo = navParams.get('todo');
    this.todos = navParams.get('todos');
    this.index = navParams.get('index');
  }

  saveTodo(updatedDescription:string){
    this.todo.description = updatedDescription;
    this.todoService.update(this.todo)
        .subscribe(response => {
          this.navCtrl.pop();
        });
  }

  deleteTodo() {
    this.todoService.delete(this.todo)
      .subscribe(response => {
        this.todos.splice(this.index, 1); // remove the todo
        this.navCtrl.pop(); //go back to todo list
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoEditPage');
  }

}

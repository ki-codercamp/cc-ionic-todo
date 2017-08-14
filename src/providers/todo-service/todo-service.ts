import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Todo} from '../../app/todo';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {
  todosUrl = 'https://cc-ionic-todo.herokuapp.com/todos';

  constructor(public http: Http) {

  }

  //GET all todos
  load(): Observable<Todo[]> {
    return this.http.get(this.todosUrl)
              .map(res => res.json());
              // .catch(this.handleError);
  }

  // Add a todo-edit
add(todo: string): Observable<Todo> {
  let body = JSON.stringify({description: todo});
  let headers = new Headers({'Content-Type': 'application/json'});

  return this.http.post(this.todosUrl, body, {headers: headers})
                  .map(res => res.json());
                  // .catch(this.handleError);
}

// Update a todo
update(todo: Todo) {
  let url = `${this.todosUrl}/${todo._id}`;
  let body = JSON.stringify(todo)
  let headers = new Headers({'Content-Type': 'application/json'});

  return this.http.put(url, body, {headers: headers})
                  .map(() => todo);
                  // .catch(this.handleError);
}

// Delete a todo
delete(todo: Todo) {
  let url = `${this.todosUrl}/${todo._id}`;
  let headers = new Headers({'Content-Type': 'application/json'});

  return this.http.delete(url, headers);
            //  .catch(this.handleError);
}

  // handleError(error) {
  //   console.error(error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }

}

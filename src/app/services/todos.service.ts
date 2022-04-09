import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of} from 'rxjs';
import { TODO, TODO_STATUS } from '../types/todo';
import { switchMap,map} from 'rxjs/operators';
import { config } from '../data/config';

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  private TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TODO[]> {
    return this.http.get<any[]>(this.TODOS_URL).pipe(switchMap((todos) => {
      const timeNow = Date.now();

      return of(todos);
    }),map((todos) =>
        todos.slice(0, config.todos.fetch.count).map(this.hydrateTodo)
      )
    );
  }

  private hydrateTodo(todo: any): TODO {
    return {
      title: todo.title,
      status: todo.completed ? TODO_STATUS.COMPLETED : TODO_STATUS.IN_PROGRESS,
    };
  }
}

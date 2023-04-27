import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Post } from '../app/data';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  fetchPosts() {
    return this.http
    .get<Post[]>('https://angular-15s-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map((response) => {
        const postArray: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postArray.push({ ...response[key], id: key });
          }
        }
        return postArray;
      })
    )
  }
}
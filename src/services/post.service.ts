import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, Subscription } from 'rxjs';
import { Post } from '../app/data';

@Injectable()
export class PostService {

  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createPost(postData: Post) {
   this.http
    .post(
      'https://angular-15s-default-rtdb.firebaseio.com/posts.json',
      postData
    )
    .subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        this.error.next(error)
      }
    })
  }

  fetchPosts() {
    return this.http
    .get<Post[]>('https://angular-15s-default-rtdb.firebaseio.com/posts.json',
    {
      headers: new HttpHeaders({
        'Classic-Header': 'Afolabi Opakunle'
      })
    }
    )
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

  deletePosts() {
    return this.http.delete(`https://angular-15s-default-rtdb.firebaseio.com/posts.json`)
  }

}
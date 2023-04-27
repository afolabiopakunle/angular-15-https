import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './data';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isLoading = false;
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post(
        'https://angular-15s-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading = true;
    this.http
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
      .subscribe({
        next: (response) => {
        this.isLoading = false
         this.loadedPosts = response;
        },
      });
  }

  onClearPosts() {
    // Send Http request
  }
}

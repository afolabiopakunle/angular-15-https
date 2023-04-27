import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './data';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Data) {
    // Send Http request
    this.http.post('https://angular-15s-default-rtdb.firebaseio.com/posts.json', postData)
    .pipe(map(response => {
      const postArray = [];
      for (const key in response) {
        postArray.push(response[key])
      }
      console.log('pA', postArray)
      return postArray
    }))
    .subscribe({
      next:(data) => {
        console.log(data);
      }
    });
  }

  onFetchPosts() {
    // Send Http request
    this.http.get('https://angular-15s-default-rtdb.firebaseio.com/posts.json')
    .subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }

  onClearPosts() {
    // Send Http request
  }

}
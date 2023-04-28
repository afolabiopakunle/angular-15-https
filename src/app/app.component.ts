import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './data';
import { map, Subscription } from 'rxjs';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  isLoading = false;
  loadedPosts: Post[] = [];
  error = null;
  errorSub: Subscription;

  constructor(private postService: PostService,
    ) {}

  ngOnInit() {
    this.onFetchPosts();
    this.errorSub = this.postService.error.subscribe(error => this.error= error)
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading = true;
      this.postService.fetchPosts()
      .subscribe({
        next: (response) => {
        this.isLoading = false;
        this.error = null;
         this.loadedPosts = response;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error;
          console.log(error);
        }
      });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
    .subscribe(value => this.loadedPosts = []);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe()
  }
}

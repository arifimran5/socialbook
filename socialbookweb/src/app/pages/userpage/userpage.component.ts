import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css'],
})
export class UserpageComponent implements OnInit {
  username: string = '';
  posts: any[] = [];
  userData: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((res) => {
      this.userData = res;
    });
    this.activatedRoute.params.subscribe((params) => {
      this.username = params['username'];
      this.postService.getUserPosts().subscribe({
        next: (res) => {
          this.posts = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter((post) => post.id !== id);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

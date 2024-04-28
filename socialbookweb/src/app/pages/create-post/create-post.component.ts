import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createPostFormData = {
    title: '',
    content: '',
    file: '',
  };

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files[0].type.match(/image.*/)) {
      this.createPostFormData.file = event.target.files[0];
    } else {
      alert('Only jpg, jpeg, png are allowed');
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.createPostFormData.title);
    formData.append('content', this.createPostFormData.content);
    formData.append('file', this.createPostFormData.file);
    this.postService.createPost(formData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => console.log(error),
    });
  }
}

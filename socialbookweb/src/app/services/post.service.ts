import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<any>(`${this.baseUrl}/posts/all`);
  }

  getUserPosts() {
    return this.http.get<any>(`${this.baseUrl}/posts`);
  }

  createPost(data: any) {
    return this.http.post(`${this.baseUrl}/posts/`, data);
  }

  updatePost(id: number, data: { title: string; content: string }) {
    return this.http.put(`${this.baseUrl}/posts/${id}`, data);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}/posts/${id}`);
  }
}

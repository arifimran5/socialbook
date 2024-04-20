from django.urls import path
from .views import AllPostsListView, PostListCreateView, PostDetailView

urlpatterns = [
    path("", PostListCreateView.as_view(), name="user-posts"),
    path("all", AllPostsListView.as_view(), name="all-posts"),
    path("<int:pk>", PostDetailView.as_view(), name="post-detail"),
]

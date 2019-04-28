import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

const blogsUrl = 'https://jsonplaceholder.typicode.com/posts';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };
  componentDidMount() {
    axios.get(blogsUrl).then(response => {
      const posts = response.data.slice(0, 4);
      const updatePosts = posts.map(post => {
        return {
          ...post,
          author: 'Vikas'
        };
      });
      this.setState({ posts: updatePosts });
      //   console.log(response);
    });
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });
    return (
      <div className="blog">
        <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/new-post">New Post</a>
              </li>
            </ul>
          </nav>
        </header>
        <section className="posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;

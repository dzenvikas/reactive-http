import React, { Component } from 'react';
import axiosInstance from '../../../axiosInstance';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Link } from 'react-router-dom';

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };
  componentDidMount() {
    axiosInstance.get('posts/').then(response => {
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
        <Link to={'/' + post.id} key={post.id}>
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        </Link>
      );
    });
    return <section className="posts">{posts}</section>;
  }
}

export default Posts;

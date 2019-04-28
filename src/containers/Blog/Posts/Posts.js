import React, { Component } from 'react';
import axiosInstance from '../../../axiosInstance';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: []
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
    this.props.history.push({ pathname: '/' + id });
  };
  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Post
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });
    return <section className="posts">{posts}</section>;
  }
}

export default Posts;

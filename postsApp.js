import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./constant";

export default function PostsApp() {
    const DEFAULT_POST = { id: -1, title: '', content: '', author: '',  };
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(DEFAULT_POST);
    const [view, setView] = useState('form');

    useEffect(() => {
        loadPosts();
    }, []);

    function loadPosts () {
        axios.get(API_URL + 'posts')
            .then(response => {
                setPosts(response.data);
            })
    }

    function submitForm() {
        const url = post.id == -1 ? `${API_URL}posts` : `${API_URL}posts\\${post.id}`;
        axios.post(url, post)
            .then(response => {
                loadPosts();
            })
    }

    function create() {
        setPost(DEFAULT_POST);
    }

    function editPost(p) {
        setPost(p);
    }

    function deletePost(id) {
        axios.delete(`${API_URL}posts\\${id}`)
            .then(response => {
                loadPosts();
            })
    } 

    function handleInput(event) {
        const { name, value } = event.target;
        setPost({ ... post, [name]: value });
    }

    function postsForm() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary mb-3" onClick={() =>{ submitForm(); create()}} >
                            Добави публикация
                        </button>
                        <input
                            type="text"
                            name="title"
                            placeholder="Заглавие на статия"
                            className="form-control mb-3"
                            onInput={e => handleInput(e)}
                            value={post.title}
                        />
                        <textarea
                            type="text"
                            name="content"
                            placeholder="Съдържание"
                            className="form-control mb-3"
                            onInput={e => handleInput(e)}
                            value={post.content}
                        />
                        <input
                            type="text"
                            name="author"
                            placeholder="Автор"
                            className="form-control mb-3"
                            onInput={e => handleInput(e)}
                            value={post.author}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <table className="table table-bordered">
                            <thead>
                                <th>ИД</th>
                                <th>Заглавие на статия</th>
                                <th>Съдържания</th>
                                <th>Автор</th>
                                <th>Действия</th>
                            </thead>
                            <tbody>
                                {posts.map(p => (
                                    <tr>
                                        <td>{p.id}</td>
                                        <td>{p.title}</td>
                                        <td>{p.content}</td>
                                        <td>{p.author}</td>
                                        <td>
                                            <button onClick={() => editPost(p)} className="btn btn-warning me-3 text-white">
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button onClick={() => deletePost(p.id)} className="btn btn-danger me-3 text-white">
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {postsForm()}
        </div>
    );
}
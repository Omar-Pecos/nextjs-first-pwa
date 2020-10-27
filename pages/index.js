
import Link from 'next/link';
import { useState } from 'react';
import Container from '../components/container';
import Global from '../components/global';

const Index = ({todos}) =>{

   const [todoList, todoListModifier] = useState(todos);

        return(
                <Container>

                    <h1 align="center">ToDo App</h1>
                    <p align="center">
                        <button className="btn btn-success">
                            <Link href="/new">
                                <a style={{ color: 'white' }}>New +</a>
                            </Link>
                        </button>
                    </p>


                    {
                        todoList.map(todo => (
                            <div className="card" id="todo-container" key={todo._id}>
                                <div className="card-header alert-info">
                                    <img
                                        onClick={() => onClickToDelete(todo._id)}
                                        style={{ float: 'right', width: '35px' }}
                                        src="https://img.icons8.com/fluent/48/000000/delete-sign.png"
                                    />
                                    <b>{todo.title}</b>
                                </div>
                                <div className="card-body alert-warning">
                                    <p style={{ fontSize: 2 + 'em' }}>
                                        {todo.text}
                                    </p>
                                </div>
                            </div>
                        ))
                    }

                </Container>
        )

        async function onClickToDelete(ID){

            // Call to delete method
            const res = await fetch(Global.url + 'todo/' + ID, {
                method: 'DELETE'
            });
        
            const data = await res.json();
        
            //deleted ToDo
            if (data.status == 'ok') {
                //Call to API 
                const res = await fetch(Global.url + 'todo');
                const { todos } = await res.json()
        
                todoListModifier(todos);
        
            } else {
                if (data.status == 'fail') {
                    alert(data.error);
                }
            }
        
        }

}

//this function gets called at build time 
export async function getStaticProps() {

    //Call to API 
    const res = await fetch(Global.url + 'todo');
    const { todos } = await res.json()

    //
    // By returning { props: todos }, the component
    // will receive `todos` as a prop at build time

    return {
        props: {
            todos
        },
    }

}

export default Index
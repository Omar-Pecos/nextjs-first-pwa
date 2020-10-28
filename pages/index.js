
import Link from 'next/link';
import { useState , useEffect} from 'react';
import Container from '../components/container';
import Global from '../components/global';
import swal from 'sweetalert';

const Index = ({todos}) =>{
    // register SW manually :)
    useEffect(() => {
        if("serviceWorker" in navigator) {
          window.addEventListener("load", function () {
           navigator.serviceWorker.register("/sw.js").then(
              function (registration) {
                console.log("Service Worker registration successful with scope: ");
                console.log(registration);
              },
              function (err) {
                console.log("Service Worker registration failed: ", err);
              }
            );
          });
        }
      }, [])

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

        function onClickToDelete(ID){
            //CONFIRMATION TO DELETE
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this ToDo",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then( async (willDelete) => {
                if (willDelete) {
                    /// WANT TO DELETE
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
                            swal("Poof! The ToDo has been deleted!", {
                                icon: "success",
                            });
                    
                        } else {
                            if (data.status == 'fail') {
                                alert(data.error);
                                swal("Error", data.error, "error");
                            }
                        }
                    
                } else {
                    //nothing - no want to delete
                }
              }); 
        
        }

}
 
Index.getInitialProps = async (ctx) => {

    //Call to API 
    const res = await fetch(Global.url + 'todo');
    const { todos } = await res.json()

        // getStaticProps --> at build time
        // getServerSideProps --> each request
        // getInitialProps --> (not recommended for next >= 9.3) initial load on server, then will run on the client when navigating to a different route via the next/link component or by using next/router.

    return {
       todos : todos
    }
}

/*export async function getServerSideProps(){
    //Call to API 
    const res = await fetch(Global.url + 'todo');
    const { todos } = await res.json()

    return{
        props : {
            todos : todos
        }
    }
}*/

export default Index
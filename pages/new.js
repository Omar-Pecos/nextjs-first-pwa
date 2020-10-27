import { useRouter } from 'next/router'
import Container from '../components/container';
import Global from '../components/global';
import swal from 'sweetalert';

const URL = Global.url;

const New = () =>{
    const router = useRouter()

    return (
        <Container>
            <h1 align="center">New ToDo</h1>

            <form id="form-new-todo" onSubmit={onSubmit}>
                <div className="form-group">
                    <label >Title (*)</label>
                    <input type="text" className="form-control" id="inputTitle" placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label >Description (*)</label>
                    <textarea rows="4" className="form-control" id="inputText" placeholder="Enter description" >

                    </textarea>
                </div>
            
                <button type="submit" className="btn btn-primary">Submit</button>
        
        </form>
        </Container>
    )

    //onSubmit
    async function onSubmit(event){
        event.preventDefault();
    
        
        let inputTitle = document.getElementById('inputTitle');
        let inputText = document.getElementById('inputText');
    
        //simple validation
        if (inputText.value && inputTitle.value){
            // send data
            const body = {
                title : inputTitle.value,
                text : inputText.value
            }
    
            const res = await fetch( URL + 'todo',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body : JSON.stringify(body)
            })
    
            const data = await res.json();
    
            //todo ok
            if (data.status == 'ok'){
    
                router.push('/');
                swal("Good job!", '"' + data.todo.title + '" added :)', "success");
                
            }else{
                swal("Error", data.error, "error");
            }
        }else{
            swal("Formulario inválido", 'Por favor, complete los campos obligatorios', "warning");
        }
    
    }
}

export default New
import '../css/Regist.css';
import {Link} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';

function Reg() {
  const history = useHistory();

    const initialValues = {
        username: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username:Yup.string().required("Felhasználónév mező kitöltése kötelező!"),
        password:Yup.string().min(8).max(30).required("Jelszó mező kitöltése kötelező!")
    })

    const onSubmit = (data) =>{
        Axios.post("http://localhost:3001/users", data).then(()=>{
            console.log(data);
            history.push('login')
        })
    }

  return (
    <div>
      <section>
        <div className='regist-container'>
        <div className="img-box">
        <img src='./image/img11.png' alt='Kép'/>
        </div>
            <div className='content-box'>
                <div className='form-box'>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form>
                            <h2>Regisztráció</h2>
                            <div className='input-box'>
                                <label>Felhasználónév:</label>
                                <ErrorMessage name="username" componant="span"/>
                                <Field type="text" name="username" />
                            </div>
                            <div className='input-box'>
                                <label>Jelszó:</label>
                                <ErrorMessage name="password" componant="span"/>
                                <Field autoComplete="off" type="password" name="password" />
                            </div>
                            <div className='input-box'>
                                <button type='submit' className='regist-btn'>Regisztráció</button>
                            </div>
                            <div className='input-box'>
                                <p>Már regisztráltál ? <Link to="/login">Bejelentkezés</Link></p>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Reg
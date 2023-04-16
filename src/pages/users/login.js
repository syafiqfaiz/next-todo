import axios from 'axios';
import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useForm } from "react-hook-form";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = ({email, password}) => {
    console.log({email, password});
    axios.post('http://localhost:4000/api/users/login', {
      email,
      password
    })
    .then(function (response) {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
    setLoading(false)
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Login</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='m-auto w-full flex-row my-2'>
                <Input
                  label='Email'
                  registerConstructor= {register("email", { required: true })}
                  error={errors.email}
                />
              </div>
              
              <div className='m-auto w-full flex-row my-2'>
                <Input
                  label='Password'
                  registerConstructor= {register("password", { required: true })}
                  error={errors.password}
                  type='password'
                />
              </div>

              <div className='w-full my-2'>
                <Button type="submit" label={'Login'} loading={loading} color='teal'/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login;

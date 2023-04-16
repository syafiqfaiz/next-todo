import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useForm } from "react-hook-form";
import axios from 'axios';

const CreateTodoItem = ({onChange}) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = ({item}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    axios.post('http://localhost:4000/api/items', {
      item
    },
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${user.jwt}`
      }
    }
    )
    .then(function (response) {
      console.log(response);
      onChange()
    })
    .catch(function (error) {
      console.log(error);
    });
    setLoading(false)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full'>
      <Input
        registerConstructor= {register("item", { required: true })}
        error={errors.item}
        inputName='item'
        placeholder='Add Todo'
      />
      <Button type="submit" label={'Add'} color='teal' loading={loading} customClass='ml-1'/>
    </form >
  )
}

export default CreateTodoItem

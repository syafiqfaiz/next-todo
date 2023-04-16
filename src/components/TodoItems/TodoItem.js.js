import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import axios from 'axios';
import { useForm } from "react-hook-form";

const TodoItem = (props) => {
  const { item: {id, item, completed}, onChange, isEdit, setEdit } = props
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const updateItem = (data, callback) => {
    const user = JSON.parse(localStorage.getItem('user'))
    axios.put(`http://localhost:4000/api/items/${id}`, {
      ...data
    },
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${user.jwt}`
      }
    })
    .then(function (response) {
      console.log(response);
      onChange()
      if (callback) {
        callback()
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(()=>(
      setLoading(false)
    ));
  }

  const deleteItem = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    axios.delete(`http://localhost:4000/api/items/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${user.jwt}`
      }
    })
    .then(function (_response) {
      onChange()
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const displayItem = (
    <>
      <p className={`w-full text-grey-darkest ${completed && 'line-through'}`}>{item}</p>
      <div onClick={() => setEdit(id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </div>
      {completed ? (
        <div className='mx-2'>
          <Button
            label="Not done"
            loading={loading}
            onClick={()=>{
              setLoading(true)
              updateItem({completed: !completed})
            }}
          />
        </div>
      ) : (
        <div className='mx-2'>
          <Button
            label="Done"
            color="green"
            loading={loading}
            onClick={()=>{
              setLoading(true)
              updateItem({completed: !completed})
            }}
          />
        </div>
      )}
      
      <div onClick={deleteItem} className='text-red-500'>
        {/* trashicon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </div>
    </>
  )

  const editItem = (
    <form onSubmit={handleSubmit((data) => updateItem(data, ()=>setEdit(undefined)))} className='flex w-full'>
      <Input
        registerConstructor= {register("item", { required: true })}
        error={errors.item}
        inputName='item'
        defaultValue={item}
      />
      <Button type="submit" label={'Update'} color='teal' loading={loading} customClass='ml-1'/>
      <Button
        label={'Cancel'}
        loading={loading}
        customClass='ml-1'
        onClick={(e)=>{
          e.preventDefault()
          setEdit(undefined)
        }}
      />
    </form >
  )

  return (
    <div className="flex mb-4 items-center">
      {isEdit ?  editItem : displayItem}
  </div>
  )
}

export default TodoItem

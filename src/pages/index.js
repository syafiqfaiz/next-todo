import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr'
import CreateTodoItem from '@/components/TodoItems/CreateTodotIem';
import TodoItem from '@/components/TodoItems/TodoItem.js';

const fetcher = url => axios.get(url).then(res => res.data)

const Home = () => {
  const [editting, setEditting] = useState(undefined)
  const { data: items, error, isLoading, mutate: mutateItems } = useSWR('http://localhost:4000/api/items', fetcher)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
              <CreateTodoItem onChange={mutateItems}/>
            </div>
          </div>
          <div>
            {isLoading && ('Loading')}
            {items && items.map((item) => (
              <TodoItem
                item={item}
                key={item.id}
                onChange={mutateItems}
                setEdit={setEditting}
                isEdit={editting == item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home;

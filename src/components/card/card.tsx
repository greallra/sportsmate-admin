import React, { useState } from 'react';
import { Todo } from '@/types/Todo';
import TodoForm from '@/components/Forms/TodoForm';
import { FaCheck } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';

export default function card({ todo }: Todo) {
  const [showForm, toggleShowForm] = useState(false);
  if (!todo) {
    return <div>No Todo</div>;
  }
  return (
    <div className="card bg-base-100 w-96 shadow-xl p-0">
      <div className="card-body">
        <h2 className="card-title">
          {todo.title}
          {todo.isDone ? <FaCheck color="green" /> : <IoMdCloseCircle color="red" />}
        </h2>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary collapse-title text-xl font-medium"
            onClick={() => toggleShowForm(!showForm)}
          >
            {showForm ? 'Close' : 'Edit'}
          </button>
          {showForm && <TodoForm todo={todo} />}
        </div>
      </div>
    </div>
  );
}

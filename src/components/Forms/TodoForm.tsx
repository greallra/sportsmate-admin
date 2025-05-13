import React from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CiCircleCheck } from 'react-icons/ci';
import { zodResolver } from '@hookform/resolvers/zod';
import Todo from '@/types/Todo';

const TodoSchema = z.object({
  title: z.string().min(3),
  isDone: z.boolean(),
});

type FormData = z.infer<typeof TodoSchema>;

type TodoFormProps = {
  todo?: Todo;
};

export default function TodoForm({ todo }: TodoFormProps) {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: todo
      ? {
          title: todo.title,
          isDone: todo.isDone,
          // here i can transform/parse values if i need to eg data:  new Date(user.date)
          // here i can also emit values not being used in the form just dont add
        }
      : undefined,
    resolver: zodResolver(TodoSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    // after validation from RHF
    if (todo) {
      // edit todo api call
      try {
        await new Promise((res, rej) => setTimeout(res, 2000));
      } catch (error) {
        setError('root', { message: 'this form has an error' });
      }
    } else {
      // add todo api call
      try {
        await new Promise((res, rej) => setTimeout(res, 2000));
      } catch (error) {
        setError('root', { message: 'this form has an error' });
      }
    }
  };

  return (
    <form className="flex flex-col max-w-max justify-center mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="label">
        <span className="label-text">Title</span>
      </div>
      <textarea className="textarea textarea-bordered" placeholder="title" {...register('title')}></textarea>
      {errors.title ? <div className="text-red-500">{errors.title.message}</div> : <CiCircleCheck />}
      <div className="label">
        <span className="label-text">Done</span>
      </div>
      <label className="inputflex items-center gap-2">
        <input type="radio" className="radio radio-primary" {...register('isDone')} /> Yes
      </label>
      <label className="inputflex items-center gap-2">
        <input type="radio" className="radio radio-primary" {...register('isDone')} /> No
      </label>
      <button className="btn btn-secondary mt-3" type="submit" disabled={isSubmitting}>
        Submit {isSubmitting && <span className="loading loading-spinner"></span>}
      </button>
      {errors.root && <div className="text-red-500">{errors.isDone.message}</div>}
    </form>
  );
}

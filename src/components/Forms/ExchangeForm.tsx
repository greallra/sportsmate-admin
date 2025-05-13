import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { forms, UserForm as EsUserForm, FormFields, esAddUser } from 'exchanges-shared';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db as FIREBASE_DB } from '../../../firebaseConfig';

import FormBody from './FormBody';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  // lastname: z.string().min(2).max(50),
  // username: z.string().min(2).max(50),
  // email: z.string().email(),
  // password: z.string().min(6),
  // dob: z.date(),
  // gender: z.number(),
  // teachingLanguage: z.string().min(3).max(50),
  // learningLanguage: z.string().min(3).max(50),
});

type UserFormProps = {
  user?: EsUserForm;
};

export default function UserForm({ user }: UserFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user
      ? {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          password: user.password,
          dob: user.dob,
          gender: user.gender,
          teachingLanguage: user.teachingLanguage,
          learningLanguage: user.learningLanguage,
          // gender: user.gender,
          // here i can transform/parse values if i need to eg data:  new Date(user.date)
          // here i can also emit values not being used in the form just dont add
        }
      : undefined,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // after validation from RHF I can do my own validation
    if (values.learningLanguage === values.teachingLanguage) {
      return form.setError('root', { message: 'Languages must be different' });
    }
    // valid now perform req
    if (values && false) {
      // edit
      try {
        await new Promise((res, rej) => setTimeout(res, 2000));
      } catch (error) {
        form.setError('root', { message: 'this form has an error' });
      }
    } else {
      // add
      try {
        await new Promise((res, rej) => setTimeout(res, 2000));
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        delete values.password;
        await esAddUser(FIREBASE_DB, userCredential, 'users', values);
        console.log('success');
      } catch (error) {
        console.log(error);

        form.setError('root', { message: 'this form has an error: ' + error.message });
      }
    }
    console.log('values', values);
  }
  let esForm = forms['exchange'];
  esForm = esForm.map((esField) => {
    if (esField.name.includes('capacity')) {
      return {
        ...esField,
        type: 'select',
        options: esField.availableValues.map((val) => ({ name: val, value: val })),
      };
    }
    return esField;
  });
  esForm = [esForm[0], esForm[1], esForm[2], esForm[3]];

  return (
    <div className="w-3/12 m-auto">
      <FormBody form={form} onSubmit={onSubmit} esForm={esForm} />
    </div>
  );
}

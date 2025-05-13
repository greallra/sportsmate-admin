import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import {
  getFormFields,
  updateFormFieldsWithDefaultData,
  formatPostDataUser,
  validateForm,
  esAddUser,
  FormFields,
  forms,
} from 'exchanges-shared';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormProps = {
  user?: User;
};

export default function LoginForm({ user }: LoginFormProps) {
  const auth = getAuth();
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: undefined,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // after validation from RHF I can do my own validation
    // valid now perform req
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Success signInWithEmailAndPassword',
        description: '',
        action: <ToastAction altText="Goto schedule to undo">{/* Login */}</ToastAction>,
      });
    } catch (error) {
      console.log(error);

      form.setError('root', { message: 'Firebase cant find credentials' });
    }
    console.log('values', values);
  }
  const esForm = forms['login'];

  return (
    <div className="w-3/12 m-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {esForm.map((esField: FormFields) => {
            return (
              <FormField
                control={form.control}
                name={esField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{esField.label}</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>{esField.label}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          {esForm.map((esField) => {
            return form.formState.errors[esField.name] ? (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {esField.name} is {form.formState.errors[esField.name].message}
                </AlertDescription>
              </Alert>
            ) : null;
          })}
          {form.formState.errors.root && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
            </Alert>
          )}
          {!form.formState.isValid && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Not Valid</AlertDescription>
            </Alert>
          )}
          <Button type="submit">
            {!form.formState.isSubmitting ? 'Submit' : <span className="loading loading-spinner"></span>}
          </Button>
        </form>
      </Form>
    </div>
  );
}

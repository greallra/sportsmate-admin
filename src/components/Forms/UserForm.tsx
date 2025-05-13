import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { getFormFields, UserForm as EsUserForm, FormFields, esAddUser } from 'exchanges-shared';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db as FIREBASE_DB } from '../../../firebaseConfig';

const formSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  dob: z.date(),
  gender: z.number(),
  teachingLanguage: z.string().min(3).max(50),
  learningLanguage: z.string().min(3).max(50),
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
  let esFormFields = getFormFields('user', 'WEB');
  esFormFields = esFormFields.map((esField) => {
    if (esField.name.includes('Language')) {
      return {
        ...esField,
        type: 'select',
        options: [
          { name: 'spanish', value: 'aaa', iso_alpha2: 'sp' },
          { name: 'french', value: 'bbb', iso_alpha2: 'gb' },
          { name: 'english', value: 'ccc', iso_alpha2: 'fr' },
        ],
      };
    }
    return esField;
  });

  return (
    <div className="w-3/12 m-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {esFormFields.map((esField: FormFields) => {
            if (esField.type === 'text' || esField.type === 'email' || esField.type === 'password') {
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
            }
            if (esField.type === 'radio') {
              esField.options = [
                { label: 'male', value: 0 },
                { label: 'female', value: 1 },
              ];
              return (
                <FormField
                  control={form.control}
                  name={esField.name}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{esField.label}.</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {esField.options.map((option) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={option.value} />
                              </FormControl>
                              <FormLabel className="font-normal">{option.label}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            if (esField.type === 'select') {
              return (
                <FormField
                  control={form.control}
                  name={esField.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{esField.label}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="py-6">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {esField.options.map((option) => (
                            <SelectItem value={option.value}>
                              <div className="flex">
                                {option.name}
                                <Avatar>
                                  <AvatarImage
                                    src={`https://www.worldometers.info//img/flags/small/tn_${option.iso_alpha2}-flag.gif`}
                                    alt="@shadcn"
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>{esField.label}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
            if (esField.type === 'date') {
              return (
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }
          })}

          {esFormFields.map((esField) => {
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

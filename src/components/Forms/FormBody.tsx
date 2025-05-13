import React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { FormFields } from 'exchanges-shared';

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
import MapAutoComplete from '@/components/Maps/MapAutoComplete';

export default function FormBody({ form, onSubmit, esForm }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {esForm.map((esField: FormFields) => {
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
                          <SelectValue placeholder={esField.label} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {esField.options.map((option) => (
                          <SelectItem value={option.value}>
                            <div className="flex">
                              {option.name}
                              {esField.name.includes('Language') && (
                                <Avatar>
                                  <AvatarImage
                                    src={`https://www.worldometers.info//img/flags/small/tn_${option.iso_alpha2}-flag.gif`}
                                    alt="@shadcn"
                                  />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                              )}
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
          // if (esField.type === 'location_picker') {
          //   <MapAutoComplete selected={p.value} setSelected={() => {}} />;
          // } else {
          //   <div>no</div>;
          // }
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
  );
}

import React from 'react';
import UserForm from '@/components/Forms/UserForm';

export default function Signup() {
  return (
    <div>
      <UserForm
        user={{
          firstname: 'larry',
          lastname: 'murphy',
          username: 'laz22',
          email: 'laz@gmail.com',
          password: 'aaaaaaa',
          dob: new Date(),
          gender: 1,
          teachingLanguage: 'aaa',
          learningLanguage: 'ccc',
        }}
      />
    </div>
  );
}

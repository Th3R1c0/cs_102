'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { DataContext } from './layout';
import useMembers from '@/hooks/members';
import { useUser } from '@/hooks/user';
export default function Home() {
  const [userlogin, setUserLogin] = useState({ username: '', password: '' });
  const router = useRouter();
  //const { login } = useContext(DataContext);
  const [members, setMembers] = useMembers()
  const [user, updateUser] = useUser()
  const login = (email: string) => {
    console.log('members is :', members)
    const _user = members.find((m) => m.email === email);
    console.log('searching is ', email, ' the same as ', members[0].email);
    updateUser(_user);
  };



  const loginUser = () => {
    login(userlogin.username);
    console.log('userlogin: ', userlogin.username);
    router.push('dashboard');
  };
  return (
    <div className="bg-blue-200 text-black h-screen w-full flex flex-col">
      <div className="flex-grow flex items-center justify-center text-4xl">
        Library App {}
      </div>
      <div className="flex-grow space-y-4 flex items-center flex-col p-5 justify-center">
        <Link
          href="dashboard"
          className="rounded-md flex items-center justify-center w-full   self-center p-4 bg-blue-100 font-semibold text-2xl "
        >
          School ID
        </Link>
        <Link
          href="dashboard"
          className="rounded-md flex items-center justify-center w-full   self-center p-4 bg-blue-100 font-semibold text-2xl "
        >
          zero books login
        </Link>
        <div className="flex flex-col space-y-4 w-full">
          <input
            className="p-4 text-black rounded-md"
            type="text"
            value={login.username}
            onChange={(e) =>
              setUserLogin({ ...userlogin, username: e.target.value })
            }
            placeholder="Email"
          />
          <input
            className="p-4 text-black rounded-md"
            type="password"
            value={login.password}
            onChange={(e) =>
              setUserLogin({ ...userlogin, password: e.target.value })
            }
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col space-y-4 space-x-">
          <div
            onClick={loginUser}
            href="dashboard"
            className="rounded-2xl px-12 flex items-center justify-center w-max   self-center py-2 bg-blue-100 font-semibold text-2xl "
          >
            login as admin
          </div>
          <div
            onClick={loginUser}
            className="rounded-2xl px-12 flex items-center justify-center w-max   self-center py-2 bg-blue-100 font-semibold text-2xl "
          >
            login as student
          </div>
        </div>
        <div className="text-sm">Forgot password?</div>
      </div>
    </div>
  );
}

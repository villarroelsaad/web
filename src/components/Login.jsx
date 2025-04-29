/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { useState } from 'react'
import { DarkMode } from "../components/DarkMode";

export const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    return (
        <section className='flex flex-col justify-center  items-center  text-gray-800 '>
            <DarkMode/>
        <form >
          <div className=' flex flex-col border-2 bg-white border-zinc-200 mt-44 rounded-lg p-10 w-96 dark:bg-[#27272a] dark:text-gray-100 dark:border-zinc-800'>
            <h1 className='font-semibold opacity-90 text-3xl mb-8  text-center'>Ingresar</h1>
            <p className=' opacity-85 text-base  '>Usuario</p>
            <input value={userName} onChange={e => { setUserName(e.target.value) }} required type='text' className='mb-5 opacity-85 rounded-md bg-transparent border-2 border-zinc-500 outline-none  p-2 focus:border-sky-400 transition-all' />
            <p className='opacity-85 text-base   '>Password</p>
            <input value={password} onChange={e => { setPassword(e.target.value) }} required type='password' className='p-2 opacity-85 bg-transparent border-2 border-zinc-500 outline-none rounded-md focus:border-sky-400 transition-all' />
            <div className='flex mt-1 justify-between'>
              <Link to='/' className='opacity-75  text-sm hover:text-sky-400'>Registrarse</Link>
              <Link to='/' className='0 opacity-75 text-end text-sm hover:text-sky-400'>Inicio</Link>
            </div>
            <button type='submit' className='bg-sky-400  mt-7 w-28 p-2 self-center text-center rounded-lg font-semibold active:opacity-85  hover:bg-sky-300 transition-all dark:bg-sky-600 dark:hover:bg-opacity-90'>Iniciar sesion</button>
            {error && <p className='text-center mt-6 font-semibold text-violet-400'>Error: {error}</p>}
          </div>
            </form>
        </section>
    )
}
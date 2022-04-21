import type { LinksFunction } from '@remix-run/server-runtime';
import * as React from 'react';
import styles from "./Header.css"
import Illustration from './Illustration';

interface Props {

}
export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: styles}]
}
const Header: React.FC<Props> = () => {
    
 return (
 <div className="Header__Wrapper grid grid-cols-3 m-auto border-b-2">
     <div className="Header__Illustration__Wrapper col-span-2 max-w-screen-2xl">
     <Illustration/>
     </div>
     <div className="Header__Text flex flex-col items-baseline justify-center gap-20">
     <span className="font-bold text-4xl">Welcome to ____, a place to express your ideas, opinions, and more!</span>
     
     <a href="/write" className="bg-yellow-300 hover:bg-yellow-500 px-5 pb-2 pt-3 rounded-full text-black dark:text-white font-medium ease-in duration-75">Start writing</a>
     </div>
     </div>
 )
}

export default Header



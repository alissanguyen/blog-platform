import { Form } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/server-runtime';
import * as React from 'react';
import Blob1 from "./blob1.svg"
import Blob2 from "./blob2.svg"
import styles from "./signin.css"

interface Props {

}

export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: styles}]
}

const SignInPage: React.FC<Props> = ({ }) => {
 return (
 <div className="SignInPage__Wrapper h-screen bg-primary-100">
     <img src={Blob1} alt="" className="SignInPage__PinkBlob"/>
     <img src={Blob2} alt="" className="SignInPage__PurpleBlob"/>
     <div className="bg-bgColor flex flex-col m-auto">
        <Form method="post" className="space-y-6">
            <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            </div>
        </Form>
     </div>
 </div>
 )
}

export default SignInPage
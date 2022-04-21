import * as React from 'react';
import { useOptionalUser } from "~/utils";

interface Props {

}

const WriteANewPostPage: React.FC<Props> = () => {
    const user = useOptionalUser();
 return (
 <div>{user ? (
    <div>
        {/* FORM WITH RICH TEXT FIELD */}
    </div>
  ) : (
    <div className="">
     {/* REDIRECT TO SIGN IN */}
    </div>
  )}</div>
 )
}

export default WriteANewPostPage
import React, { createContext, useState } from 'react';

//have a true/false state... and have a function that toggles that state


//we can call the state isEdit 

// and have a type of boolean for it



export const  userBEditContext = createContext<any>(null)

export const UserBEditProvider : React.FC =( {children} ) => {
    const [isEdit , setIsEdit] = useState<boolean>(false);

    const toggleEdit = ():void => {
        setIsEdit(!isEdit)
    }

    return (
        <userBEditContext.Provider value={
            {isEdit,
             toggleEdit,
             setIsEdit
            }
        }>

            {children}

        </userBEditContext.Provider>
    )
}





import React, { createContext, useState } from 'react';

//have a true/false state... and have a function that toggles that state


//we can call the state isEdit 

// and have a type of boolean for it



export const  userBEditContext = createContext<any>(null)

export const UserBEditProvider : React.FC =( {children} ) => {
    const [isEdit , setEdit] = useState<boolean>(false);

    const toggleEdit = ():void => {
        setEdit(!isEdit)
    }

    return (
        <userBEditContext.Provider value={
            {isEdit,
             toggleEdit
            }
        }>

            {children}

        </userBEditContext.Provider>
    )
}





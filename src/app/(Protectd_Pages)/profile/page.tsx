"use client"
import { Context } from "@/components/context/context";
import { useContext } from "react";


export default function Page (){
const ctx = useContext(Context);
if(!ctx) throw new Error('Context is undefined, Error in profile/page')
    const { user } = ctx;
    return (<div>
        
        Page
        
        
        </div>)
}
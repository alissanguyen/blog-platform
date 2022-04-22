import * as React from 'react';
import TagBadge from '../TagBadge/TadBadge';

interface Props {
title: string;
imageUrl: string;
author: string;
date: string; //Can modify this in the future to support data typeof Date
excerpt: string;
readingTime: string; //TODO: Handle reading time estimation plugin
authorAvatar:string;
tags: {label: string, id: string}[]
}

const PostCard: React.FC<Props> = (props) => {
 return (
 <div className="PostCard__Wrapper flex flex-row gap-4 hover:ring hover:ring-offset-4 hover:ring-primary-300 active:hover:ring-primary-500 rounded-lg transition-all ease-in duration-100 p-3">
     <img src={props.imageUrl} alt="" className="PostCard__Image w-[250px] h-[180px] rounded-lg bg-cover object-cover"/>
     <div className="PostCard__Info flex flex-col justify-between">
         <div className="PostCard__AuthorSection inline-flex gap-1 items-center mb-2 text-primary-700">
             <img src={props.authorAvatar} alt={props.author} className="PostCard__AuthorAvatar rounded-full w-6 h-6"/>
             <span className="text-body-md font-medium">{props.author}</span>
         </div>
         <div>
        <span className="font-bold text-xl mb-1">{props.title}</span>
        <p className="line-clamp-3 text-body-md">{props.excerpt}</p>
        <ul className="PostCard__Tags mt-3 flex gap-1">
        {props.tags.map((tag)=> <li key={tag.id}><TagBadge id={tag.id} label={tag.label}/></li>)}
        </ul>
        </div>
        <span className="text-body-sm mt-2">{props.date} — {props.readingTime} min read</span>
     </div>
 </div>      
 )
}

export default PostCard
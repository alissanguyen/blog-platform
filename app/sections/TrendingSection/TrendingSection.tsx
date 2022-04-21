import type { LinksFunction } from '@remix-run/server-runtime';
import * as React from 'react';
import { fixedWidthContentClassname } from '~/constants';
import styles from "./TrendingSection.css"
import {TrendingUpIcon} from "@heroicons/react/outline"
import { topTrendingSampleData } from '~/data';
interface Props {

}

export const links: LinksFunction = () => {
    return [{rel: "stylesheet", href: styles}]
}
const TrendingSection: React.FC<Props> = () => {
 return (
 <div className={`TrendingSection__Wrapper ${fixedWidthContentClassname} py-8 flex flex-col items-baseline`}>
     {/* TODO: Update App name */}
     <div className="TrendingSection__Header inline-flex gap-3 uppercase font-medium text-xl text-black opacity-30 mb-2">
    <TrendingUpIcon className="w-7 h-7"/>
     <span>Trending on ##Appname##</span></div>
     <div className="TrendingSection__Posts grid grid-cols-1 gap-x-4 gap-y-8 pt-2 sm:grid-cols-2 md:grid-cols-3">
     {topTrendingSampleData.map((post, index) => {
         return (
<article className="flex gap-4 flex-row items-baseline" key={post.id}>
        <span className="w-9 flex-shrink-0 whitespace-nowrap text-4xl font-bold text-gray-300">0{index+1}</span>
        <div className="flex w-full flex-col">
            <div className="inline-flex gap-2 items-center text-sm font-semibold justify-start mb-2">
                <img src={post.avatarUrl} alt={post.author} className="rounded-full w-8 h-8 outline outline-1 outline-gray-200"/>
                <span>{post.author}</span>
            </div>
            <div className="text-lg font-bold mb-1">{post.title}</div>
            <div className="inline-flex justify-start text-gray-400">
                <span>{post.date}</span>
                <span>{post.readingTime} min read</span>
            </div>
        </div>
</article>
     )}) }
     </div>
 </div>
 )
}

export default TrendingSection
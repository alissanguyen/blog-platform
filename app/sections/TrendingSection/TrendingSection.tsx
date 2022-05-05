import * as React from 'react';
import {TrendingUpIcon} from "@heroicons/react/outline"
import { topTrendingSampleData } from '~/data';
import Container from '~/components/Container/Container';
interface Props {

}

const TrendingSection: React.FC<Props> = () => {
return (
 <Container className={`TrendingSection__Wrapper py-8 flex flex-col items-baseline border-b-2`}>
     {/* TODO: Update App name */}
     <div className="TrendingSection__Header inline-flex gap-3 uppercase font-semibold text-xl text-primary-600 mb-2">
    <TrendingUpIcon className="w-7 h-7"/>
     <span>Trending Posts</span></div>
     <div className="TrendingSection__Posts grid grid-cols-1 gap-x-4 gap-y-8 pt-2 sm:grid-cols-2 md:grid-cols-3">
     {topTrendingSampleData.map((post, index) => {
         return (
<article className="flex gap-8 flex-row items-baseline" key={post.id}>
        <span className="Trending__Number w-9 flex-shrink-0 whitespace-nowrap text-5xl text-primary-200">0{index+1}</span>
        <div className="flex w-full flex-col">
            <div className="inline-flex gap-2 items-center text-sm font-semibold justify-start mb-2">
                <img src={post.avatarUrl} alt={post.author} className="rounded-full w-8 h-8 outline outline-1 outline-gray-200"/>
                <span>{post.author}</span>
            </div>
            <div className="text-lg font-bold mb-1">{post.title}</div>
            <div className="inline-flex gap-1 items-center justify-start text-gray-400 text-body-sm">
                <span>{post.date} —</span>
                <span>{post.readingTime} min read</span>
            </div>
        </div>
</article>
     )}) }
     </div>
 </Container>
 )
}

export default TrendingSection
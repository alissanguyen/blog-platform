import * as React from 'react';
import { Container } from '~/components/Container';
import PostCard from '~/components/PostCard/PostCard';
import { sampleDataInfiniteScroll, sampleTrendingAuthors, sampleTrendingTags } from '~/data';

interface Props {

}

const FeedSection: React.FC<Props> = ({ }) => {
 return (
 <Container className="FeedSection__Wrapper py-10 grid gap-8 grid-cols-7">
     <ul className="FeedSection__BlogPosts flex flex-col gap-3 col-span-5">
     {sampleDataInfiniteScroll.map((post) => <li key={post.id}>
         <PostCard title={post.title} imageUrl={post.splashUrl} author={post.author} date={post.date} excerpt={post.excerpt} authorAvatar={post.avatarUrl} readingTime={post.readingTime} tags={post.tags}/></li>)}
    </ul>

<div className="FeedSection__RightSideMenu flex flex-col gap-10 col-span-2">
    <div className="FeedSection__TrendingTags__Wrapper">
        <span className="FeedSection__TrendingTags__Header uppercase text-black font-bold text-lg">Trending Tags</span>
        <ul className="FeedSection__TrendingTags mt-5"> 
        {sampleTrendingTags.map((tag) => <li key={tag.id} className="FeedSection__Tag rounded-lg border-[.125rem] hover:border-2 focus:border-2 border-primary-200 hover:border-primary-400 focus:border-primary-400 active:border-primary-400 active:border-2 active:bg-primary-100 px-3 py-2 inline-block capitalize text-primary-500 mr-2 mb-2 transition-all ease-in duration-100">{tag.label}</li>)}
        </ul>
    </div>
    <div className="FeedSection__TrendingAuthors__Wrapper">
    <span className="FeedSection__TrendingAuthors__Header uppercase text-primary-700 font-bold text-lg">Trending Authors</span>
        <ul className="FeedSection__TrendingAuthors mt-5 flex flex-col gap-1">
            {sampleTrendingAuthors.map((author) => <li key={author.id} className="flex flex-col py-2 px-2 rounded-xl">
                <div className="inline-flex items-start gap-2">
                    <img src={author.avatar} alt={author.name} className="rounded-full w-8 h-8 border-[.125rem] border-neutral-400"/>
                    <div className="flex flex-col justify-start w-full">
                        <div className="flex flex-row w-full items-center justify-between">
                    <span className="font-medium text-base">{author.name}</span>
                    {/* TODO: Enable quick follow */}
                    <span className="border-[.125rem] px-2 py-1 rounded-lg border-primary-200 text-primary-400 hover:border-primary-400 hover:text-primary-600 focus:border-primary-400 focus:text-primary-600 active:bg-primary-100 active:border-2 transition-all ease-in duration-100 text-sm">+ Follow</span>
                    </div>
                    <span className="text-sm text-primary-500">{author.followers}0 followers</span>
                    <span className="text-neutral-600 text-body-md">{author.bio}</span></div>
                </div>
                
            </li>)}
        </ul>
    </div>
    </div>

 </Container>
 )
}

export default FeedSection
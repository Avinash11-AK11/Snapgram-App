import { SearchResultProps } from '@/_root/pages/Explore'
import { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import React from 'react'
import GridPostList from './GridPostList';
import { searchPosts } from '@/lib/appwrite/api';

type SearchResultProps = {
    isSEARCHFetching: boolean;
    searchedPosts: Models.Document[];
}

const SearchResults = ({isSEARCHFetching, searchedPosts}: SearchResultProps) => {
  if(isSEARCHFetching) return <Loader />

  if(searchPosts && searchedPosts.documents.length > 0) {
    return (
        <GridPostList posts={searchPosts.documents}/>
    )
  }

  return (
    <p className='text-light-4 mt-10 text-center w-full'>No result found</p>
  )
}

export default SearchResults

import React, {useState} from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

interface SearchTagProps {
  query: string; 
}

// TODO disable searching if already has videos

const SearchTag: React.FC<SearchTagProps> = ({ query }) => {

    const handleClick = async() => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/search', {
                params: { queries: query },
              });
              console.log(res)
        } catch(error) {
            console.error(`Error searching videos for ${query}:`, error);
        } finally {
            
        }
    }

  return <Button onClick={handleClick}>{query}</Button>;
};

export default SearchTag;

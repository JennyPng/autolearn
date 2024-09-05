import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

interface SearchTagProps {
  query: string;
}

const SearchTag: React.FC<SearchTagProps> = ({ query }) => {
  // TODO, want skeleton videos when they're loading..
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/search", {
        params: { queries: query },
      });
      console.log(res);
    } catch {}
  };

  return <Button onClick={handleClick}>{query}</Button>;
};

export default SearchTag;

import "./styles.css";
import { useEffect, useState } from "react";
import * as dotenv from 'dotenv'
import Card from './ui/Cards'
import {getPageBlocks} from './repository/notes.respository';
dotenv.config()

export default function App() {
  
  const [pageBlocks, setPageBlocks] = useState<any>({})
  
  useEffect(()=>{
    //get the blocks for the page
    const getData = async ()=>{
      const res = await getPageBlocks()
      setPageBlocks(res.data)
    }
    getData();
  },[])

  const getCards = (pageBlocks: any) =>{
    return pageBlocks?.results
      ?.filter((block: any)=> ['bulleted_list_item', 'paragraph']?.some((type)=> block.type == type))
      ?.filter((block: any)=>{
        if(block.type === 'paragraph') return block.paragraph?.rich_text.length > 0
        if(block.type === 'bulleted_list_item') return block.bulleted_list_item?.rich_text.length > 0
      })
      ?.map((block:any, index:number) => {
        return <Card block={block} key={index} />
      })
  }

  return (
    <div className="App bg-white">
      <h1 className="topic text text-slate-300 text-left text-4xl font-body leading-tight">
        Dependency Injection
      </h1>
      <div className="relative rounded-xl overflow-auto">
        <div className="max-w-md mx-auto  shadow-xl min-w-0 p-10">
          <div className="overflow-x-auto flex">
            {getCards(pageBlocks)}
          </div>
        </div>
      </div>
    </div>
  );
}

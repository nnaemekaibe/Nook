import "./styles.css";
import { Children, useEffect, useState } from "react";
import Card from './ui/Cards'
import {getEverythingAvailableToBot, getPageBlocks} from './repository/notes.respository';
import {Router, Link, useLocation} from '@reach/router';

type ContextType = { pages: any, getCards: any, pageBlocks:any };

export default function App({children}: any) {
  
  const [pageBlocks, setPageBlocks] = useState<any>({})
  const [pages, setPages] = useState<any>()
  
  // useEffect(()=>{
  //   //get the blocks for the page
  //   const getData = async ()=>{
  //     const res = await getPageBlocks()
  //     setPageBlocks(res.data)
  //   }
  //   getData();
  // },[])
  
  useEffect(()=>{
    
  },[])
  
  useEffect(()=>{
    const getEverything = async () =>{
      const res = await getEverythingAvailableToBot()
      // console.log({res: res.data})
      const {results, type, object} = res.data
      if((object === 'list') && (type === 'page_or_database') && (results.length > 0)){
        let pages = results.filter((result: any)=>{
          return result.object === 'page' && result.properties.title
        })
        // for(let i = 0; i < pages.length; i++){
        //   const res = await getPageBlocks(pages[i].id)
        //   console.log(res.data);
        //   const newPageBlocks = Object.assign({}, pageBlocks);
        //   // newPageBlocks[pages[i].id] = res.data
        //   // setPageBlocks(newPageBlocks)          
        // }
        
        setPages(pages)
      }
    }
    getEverything()
  }, [])
  
  useEffect(()=>{
    console.log(pageBlocks)
    
  },[pageBlocks])

  
  
  
  
  return (
    <div className="App bg-white">
      <Router>
          <Home path="/" pages={pages}/>
          <Page path="page/:id" pages={pages}/>
      </Router>
    </div>
  );
}


interface LocationState {
  title: string
}

export const Page = (props: any)=>{
  const [pageBlocks, setPageBlocks] = useState<any>({})
  const {pages, id} = props
  
  console.log({pages})
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
  
  const location = useLocation();
  
  useEffect(()=>{
    if(id){
      let get = async ()=>{
        const res = await getPageBlocks(id)
        console.log({res});
        setPageBlocks(res.data)
      }
      get()
    }
  },[])
  return(
    <>
      <h1 className="topic text text-slate-300 text-left text-4xl font-body leading-tight">
        {(location.state as LocationState).title}
      </h1>
      <div className="relative rounded-xl overflow-auto">
        <div className="max-w-md mx-auto  shadow-xl min-w-0 p-10">
          <div className="overflow-x-auto flex">
            {pageBlocks && getCards(pageBlocks)}
          </div>
        </div>
      </div>
    </>
  )
}

export const Home = (props: any) => {
  const {pages} = props
  return(
    <>
    {pages
      ?.map((page:any)=>{
        const {properties: {title}, id} = page
        const {plain_text} = title .title[0]
        let state: LocationState = {title: plain_text}
        
        return (
          <Link to={`/page/${id}`} state={state} >
            <div key={id} className="w-full bg-slate-300 h-40 text-left p-8 mb-4 rounded">
              <p className="text text-slate-600 text-left text-xl font-body leading-relaxed">
                {plain_text}
              </p>
            </div>
          </Link>
        )
      })}
    </>
  )
  
  }
  
import "./styles.css";
import { Children, useEffect, useState } from "react";
import Card from './ui/Cards'
import {getEverythingAvailableToBot, getPageBlocks} from './repository/notes.respository';
import {Router, Link, useLocation, useNavigate} from '@reach/router';
import logo from './assets/logo.svg'
import searchIcon from './assets/search.svg'
import downIcon from './assets/down.svg'
import eyeIcon from './assets/eye.svg'
import backIcon from './assets/back.svg'

type ContextType = { pages: any, getCards: any, pageBlocks:any };

export default function App({children}: any) {
  
  const [pageBlocks, setPageBlocks] = useState<any>({})
  const [pages, setPages] = useState<any>()
  const [subjectsIdTitleMap, setSubjectsIdTitleMap] = useState<any>()
  
  // useEffect(()=>{
  //   //get the blocks for the page
  //   const getData = async ()=>{
  //     const res = await getPageBlocks()
  //     setPageBlocks(res.data)
  //   }
  //   getData();
  // },[])

  useEffect(()=>{
    const getEverything = async () =>{
      const res = await getEverythingAvailableToBot()
      const {res: {results, type, object}, idTitleMap} = res.data
      
      if((object === 'list') && (type === 'page_or_database') && (results.length > 0)){
        let pages = results.filter((result: any)=>{
          return result.object === 'page' && result.properties.title
        })
        setSubjectsIdTitleMap(idTitleMap)
        // for(let i = 0; i < pages.length; i++){
        //   const res = await getPageBlocks(pages[i].id)
        //   const newPageBlocks = Object.assign({}, pageBlocks);
        //   // newPageBlocks[pages[i].id] = res.data
        //   // setPageBlocks(newPageBlocks)          
        // }
        
        setPages(pages)
      }
    }
    getEverything()
  }, [])

  return (
    <div className="App bg-white">
      <Router className="w-full h-full">
          <Home path="/" pages={pages} subjectIdTitleMap={subjectsIdTitleMap}/>
          <Page path="page/:id" pages={pages}/>
      </Router>
    </div>
  );
}


interface LocationState {
  title: string,
  color: string,
}

export const Page = (props: any)=>{
  const [pageBlocks, setPageBlocks] = useState<any>({})
  const {pages, id} = props
  const location = useLocation();
  const navigate = useNavigate();
  let color = (location.state as LocationState).color

  
  const getCards = (pageBlocks: any) =>{
    return pageBlocks?.results
      ?.filter((block: any)=> ['bulleted_list_item', 'paragraph']?.some((type)=> block.type == type))
      ?.filter((block: any)=>{
        if(block.type === 'paragraph') return block.paragraph?.rich_text.length > 0
        if(block.type === 'bulleted_list_item') return block.bulleted_list_item?.rich_text.length > 0
      })
      ?.map((block:any, index:number) => {
        return <Card block={block} key={index} color={color} />
      })
  }
  
  
  useEffect(()=>{
    if(id){
      let get = async ()=>{
        const res = await getPageBlocks(id)
        setPageBlocks(res.data)
      }
      get()
    }
  },[])

  const Header = ()=>{ 
    let title = (location.state as LocationState).title
    //TODO: IF ITS MORE THAT 1 WORD, BREAK AFTER THE FIRST WORD.
    let firstWord, otherWords;

    if (title.length > 1){
      firstWord = title.split(' ').slice(0, 1)
      otherWords = title.split(' ').slice(1).join(' ')
      console.log(firstWord)
      console.log(otherWords)
    }
    // if (title.split(" ").length > 1){
    //   const titleArray = title.split(' ');
    //   console.log(titleArray[0])
    //   console.log(titleArray.slice(1))
    //   const newTitle = [titleArray[0], "\n\n", ...titleArray.slice(1)]
    //   console.log(newTitle)
    //   title = newTitle.join(" ")
    //   console.log(title, 'xddd')
    // }
    return (
      <>
        <div className="w-full flex justify-start">
          <div className="w-12 h-full flex items-center">
            <button onClick={()=> navigate(-1)}>
              <img src={backIcon} alt="back" className="w-6 h-6"/>
            </button>
          </div>
          <h1 className="topic text text-white/[.67] text-left text-3xl font-body leading-tight flex-wrap">
            {firstWord}<br/>
            {otherWords}
          </h1>
        </div>
      </>
    )
  }
  const Body = ()=>{
    return(
      <div className="flex flex-col h-full justify-center">
        <div className="relative rounded-xl overflow-auto">
        <div className="max-w-md mx-auto  shadow-xl min-w-0">
          <div className="overflow-x-auto flex">
            {pageBlocks && getCards(pageBlocks)}
          </div>
        </div>
      </div>
      </div>
    )
  }

  return (<div className="w-full h-full">
    <LinearLayout
      body={<Body/>}
      header={<Header/>}
      borderBottomOpacity={0}
    />
  </div>)
}


  const LinearLayout = (props: any) =>{
    const {body, header, borderBottomOpacity} = props
    return (<div className="w-full h-ful flex flex-col bg-primary">
      <header className={`w-full h-24 max-h-24 p-4 pb-2 border-b-white/${borderBottomOpacity == 0 ? 0 : 70} border-b bg-primary flex flex-col justify-between`}>
        {header}
      </header>
      <main className="w-full h-[calc(100vh_-_96px)] bg-primary p-4 overflow-y-scroll">
        {body}
      </main>
    </div>)
  }


export const Home = (props: any) => {
  const {pages, subjectIdTitleMap} = props
  const TopicListItem = ({topic, lastViewed, color, id}: any)=>{
    const {plain_text} = topic .title[0]
    let state: LocationState = {title: plain_text, color}
    return(
      <Link to={`/page/${id}`} state={state} >
        <div className={`w-full h-16 rounded bg-[${color}] px-3 py-4 box-border text-start pt-2`}>
            <p className=" text-xl text-white/[.67] font-body">{plain_text}</p>
            <div className="w-fit h-fit flex items-center gap-2">
              <img src={eyeIcon} alt="seen" className="w-2 h2 text-white/[.27]"/>
              <span className="text-xs text-white/[.27]">{lastViewed}</span>
            </div>
        </div>
      </Link>
    )
  }

  const SubjectTitle = ({title, color}: any)=>{
    return(
      <div className="subject w-full h-fit flex justify-end pb-4">
        <div className="relative">
          <div className={`absolute top -left-2 w-12 h-5 bg-[${color}] rounded-sm`}></div>
          <span className="relative text-white text-xs">{title}</span>
        </div>
      </div>
    )
  }

  const Subject = ({color, title, topics}: any) =>{
    return(
    <div className="">
      <SubjectTitle color={color} title={title}/>
      <div className="flex flex-col gap-3">
        {
          
          Object.keys(topics).map((id)=>{
            const name = topics[id]
            return <TopicListItem key={id} id={id} topic={name} lastViewed="2 days ago" color={color}/>
          })
        }
      </div>
    </div>
   )
  }


  const Toolbar = ()=> {
    return(<div className="w-full flex justify-between">
      <button className="w-16 h-8 bg-transparent border border-[#d9d9d9] rounded-full text-center">
        <img src={searchIcon} className="w-4 h-4 m-auto"/>
      </button>

      <button className="w-fit h-8 flex items-center gap-2 bg-transparent rounded-full text-center">
        <img src={downIcon} className="w-4 h-4 m-auto"/>
        <span className="text-xs text-[#d9d9d9]">ALL</span>
      </button>
  </div>)
  }
  const header = (<>
    <div className="w-full flex justify-center">
      <img src={logo} className="w-16" />
    </div>
    <Toolbar/>
  </>)


  const subjectsAndTopics: any = {} 
  const idTitleMap: any = {}

  pages?.map((page:any)=>{
    const {properties:{title}, parent: {page_id}, id} = page
    if(!subjectsAndTopics[page_id]) subjectsAndTopics[page_id] = []
    subjectsAndTopics[page_id] = [...subjectsAndTopics[page_id], id]
    idTitleMap[id] = title
  })

  const Body = ()=>{

    const colors = ["#5C2D41", "#2D5C51"]

    return (
      <div className="flex flex-col gap-16 pt-5 pb-8">
        {Object.keys(subjectsAndTopics).map((subject: string, j)=>{
          const topicsMap: any = {}
          //get all the tops for this subject
          const topics = subjectsAndTopics[subject]
          for(let topicId of topics){
            if(topicId in idTitleMap){
              topicsMap[topicId] = idTitleMap[topicId]
            }
          }
          const subjectTitle = subjectIdTitleMap[subject]
          return <Subject key={subject} topics={topicsMap} color={colors[j]} title={subjectTitle.toUpperCase()}/>
        })}
      </div>
    )
  }


  return(<div className="w-full h-full">
    <LinearLayout
      body={<Body/>}
      header={header}
    />
  </div>)
}
  
type CardProps = {
  point?: any[];
  block: any
  color: string,
};

const Card = (props: CardProps) => {
    const { block:{has_children, childBlock, paragraph, bulleted_list_item}, color } = props;
    let texts;
    let lists;
    
    const getPlainText = (rich_text: any)=>{
      return rich_text.map((text: any)=>{
          const {plain_text} = text; 
          return plain_text;
        })
    }
    
    const getListItems = (rich_text: any) =>{
      let texts = getPlainText(rich_text)
      return texts.map((text: any)=>{
        return  (<li className={'text text-slate-400 text-left text-base font-body leading-relaxed ml-6'}>{text}</li>)
      })
    }
    
    const getParagraphs = (source: any) => {
        return source.map((text: string)=>{
          return (<p className="text text-slate-400 text-left text-base font-body leading-relaxed">
              {text}
          </p>);
        })
    }
    
    const handleList = (object: any, results: any, parent: any) =>{
      if(object === 'list'){
          let list = results.map((result: any)=>{
            const {has_children, childBlock} = result;
            let {rich_text} = result.type == 'bulleted_list_item' ? result.bulleted_list_item : result.paragraph
            
            let listItems = getListItems(rich_text)
            if(!has_children){
              return listItems[0]
            }else{
              // handleList(childBlock.)
            }
          })
          parent.push((<ul className="list-disc">{list}</ul>))          
        }
    }
    
    if(!paragraph && bulleted_list_item && (bulleted_list_item.rich_text.length > 0)){
      const {rich_text} = bulleted_list_item;
      if(rich_text){
        lists = getPlainText(rich_text)
        lists = getParagraphs(lists)
      }
      
      if(has_children){
        const {object, results} = childBlock;
        handleList(object, results, lists)
      }
    }
    if(paragraph && paragraph.rich_text.length > 0){
      const {rich_text} = paragraph;
      if(rich_text){
        texts = getPlainText(rich_text)
        texts = getParagraphs(texts)
      }
      
      if(has_children){
        const {object, results} = childBlock;
        handleList(object, results, texts)
      }
    }
    return (
      <div className={`Card w-80 rounded h-[380px] flex-none dark:bg-[${color}] m-4 p-8 first:ml-4 last:mr-4`}>
          {lists}
          {texts}
      </div>
    );
  };
  
  export default Card;
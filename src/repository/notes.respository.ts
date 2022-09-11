
export const getPageBlocks = async () =>{
    const res = await fetch("https://wcohsn-3000.preview.csb.app/notion",{
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return res.json()
}
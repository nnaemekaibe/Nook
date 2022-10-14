const options = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
export const getPageBlocks = async (id: string) =>{
    const res = await fetch(`https://wcohsn-3000.preview.csb.app/notion/${id}`, options)
    return res.json()
}

export const getEverythingAvailableToBot = async () =>{
    const res = await fetch("https://wcohsn-3000.preview.csb.app/search", options)
    return res.json()
}